import { redirect } from "next/navigation";
import { InterviewProgress } from "@/components/interview-progress";
import { reflectionHref } from "@/lib/navigation";
import { loadQuestion, readPosition } from "@/server/load";
import { AnswerForm } from "./_components/answer-form";
import { FocusedHeading } from "./_components/focused-heading";

export default async function QuestionPage({ params }: PageProps<"/q/[position]">) {
  const position = await readPosition(params);
  const { total, prompt, whisper, answer } = await loadQuestion(position);
  if (answer !== null) redirect(reflectionHref(position));

  return (
    <>
      <InterviewProgress value={(position / total) * 100} />
      <div className="question-content phase-content">
        <span className="meta-label">RHEA ASKS</span>
        <FocusedHeading className="question-prompt">{prompt}</FocusedHeading>
        <p className="question-whisper">{whisper}</p>
        <AnswerForm position={position} />
      </div>
    </>
  );
}
