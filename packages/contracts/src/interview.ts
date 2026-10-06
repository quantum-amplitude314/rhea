import { z } from "zod";

export const ANSWER_MAX_LENGTH = 700;
export const SESSION_COOKIE = "rhea_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export const interactionSignalSchema = z.object({
  responseTimeMs: z.number().nonnegative(),
  firstInputMs: z.number().nonnegative(),
  revisions: z.number().int().nonnegative(),
});

export const submissionSchema = z.object({
  position: z.number().int().min(1),
  answer: z.string().trim().min(1).max(ANSWER_MAX_LENGTH),
  signal: interactionSignalSchema,
});

export const startInputSchema = z.object({
  turnstileToken: z.string().min(1).max(2048),
});

export const sessionSchema = z.object({
  sessionId: z.uuid(),
});

export const questionViewSchema = z.object({
  position: z.number().int().min(1),
  total: z.number().int().min(1),
  prompt: z.string().min(1),
  whisper: z.string(),
  answer: z.string().nullable(),
});

export const answerReceiptSchema = z.object({
  position: z.number().int().min(1),
});

export const reflectionViewSchema = z.object({
  source: z.enum(["ai", "offline"]),
  reflection: z.string(),
  echo: z.string().nullable(),
});

export const experienceResultSchema = z.object({
  status: z.enum(["RECIPROCAL", "UNRESOLVED", "WITHHELD", "OFFLINE"]),
  summary: z.string(),
  identityVerdict: z.string(),
  empathicResonance: z.string(),
  narrativeCoherence: z.string(),
  averageResponseTime: z.string(),
  averageFirstInputTime: z.string(),
  revisions: z.number().int().nonnegative(),
});

export type InteractionSignal = z.infer<typeof interactionSignalSchema>;
export type Submission = z.infer<typeof submissionSchema>;
export type StartInput = z.infer<typeof startInputSchema>;
export type InterviewSession = z.infer<typeof sessionSchema>;
export type QuestionView = z.infer<typeof questionViewSchema>;
export type AnswerReceipt = z.infer<typeof answerReceiptSchema>;
export type ReflectionView = z.infer<typeof reflectionViewSchema>;
export type ExperienceResult = z.infer<typeof experienceResultSchema>;
