"use client";

import { ANSWER_MAX_LENGTH, type InteractionSignal } from "@rhea/contracts";
import { Send } from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { isSubmitShortcut } from "@/lib/keyboard";
import { submitAnswer } from "@/server/actions";

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

export function AnswerForm({ position }: { position: number }) {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, startSubmitting] = useTransition();
  const interaction = useRef<InteractionDraft>(emptyInteractionDraft(0));
  const answerIsReady = answer.trim().length > 0;

  useEffect(() => {
    interaction.current = emptyInteractionDraft(performance.now());
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
        draft.firstInputAt === null ? now - draft.shownAt : draft.firstInputAt - draft.shownAt,
      revisions: draft.revisions,
    };

    return signal;
  };

  const submitResponse = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedAnswer = answer.trim();
    if (!trimmedAnswer || isSubmitting) return;

    const signal = captureSignal();
    startSubmitting(() => submitAnswer({ position, answer: trimmedAnswer, signal }));
  };

  return (
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
            readOnly={isSubmitting}
            className="answer-input"
          />
          <FieldDescription id="response-hint" className="response-hint">
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
        disabled={!answerIsReady || isSubmitting}
        focusableWhenDisabled
        className="primary-action response-submit shadow-glow"
      >
        LET HER LISTEN
        <Send data-icon="inline-end" />
      </Button>
    </form>
  );
}
