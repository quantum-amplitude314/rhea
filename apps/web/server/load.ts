import "server-only";

import { ORPCError } from "@orpc/client";
import { notFound, redirect } from "next/navigation";
import { parsePosition } from "@/lib/navigation";
import { apiClient } from "@/server/api";

const handleApiError = (error: unknown): never => {
  if (error instanceof ORPCError) {
    const { code } = error;
    if (code === "UNAUTHORIZED") redirect("/");
    if (code === "NOT_FOUND") notFound();
  }
  throw error;
};

export const readPosition = async (params: Promise<{ position: string }>) => {
  const { position: rawPosition } = await params;
  const position = parsePosition(rawPosition);
  if (position === null) notFound();

  return position;
};

export const loadQuestion = (position: number) =>
  apiClient.interview.question({ position }).catch(handleApiError);

export const loadReflection = (position: number) =>
  apiClient.interview.reflection({ position }).catch(handleApiError);

export const loadResult = () => apiClient.interview.result().catch(handleApiError);
