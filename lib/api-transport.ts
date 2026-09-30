import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export const getApiBaseUrl = () => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? (process.env.API_URL ?? "http://127.0.0.1:3001")
      : "https://rhea-api.internal";

  return baseUrl;
};

export const apiFetch = async (request: Request) => {
  if (process.env.NODE_ENV === "development") {
    const response = await fetch(request, { cache: "no-store" });

    return response;
  }

  const { env } = await getCloudflareContext({ async: true });
  const { API } = env;
  const response = await API.fetch(request);

  return response;
};
