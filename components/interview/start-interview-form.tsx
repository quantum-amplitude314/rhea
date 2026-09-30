"use client";

import { LoaderCircle } from "lucide-react";
import { type ReactNode, useActionState, useState } from "react";
import { type StartInterviewState, startInterview } from "@/app/actions";
import { TurnstileWidget } from "@/components/interview/turnstile-widget";
import { Button } from "@/components/ui/button";

const initialState: StartInterviewState = { verificationFailed: false };

export function StartInterviewForm({ children }: { children: ReactNode }) {
  const [state, formAction, isPending] = useActionState(
    startInterview,
    initialState,
  );
  const [token, setToken] = useState<string | null>(null);
  const [challengeKey, setChallengeKey] = useState(0);
  const [answeredState, setAnsweredState] = useState(state);

  // A Turnstile token is single-use, so every failed start needs a fresh challenge.
  if (state !== answeredState) {
    setAnsweredState(state);
    setChallengeKey((key) => key + 1);
  }

  const isVerifying = token === null;

  return (
    <form action={formAction} className="start-interview">
      <TurnstileWidget key={challengeKey} onTokenChange={setToken} />
      <Button
        type="submit"
        size="lg"
        disabled={isVerifying || isPending}
        focusableWhenDisabled
        className="primary-action"
      >
        {isVerifying ? (
          <>
            <LoaderCircle
              data-icon="inline-start"
              aria-hidden="true"
              className="motion-safe:animate-spin"
            />
            VERIFYING
          </>
        ) : (
          children
        )}
      </Button>
      {state.verificationFailed ? (
        <p role="alert" className="verification-error">
          Verification failed. Please try again.
        </p>
      ) : null}
    </form>
  );
}
