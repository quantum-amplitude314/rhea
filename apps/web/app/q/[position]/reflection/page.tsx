import { redirect } from "next/navigation";
import { Suspense } from "react";
import { InterviewProgress } from "@/components/interview-progress";
import { Separator } from "@/components/ui/separator";
import { nextHref, questionHref } from "@/lib/navigation";
import { loadQuestion, readPosition } from "@/server/load";
import { RheaListening } from "./_components/rhea-listening";
import { RheaReply } from "./_components/rhea-reply";

export default async function ReflectionPage({ params }: PageProps<"/q/[position]/reflection">) {
  const position = await readPosition(params);
  const { total, answer } = await loadQuestion(position);
  if (answer === null) redirect(questionHref(position));

  const continueHref = nextHref({ position, total });
  const continueLabel = position >= total ? "SEE WHAT SHE SAW" : "STAY WITH HER";

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
