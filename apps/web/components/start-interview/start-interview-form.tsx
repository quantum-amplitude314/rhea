"use client";

import { LoaderCircle } from "lucide-react";
import { type ReactNode, useActionState, useState } from "react";
import { TurnstileWidget } from "@/components/start-interview/turnstile-widget";
import { Button } from "@/components/ui/button";
import { type StartInterviewState, startInterview } from "@/server/actions";

const initialState: StartInterviewState = { verificationFailed: false };

export function StartInterviewForm({ children }: { children: ReactNode }) {
  const [state, formAction, isPending] = useActionState(startInterview, initialState);
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
        size="cta"
        disabled={isVerifying || isPending}
        focusableWhenDisabled
        className="primary-action shadow-glow"
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
