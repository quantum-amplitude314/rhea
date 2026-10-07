import type { MetadataRoute } from "next";
import { getEnv } from "@/lib/env";

const sitemap = async () => {
  const { WEB_ORIGIN: webOrigin } = await getEnv();
  const entries: MetadataRoute.Sitemap = [{ url: `${webOrigin}/` }];

  return entries;
};

export default sitemap;
