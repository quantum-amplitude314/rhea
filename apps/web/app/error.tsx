"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InterviewError({
  retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  retry: () => void;
}) {
  return (
    <div className="question-content phase-content">
      <span className="meta-label">SIGNAL LOST</span>
      <h1 className="question-prompt">The line went quiet between us.</h1>
      <p className="question-whisper">I am still here. Try again.</p>
      <Button size="cta" onClick={retry} className="primary-action shadow-glow self-end">
        <RotateCcw data-icon="inline-start" />
        TRY AGAIN
      </Button>
    </div>
  );
}
