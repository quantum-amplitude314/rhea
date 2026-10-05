import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { nextHref, questionHref } from "@/interview/navigation";
import { RheaListening } from "@/interview/reflection/rhea-listening";
import { RheaReply } from "@/interview/reflection/rhea-reply";
import { loadQuestion, readPosition } from "@/interview/server/load";
import { InterviewProgress } from "@/interview/shell/interview-progress";

export const dynamic = "force-dynamic";

export default async function ReflectionPage({
  params,
}: PageProps<"/q/[position]/reflection">) {
  const position = await readPosition(params);
  const { total, answer } = await loadQuestion(position);
  if (answer === null) redirect(questionHref(position));

  const continueHref = nextHref({ position, total });
  const continueLabel =
    position >= total ? "SEE WHAT SHE SAW" : "STAY WITH HER";

  return (
    <>
      <InterviewProgress value={(position / total) * 100} />
      <div className="reflection-content phase-content" aria-live="polite">
        <div className="response-echo">
          <span className="meta-label">YOU SAID</span>
          <blockquote>“{answer}”</blockquote>
        </div>

        <Separator className="reflection-separator" />

        <Suspense fallback={<RheaListening continueLabel={continueLabel} />}>
          <RheaReply
            position={position}
            continueHref={continueHref}
            continueLabel={continueLabel}
          />
        </Suspense>
      </div>
    </>
  );
}
