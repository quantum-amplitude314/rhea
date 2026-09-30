import { ORPCError } from "@orpc/client";
import { notFound, redirect } from "next/navigation";
import { InterviewStep } from "@/components/interview/interview-step";
import { apiClient } from "@/lib/api";
import { parsePosition } from "@/lib/interview/navigation";
import { readSessionId } from "@/lib/session/cookie";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ position: string }>;
}) {
  const sessionId = await readSessionId();
  if (!sessionId) redirect("/");

  const { position: rawPosition } = await params;
  const position = parsePosition(rawPosition);
  if (position === null) notFound();

  const { total, prompt, whisper } = await apiClient.interview
    .question({ position })
    .catch((error: unknown) => {
      if (error instanceof ORPCError) {
        const { code } = error;
        if (code === "UNAUTHORIZED") redirect("/");
        if (code === "NOT_FOUND") notFound();
      }
      throw error;
    });

  return (
    <InterviewStep key={position} position={position} total={total}>
      <h1 className="question-prompt" tabIndex={-1} data-phase-heading>
        {prompt}
      </h1>
      <p className="question-whisper">{whisper}</p>
    </InterviewStep>
  );
}
