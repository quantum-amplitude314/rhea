import type { MetadataRoute } from "next";
import { getEnv } from "@/lib/env";

const robots = async () => {
  const { WEB_ORIGIN: webOrigin } = await getEnv();
  const config: MetadataRoute.Robots = {
    rules: { userAgent: "*", allow: "/", disallow: ["/q/", "/result"] },
    sitemap: `${webOrigin}/sitemap.xml`,
  };

  return config;
};

export default robots;
