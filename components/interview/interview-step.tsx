"use client";

import {
  ANSWER_MAX_LENGTH,
  type InteractionSignal,
  type ReflectionView,
} from "@rhea/contracts";
import { ArrowRight, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { submitAnswer } from "@/app/q/[position]/actions";
import { ExperienceShell } from "@/components/interview/experience-shell";
import type { Phase } from "@/components/interview/portrait";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { unreachableReflection } from "@/lib/interview/fallback";
import { nextStep, stepHref } from "@/lib/interview/navigation";

type InteractionDraft = {
  shownAt: number;
  firstInputAt: number | null;
  previousLength: number;
  revisions: number;
};

const emptyInteractionDraft = (shownAt: number): InteractionDraft => ({
  shownAt,
  firstInputAt: null,
  previousLength: 0,
  revisions: 0,
});

export function InterviewStep({
  position,
  total,
  children,
}: {
  position: number;
  total: number;
  children: ReactNode;
}) {
  const router = useRouter();
  const [phase, setPhase] =
    useState<Extract<Phase, "question" | "reflection">>("question");
  const [answer, setAnswer] = useState("");
  const [pendingAnswer, setPendingAnswer] = useState("");
  const [reflectionView, setReflectionView] = useState<ReflectionView | null>(
    null,
  );
  const interaction = useRef<InteractionDraft>(emptyInteractionDraft(0));
  const panelRef = useRef<HTMLDivElement>(null);
  const step = nextStep({ position, total });
  const progress = (position / total) * 100;
  const answerIsReady = answer.trim().length > 0;
  const isEvaluating = phase === "reflection" && reflectionView === null;

  useEffect(() => {
    interaction.current = emptyInteractionDraft(performance.now());
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector<HTMLElement>("[data-phase-heading]")
        ?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const handleAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    const draft = interaction.current;

    if (draft.firstInputAt === null && value.trim()) {
      draft.firstInputAt = performance.now();
    }
    if (value.length < draft.previousLength) {
      draft.revisions += 1;
    }
    draft.previousLength = value.length;
    setAnswer(value);
  };

  const handleAnswerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  const captureSignal = (): InteractionSignal => {
    const now = performance.now();
    const draft = interaction.current;
    const signal: InteractionSignal = {
      responseTimeMs: now - draft.shownAt,
      firstInputMs:
        draft.firstInputAt === null
          ? now - draft.shownAt
          : draft.firstInputAt - draft.shownAt,
      revisions: draft.revisions,
    };

    return signal;
  };

  const submitResponse = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedAnswer = answer.trim();
    if (!trimmedAnswer || isEvaluating) return;

    const signal = captureSignal();
    setPendingAnswer(trimmedAnswer);
    setPhase("reflection");

    const received = await submitAnswer({
      position,
      answer: trimmedAnswer,
      signal,
    }).catch(() => unreachableReflection);

    setReflectionView(received);
  };

  return (
    <ExperienceShell phase={phase} progress={progress}>
      <div ref={panelRef} className="interview-step">
        {phase === "question" ? (
          <div className="question-content phase-content">
            <span className="speaker">RHEA ASKS</span>

            {children}

            <form onSubmit={submitResponse} className="response-form">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="response">YOUR RESPONSE</FieldLabel>
                  <Textarea
                    id="response"
                    name="response"
                    value={answer}
                    onChange={handleAnswerChange}
                    onKeyDown={handleAnswerKeyDown}
                    aria-describedby="response-hint"
                    autoComplete="off"
                    placeholder="Tell her what you believe…"
                    maxLength={ANSWER_MAX_LENGTH}
                    rows={5}
                    className="answer-input"
                  />
                  <FieldDescription
                    id="response-hint"
                    className="response-hint"
                  >
                    <span>
                      {answer.length} / {ANSWER_MAX_LENGTH}
                    </span>
                    <span className="response-shortcut">CTRL + ENTER</span>
                  </FieldDescription>
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                size="lg"
                disabled={!answerIsReady}
                focusableWhenDisabled
                className="primary-action response-submit"
              >
                LET HER LISTEN
                <Send data-icon="inline-end" />
              </Button>
            </form>
          </div>
        ) : (
          <div className="reflection-content phase-content" aria-live="polite">
            <div className="response-echo">
              <span>YOU SAID</span>
              <blockquote>“{pendingAnswer}”</blockquote>
            </div>

            <Separator className="reflection-separator" />

            {reflectionView === null ? (
              <div className="rhea-reflection rhea-listening">
                <span>RHEA / LISTENING</span>
                <p className="listening-indicator" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </p>
                <span className="sr-only">Rhea is listening</span>
              </div>
            ) : (
              <div className="rhea-reflection">
                <span>RHEA / AFTER A PAUSE</span>
                <h1 tabIndex={-1} aria-label={reflectionView.reflection}>
                  <span className="typing-reserve" aria-hidden="true">
                    {reflectionView.reflection}
                  </span>
                  <TypingAnimation
                    aria-hidden="true"
                    className="typing-visible"
                    showCursor={false}
                    startOnView={false}
                    typeSpeed={22}
                  >
                    {reflectionView.reflection}
                  </TypingAnimation>
                </h1>
                {reflectionView.echo ? (
                  <p className="reflection-echo">
                    “{reflectionView.echo}” — that is the part I will keep.
                  </p>
                ) : null}
              </div>
            )}

            <Button
              size="lg"
              onClick={() => router.push(stepHref(step))}
              disabled={reflectionView === null}
              className="primary-action reflection-action"
            >
              {step.kind === "result" ? "SEE WHAT SHE SAW" : "STAY WITH HER"}
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        )}
      </div>
    </ExperienceShell>
  );
}
