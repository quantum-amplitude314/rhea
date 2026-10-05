import { ORPCError } from "@orpc/client";
import { redirect } from "next/navigation";
import { ResultView } from "@/interview/result/result-view";
import { apiClient } from "@/interview/server/api";
import { readSessionId } from "@/interview/server/session-cookie";

export const dynamic = "force-dynamic";

export default async function Page() {
  const sessionId = await readSessionId();
  if (!sessionId) redirect("/");

  const result = await apiClient.interview.result().catch((error: unknown) => {
    if (error instanceof ORPCError) {
      const { code } = error;
      if (code === "UNAUTHORIZED" || code === "NOT_FOUND") redirect("/");
    }
    throw error;
  });

  return <ResultView result={result} />;
}
