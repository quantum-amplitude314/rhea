import "server-only";

import { createORPCClient } from "@orpc/client";
import type { ContractRouterClient } from "@orpc/contract";
import type { JsonifiedClient } from "@orpc/openapi-client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { type Contract, contract, SESSION_COOKIE } from "@rhea/contracts";
import { apiFetch, getApiBaseUrl } from "@/lib/api-transport";
import { readSessionId } from "@/lib/session/cookie";

const link = new OpenAPILink(contract, {
  url: getApiBaseUrl,
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
  fetch: (request, init) => apiFetch(new Request(request, init)),
});

export const apiClient: JsonifiedClient<ContractRouterClient<Contract>> =
  createORPCClient(link);
