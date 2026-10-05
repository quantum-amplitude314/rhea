import { ORPCError } from "@orpc/client";
import { notFound, redirect } from "next/navigation";
import { parsePosition } from "@/interview/navigation";
import { apiClient } from "@/interview/server/api";
import { readSessionId } from "@/interview/server/session-cookie";
import { InterviewStep } from "@/interview/step/interview-step";

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
    <InterviewStep
      key={position}
      position={position}
      total={total}
      prompt={prompt}
      whisper={whisper}
    />
  );
}
