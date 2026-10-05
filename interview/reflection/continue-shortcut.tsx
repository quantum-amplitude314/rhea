"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isSubmitShortcut } from "@/interview/keyboard";

export function ContinueShortcut({ href }: { href: string }) {
  const router = useRouter();

  useEffect(() => {
    const continueOnShortcut = (event: KeyboardEvent) => {
      if (event.repeat || !isSubmitShortcut(event)) return;

      event.preventDefault();
      router.push(href);
    };
    window.addEventListener("keydown", continueOnShortcut);

    return () => window.removeEventListener("keydown", continueOnShortcut);
  }, [href, router]);

  return null;
}
