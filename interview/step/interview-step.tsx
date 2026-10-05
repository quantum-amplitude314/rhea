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
  useEffect,
  useRef,
  useState,
} from "react";
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
import { nextStep, stepHref } from "@/interview/navigation";
import { submitAnswer } from "@/interview/server/actions";
import { ExperienceShell } from "@/interview/shell/experience-shell";
import type { Phase } from "@/interview/shell/portrait";
import { unreachableReflection } from "@/interview/step/unreachable-reflection";

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

const isSubmitShortcut = ({
  metaKey,
  ctrlKey,
  key,
}: {
  metaKey: boolean;
  ctrlKey: boolean;
  key: string;
}) => (metaKey || ctrlKey) && key === "Enter";

export function InterviewStep({
  position,
  total,
  prompt,
  whisper,
}: {
  position: number;
  total: number;
  prompt: string;
  whisper: string;
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
  const promptHeadingRef = useRef<HTMLHeadingElement>(null);
  const step = nextStep({ position, total });
  const nextStepHref = stepHref(step);
  const progress = (position / total) * 100;
  const answerIsReady = answer.trim().length > 0;
  const isEvaluating = phase === "reflection" && reflectionView === null;
  const canContinue = reflectionView !== null;

  useEffect(() => {
    interaction.current = emptyInteractionDraft(performance.now());
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      promptHeadingRef.current?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!canContinue) return;

    const continueOnShortcut = (event: globalThis.KeyboardEvent) => {
      if (event.repeat || !isSubmitShortcut(event)) return;

      event.preventDefault();
      router.push(nextStepHref);
    };
    window.addEventListener("keydown", continueOnShortcut);

    return () => window.removeEventListener("keydown", continueOnShortcut);
  }, [canContinue, nextStepHref, router]);

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
    if (isSubmitShortcut(event)) {
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
      <div className="interview-step">
        {phase === "question" ? (
          <div className="question-content phase-content">
            <span className="meta-label">RHEA ASKS</span>

            <h1
              ref={promptHeadingRef}
              className="question-prompt"
              tabIndex={-1}
            >
              {prompt}
            </h1>
            <p className="question-whisper">{whisper}</p>

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
                size="cta"
                disabled={!answerIsReady}
                focusableWhenDisabled
                className="primary-action response-submit shadow-glow"
              >
                LET HER LISTEN
                <Send data-icon="inline-end" />
              </Button>
            </form>
          </div>
        ) : (
          <div className="reflection-content phase-content" aria-live="polite">
            <div className="response-echo">
              <span className="meta-label">YOU SAID</span>
              <blockquote>“{pendingAnswer}”</blockquote>
            </div>

            <Separator className="reflection-separator" />

            {reflectionView === null ? (
              <div className="rhea-reflection rhea-listening">
                <span className="meta-label">RHEA / LISTENING</span>
                <p className="listening-indicator" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </p>
                <span className="sr-only">Rhea is listening</span>
              </div>
            ) : (
              <div className="rhea-reflection">
                <span className="meta-label">RHEA / AFTER A PAUSE</span>
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

            <div className="reflection-actions">
              <span className="reflection-shortcut">CTRL + ENTER</span>
              <Button
                size="cta"
                onClick={() => router.push(nextStepHref)}
                disabled={!canContinue}
                className="primary-action shadow-glow"
              >
                {step.kind === "result" ? "SEE WHAT SHE SAW" : "STAY WITH HER"}
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </ExperienceShell>
  );
}
