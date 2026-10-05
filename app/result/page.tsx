import { ResultView } from "@/interview/result/result-view";
import { loadResult } from "@/interview/server/load";
import { InterviewProgress } from "@/interview/shell/interview-progress";

export const dynamic = "force-dynamic";

export default async function ResultPage({
  searchParams,
}: PageProps<"/result">) {
  const [result, { details }] = await Promise.all([loadResult(), searchParams]);

  return (
    <>
      <InterviewProgress value={100} />
      <ResultView result={result} detailsOpen={details === "open"} />
    </>
  );
}
