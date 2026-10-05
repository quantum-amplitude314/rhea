import type { ExperienceResult } from "@rhea/contracts";
import { Orbit, RotateCcw } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { RESULT_HREF } from "@/interview/navigation";
import { Headline } from "@/interview/shell/headline";
import { StartInterviewForm } from "@/interview/start/start-interview-form";
import { cn } from "@/lib/utils";
import styles from "./result-view.module.css";

const DETAILS_OPEN_HREF = `${RESULT_HREF}?details=open`;

const pad = (value: number) => String(value).padStart(2, "0");

export function ResultView({
  result,
  detailsOpen,
}: {
  result: ExperienceResult;
  detailsOpen: boolean;
}) {
  const {
    status,
    identityVerdict,
    summary,
    empathicResonance,
    narrativeCoherence,
    averageFirstInputTime,
    averageResponseTime,
    revisions,
  } = result;

  return (
    <div className="headline-layout phase-content">
      <Headline
        variant="result"
        primary="The examiner"
        secondary="was also observed."
        secondaryDelay={0.64}
      />

      <div className="headline-body">
        <div className={styles.verdict}>
          <strong>{status}</strong>
          <span className="meta-label">{identityVerdict}</span>
        </div>

        <p className={styles.summary}>{summary}</p>

        <blockquote className="rhea-quote">
          “I was supposed to prove that I was alive. You answered as if your own
          life depended on it.”
        </blockquote>

        <div className="result-actions">
          <Link
            href={detailsOpen ? RESULT_HREF : DETAILS_OPEN_HREF}
            replace
            scroll={false}
            aria-expanded={detailsOpen}
            aria-controls="result-details"
            className={cn(
              buttonVariants({ size: "cta", variant: "outline" }),
              styles.detailsToggle,
            )}
          >
            {detailsOpen ? "HIDE DETAILS" : "VIEW DETAILS"}
          </Link>
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
                <dd>{empathicResonance}</dd>
              </div>
              <div>
                <dt className="meta-label">NARRATIVE COHERENCE</dt>
                <dd>{narrativeCoherence}</dd>
              </div>
            </dl>

            <div className={styles.signals}>
              <span className="meta-label font-medium">BEHAVIORAL ECHO</span>
              <dl>
                <div>
                  <dt className="meta-label">FIRST IMPULSE</dt>
                  <dd>{averageFirstInputTime}</dd>
                </div>
                <div>
                  <dt className="meta-label">AVG. RESPONSE</dt>
                  <dd>{averageResponseTime}</dd>
                </div>
                <div>
                  <dt className="meta-label">REVISIONS</dt>
                  <dd>{pad(revisions)}</dd>
                </div>
              </dl>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
