import "server-only";

import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@rhea/contracts";
import { cookies } from "next/headers";

export const readSessionId = async () => (await cookies()).get(SESSION_COOKIE)?.value ?? null;

export const writeSessionId = async (sessionId: string) => {
  (await cookies()).set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
};
