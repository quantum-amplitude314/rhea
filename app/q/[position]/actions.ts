"use server";

import type { Submission } from "@rhea/contracts";
import { apiClient } from "@/lib/api";

export const submitAnswer = async (submission: Submission) => {
  const reflection = await apiClient.interview.submit(submission);

  return reflection;
};
