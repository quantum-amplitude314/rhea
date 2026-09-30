import { oc } from "@orpc/contract";
import { z } from "zod";
import {
  experienceResultSchema,
  questionViewSchema,
  reflectionViewSchema,
  sessionSchema,
  startInputSchema,
  submissionSchema,
} from "./interview.ts";

const authenticated = oc.errors({
  UNAUTHORIZED: { message: "No active interview session" },
  NOT_FOUND: { message: "Interview resource not found" },
});

export const contract = {
  interview: {
    start: oc
      .errors({ FORBIDDEN: { message: "Human verification failed" } })
      .route({ method: "POST", path: "/interview/start" })
      .input(startInputSchema)
      .output(sessionSchema),
    question: authenticated
      .route({ method: "GET", path: "/interview/questions/{position}" })
      .input(z.object({ position: z.coerce.number<number>().int().min(1) }))
      .output(questionViewSchema),
    submit: authenticated
      .route({ method: "POST", path: "/interview/answers" })
      .input(submissionSchema)
      .output(reflectionViewSchema),
    result: authenticated
      .route({ method: "GET", path: "/interview/result" })
      .output(experienceResultSchema),
  },
};

export type Contract = typeof contract;

export {
  ANSWER_MAX_LENGTH,
  type ExperienceResult,
  experienceResultSchema,
  type InteractionSignal,
  type InterviewSession,
  interactionSignalSchema,
  type QuestionView,
  questionViewSchema,
  type ReflectionView,
  reflectionViewSchema,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  type StartInput,
  type Submission,
  sessionSchema,
  startInputSchema,
  submissionSchema,
} from "./interview.ts";
