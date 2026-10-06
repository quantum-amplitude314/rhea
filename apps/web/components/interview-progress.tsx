import { Progress, ProgressLabel } from "@/components/ui/progress";
import styles from "./interview-progress.module.css";

export function InterviewProgress({ value }: { value: number }) {
  return (
    <div className={styles.rail}>
      <Progress value={value} className={styles.progress}>
        <ProgressLabel className="sr-only">Interview progress</ProgressLabel>
      </Progress>
    </div>
  );
}
