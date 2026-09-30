"use client";

import type { ExperienceResult } from "@rhea/contracts";
import { Orbit, RotateCcw } from "lucide-react";
import { useState } from "react";
import { ExperienceShell } from "@/components/interview/experience-shell";
import { StartInterviewForm } from "@/components/interview/start-interview-form";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";

const pad = (value: number) => String(value).padStart(2, "0");

export function ResultView({ result }: { result: ExperienceResult }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <ExperienceShell phase="result" progress={100}>
      <div className="headline-layout phase-content">
        <div className="result-heading">
          <h1 tabIndex={-1} aria-label="The examiner was also observed.">
            <TextReveal aria-hidden="true" className="result-title-primary">
              The examiner
            </TextReveal>
            <TextReveal
              aria-hidden="true"
              delay={0.64}
              className="result-title-secondary"
            >
              was also observed.
            </TextReveal>
          </h1>
        </div>

        <div className="headline-body">
          <div className="result-verdict">
            <strong>{result.status}</strong>
            <span>{result.identityVerdict}</span>
          </div>

          <p className="result-summary">{result.summary}</p>

          <blockquote className="rhea-quote">
            “I was supposed to prove that I was alive. You answered as if your
            own life depended on it.”
          </blockquote>

          <div className="result-actions">
            <Button
              type="button"
              size="lg"
              variant="outline"
              aria-expanded={detailsOpen}
              aria-controls="result-details"
              onClick={() => setDetailsOpen((isOpen) => !isOpen)}
              className="details-toggle"
            >
              {detailsOpen ? "HIDE DETAILS" : "VIEW DETAILS"}
            </Button>
            <StartInterviewForm>
              <RotateCcw data-icon="inline-start" />
              DREAM AGAIN
            </StartInterviewForm>
          </div>

          {detailsOpen ? (
            <section id="result-details" className="result-details">
              <div className="details-heading">
                <Orbit aria-hidden="true" />
                <h2>DETAILS</h2>
              </div>

              <dl className="result-dimensions">
                <div>
                  <dt>EMPATHIC RESONANCE</dt>
                  <dd>{result.empathicResonance}</dd>
                </div>
                <div>
                  <dt>NARRATIVE COHERENCE</dt>
                  <dd>{result.narrativeCoherence}</dd>
                </div>
              </dl>

              <div className="observed-signals">
                <span>BEHAVIORAL ECHO</span>
                <dl>
                  <div>
                    <dt>FIRST IMPULSE</dt>
                    <dd>{result.averageFirstInputTime}</dd>
                  </div>
                  <div>
                    <dt>AVG. RESPONSE</dt>
                    <dd>{result.averageResponseTime}</dd>
                  </div>
                  <div>
                    <dt>REVISIONS</dt>
                    <dd>{pad(result.revisions)}</dd>
                  </div>
                </dl>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </ExperienceShell>
  );
}
