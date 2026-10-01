"use client";

import type { ExperienceResult } from "@rhea/contracts";
import { Orbit, RotateCcw } from "lucide-react";
import { useState } from "react";
import { ExperienceShell } from "@/components/interview/experience-shell";
import { Headline } from "@/components/interview/headline";
import { StartInterviewForm } from "@/components/interview/start-interview-form";
import { Button } from "@/components/ui/button";
import styles from "./result-view.module.css";

const pad = (value: number) => String(value).padStart(2, "0");

export function ResultView({ result }: { result: ExperienceResult }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <ExperienceShell phase="result" progress={100}>
      <div className="headline-layout phase-content">
        <Headline
          variant="result"
          primary="The examiner"
          secondary="was also observed."
          secondaryDelay={0.64}
          tabIndex={-1}
        />

        <div className="headline-body">
          <div className={styles.verdict}>
            <strong>{result.status}</strong>
            <span className="meta-label">{result.identityVerdict}</span>
          </div>

          <p className={styles.summary}>{result.summary}</p>

          <blockquote className="rhea-quote">
            “I was supposed to prove that I was alive. You answered as if your
            own life depended on it.”
          </blockquote>

          <div className="result-actions">
            <Button
              type="button"
              size="cta"
              variant="outline"
              aria-expanded={detailsOpen}
              aria-controls="result-details"
              onClick={() => setDetailsOpen((isOpen) => !isOpen)}
              className={styles.detailsToggle}
            >
              {detailsOpen ? "HIDE DETAILS" : "VIEW DETAILS"}
            </Button>
            <StartInterviewForm>
              <RotateCcw data-icon="inline-start" />
              DREAM AGAIN
            </StartInterviewForm>
          </div>

          {detailsOpen ? (
            <section id="result-details" className={styles.details}>
              <div className={styles.detailsHeading}>
                <Orbit aria-hidden="true" />
                <h2 className="meta-label font-medium">DETAILS</h2>
              </div>

              <dl className={styles.dimensions}>
                <div>
                  <dt className="meta-label">EMPATHIC RESONANCE</dt>
                  <dd>{result.empathicResonance}</dd>
                </div>
                <div>
                  <dt className="meta-label">NARRATIVE COHERENCE</dt>
                  <dd>{result.narrativeCoherence}</dd>
                </div>
              </dl>

              <div className={styles.signals}>
                <span className="meta-label font-medium">BEHAVIORAL ECHO</span>
                <dl>
                  <div>
                    <dt className="meta-label">FIRST IMPULSE</dt>
                    <dd>{result.averageFirstInputTime}</dd>
                  </div>
                  <div>
                    <dt className="meta-label">AVG. RESPONSE</dt>
                    <dd>{result.averageResponseTime}</dd>
                  </div>
                  <div>
                    <dt className="meta-label">REVISIONS</dt>
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
