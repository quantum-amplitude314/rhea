"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { publicEnv } from "@/lib/public-env";

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  remove: (widgetId: string) => void;
};

type TurnstileRenderOptions = {
  sitekey: string;
  theme: "dark";
  appearance: "interaction-only";
  callback: (token: string) => void;
  "before-interactive-callback": () => void;
  "expired-callback": () => void;
  "error-callback": () => void;
  "timeout-callback": () => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const TURNSTILE_SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

const { NEXT_PUBLIC_TURNSTILE_SITE_KEY: siteKey } = publicEnv;

export function TurnstileWidget({
  onTokenChange,
}: {
  onTokenChange: (token: string | null) => void;
}) {
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const { turnstile } = window;
    if (!isScriptReady || !container || !turnstile) return;

    const clearToken = () => onTokenChange(null);
    const widgetId = turnstile.render(container, {
      sitekey: siteKey,
      theme: "dark",
      appearance: "interaction-only",
      callback: onTokenChange,
      "before-interactive-callback": () => setIsShown(true),
      "expired-callback": clearToken,
      "error-callback": () => {
        clearToken();
        setIsShown(true);
      },
      "timeout-callback": clearToken,
    });

    return () => {
      turnstile.remove(widgetId);
      clearToken();
    };
  }, [container, isScriptReady, onTokenChange]);

  return (
    <>
      <Script src={TURNSTILE_SCRIPT_URL} onReady={() => setIsScriptReady(true)} />
      <div ref={setContainer} className="turnstile-widget" data-shown={isShown || undefined} />
    </>
  );
}
