"use server";

import { ORPCError } from "@orpc/client";
import type { Submission } from "@rhea/contracts";
import { RedirectType, redirect } from "next/navigation";
import { FIRST_POSITION, questionHref, reflectionHref } from "@/lib/navigation";
import { apiClient } from "@/server/api";
import { writeSessionId } from "@/server/session-cookie";

export type StartInterviewState = { verificationFailed: boolean };

const REJECTED_START_CODES = new Set(["FORBIDDEN", "BAD_REQUEST"]);

// Server Actions passed to `useActionState` keep React's (previousState, formData) signature.
export const startInterview = async (_previousState: StartInterviewState, formData: FormData) => {
  const rejected: StartInterviewState = { verificationFailed: true };
  const turnstileToken = formData.get("cf-turnstile-response");
  if (typeof turnstileToken !== "string" || !turnstileToken) return rejected;

  const session = await apiClient.interview.start({ turnstileToken }).catch((error: unknown) => {
    if (error instanceof ORPCError && REJECTED_START_CODES.has(error.code)) {
      return null;
    }
    throw error;
  });
  if (!session) return rejected;

  const { sessionId } = session;
  await writeSessionId(sessionId);

  redirect(questionHref(FIRST_POSITION));
};

export const submitAnswer = async (submission: Submission) => {
  const { position } = submission;
  await apiClient.interview.submit(submission).catch((error: unknown) => {
    if (!(error instanceof ORPCError)) throw error;
    const { code } = error;
    if (code === "UNAUTHORIZED") redirect("/");
    if (code !== "CONFLICT") throw error;
  });

  redirect(reflectionHref(position), RedirectType.replace);
};
