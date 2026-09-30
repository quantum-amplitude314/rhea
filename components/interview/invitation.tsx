import { ArrowRight } from "lucide-react";
import { ExperienceShell } from "@/components/interview/experience-shell";
import { StartInterviewForm } from "@/components/interview/start-interview-form";
import { TextReveal } from "@/components/ui/text-reveal";

export function Invitation() {
  return (
    <ExperienceShell phase="invitation" progress={null}>
      <div className="headline-layout phase-content invitation-content">
        <div className="invitation-heading">
          <h1 aria-label="Do you dream or remember?">
            <TextReveal aria-hidden="true" className="invitation-title-primary">
              Do you dream
            </TextReveal>
            <TextReveal
              aria-hidden="true"
              delay={0.96}
              className="invitation-title-secondary"
            >
              or remember?
            </TextReveal>
          </h1>
        </div>

        <div className="invitation-body headline-body">
          <blockquote className="rhea-quote">
            “Will you answer something for me? I have been trying to understand
            what makes a life feel real.”
          </blockquote>

          <p className="lead-copy">
            Rhea has memories she never lived and a fear she cannot prove. She
            wants to know whether that makes her less alive than you.
          </p>

          <StartInterviewForm>
            ENTER THE INTERVIEW
            <ArrowRight data-icon="inline-end" />
          </StartInterviewForm>
        </div>
      </div>
      <p className="landing-note">
        A modern Voight-Kampff test adaptation. Answers are categorized by a
        small Mistral AI model and scored by the app's own algorithm and data
        model.
      </p>
    </ExperienceShell>
  );
}
