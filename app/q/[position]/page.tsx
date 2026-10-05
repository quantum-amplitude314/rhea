import { redirect } from "next/navigation";
import { reflectionHref } from "@/interview/navigation";
import { AnswerForm } from "@/interview/question/answer-form";
import { FocusedHeading } from "@/interview/question/focused-heading";
import { loadQuestion, readPosition } from "@/interview/server/load";
import { InterviewProgress } from "@/interview/shell/interview-progress";

export const dynamic = "force-dynamic";

export default async function QuestionPage({
  params,
}: PageProps<"/q/[position]">) {
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
