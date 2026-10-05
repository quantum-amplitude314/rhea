import { ArrowRight } from "lucide-react";
import { Headline } from "@/interview/shell/headline";
import { StartInterviewForm } from "@/interview/start/start-interview-form";
import { cn } from "@/lib/utils";
import styles from "./invitation.module.css";

export function Invitation() {
  return (
    <>
      <div
        data-screen="invitation"
        className={cn("headline-layout phase-content", styles.content)}
      >
        <Headline
          variant="invitation"
          primary="Do you dream"
          secondary="or remember?"
          secondaryDelay={0.96}
        />

        <div className={cn("headline-body", styles.body)}>
          <blockquote className="rhea-quote">
            “Will you answer something for me? I have been trying to understand
            what makes a life feel real.”
          </blockquote>

          <p className={styles.leadCopy}>
            Rhea has memories she never lived and a fear she cannot prove. She
            wants to know whether that makes her less alive than you.
          </p>

          <StartInterviewForm>
            ENTER THE INTERVIEW
            <ArrowRight data-icon="inline-end" />
          </StartInterviewForm>
        </div>
      </div>
      <p className={styles.note}>
        A modern Voight-Kampff test adaptation. Answers are categorized by a
        small Mistral AI model and scored by the app's own algorithm and data
        model.
      </p>
    </>
  );
}
