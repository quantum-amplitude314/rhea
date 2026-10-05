import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createORPCClient } from "@orpc/client";
import type { ContractRouterClient } from "@orpc/contract";
import type { JsonifiedClient } from "@orpc/openapi-client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { type Contract, contract, SESSION_COOKIE } from "@rhea/contracts";
import { readSessionId } from "@/interview/server/session-cookie";

const fetchThroughBinding = async (request: Request) => {
  const { env } = await getCloudflareContext({ async: true });
  const response = await env.API.fetch(request);

  return response;
};

const link = new OpenAPILink(contract, {
  // Placeholder host, never resolved: https://developers.cloudflare.com/workers/cache/cache-keys/#service-binding-url
  url: "https://api.internal",
  headers: async () => {
    const sessionId = await readSessionId();
    const headers = new Headers();
    if (sessionId) {
      headers.set(
        "cookie",
        `${SESSION_COOKIE}=${encodeURIComponent(sessionId)}`,
      );
    }

    return headers;
  },
  fetch: (request, init) => fetchThroughBinding(new Request(request, init)),
});

export const apiClient: JsonifiedClient<ContractRouterClient<Contract>> =
  createORPCClient(link);
