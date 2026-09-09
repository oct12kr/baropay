import { NextResponse } from "next/server";

/**
 * Temporary diagnostic endpoint to check why WordPress posts aren't showing
 * in production. Reports only booleans/status codes — never env var values.
 * Remove once the WordPress connectivity issue is confirmed fixed.
 */
export async function GET() {
  const hasUrl = Boolean(process.env.WORDPRESS_URL);
  const hasUsername = Boolean(process.env.WORDPRESS_USERNAME);
  const hasPassword = Boolean(process.env.WORDPRESS_APP_PASSWORD);

  let fetchOk: boolean | null = null;
  let fetchStatus: number | null = null;
  let postCount: number | null = null;
  let errorName: string | null = null;

  if (hasUrl) {
    try {
      const base = process.env.WORDPRESS_URL!.replace(/\/+$/, "");
      const res = await fetch(`${base}/wp-json/wp/v2/posts?per_page=5`, {
        cache: "no-store",
      });
      fetchStatus = res.status;
      fetchOk = res.ok;
      if (res.ok) {
        const data = (await res.json()) as unknown[];
        postCount = Array.isArray(data) ? data.length : null;
      }
    } catch (error) {
      errorName = error instanceof Error ? error.name : "UnknownError";
    }
  }

  return NextResponse.json({
    hasUrl,
    hasUsername,
    hasPassword,
    fetchOk,
    fetchStatus,
    postCount,
    errorName,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV ?? null,
  });
}
