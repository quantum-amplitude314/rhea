"use server";

import { ORPCError } from "@orpc/client";
import { redirect } from "next/navigation";
import { apiClient } from "@/lib/api";
import { FIRST_POSITION, stepHref } from "@/lib/interview/navigation";
import { writeSessionId } from "@/lib/session/cookie";

export type StartInterviewState = { verificationFailed: boolean };

const REJECTED_START_CODES = new Set(["FORBIDDEN", "BAD_REQUEST"]);

// Server Actions passed to `useActionState` keep React's (previousState, formData) signature.
export const startInterview = async (
  _previousState: StartInterviewState,
  formData: FormData,
) => {
  const rejected: StartInterviewState = { verificationFailed: true };
  const turnstileToken = formData.get("cf-turnstile-response");
  if (typeof turnstileToken !== "string" || !turnstileToken) return rejected;

  const session = await apiClient.interview
    .start({ turnstileToken })
    .catch((error: unknown) => {
      if (error instanceof ORPCError && REJECTED_START_CODES.has(error.code)) {
        return null;
      }
      throw error;
    });
  if (!session) return rejected;

  const { sessionId } = session;
  await writeSessionId(sessionId);

  redirect(stepHref({ kind: "question", position: FIRST_POSITION }));
};
