// @ts-expect-error The OpenNext build generates this JavaScript entry without types.
import openNextWorker from "./.open-next/worker.js";

// Static assets are served before the Worker runs, so a file path reaching it is a missing file.
const MISSING_FILE_PATH = /\.(?:avif|ico|jpg|png|svg|txt|xml)$/;

export default {
  fetch: async (request, env, ctx) => {
    const { pathname } = new URL(request.url);
    if (MISSING_FILE_PATH.test(pathname)) return new Response(null, { status: 404 });
    const response = await openNextWorker.fetch(request, env, ctx);

    return response;
  },
} satisfies ExportedHandler<CloudflareEnv>;
