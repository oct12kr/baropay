import type { NextConfig } from "next";

/** Resolves the WordPress media hostname from WORDPRESS_URL so next/image can
 * optimize featured images (WebP/AVIF, responsive sizes) without hardcoding
 * a domain. Falls back to no remote patterns if the env var is unset. */
function wordpressImagePatterns(): NonNullable<NextConfig["images"]>["remotePatterns"] {
  if (!process.env.WORDPRESS_URL) return [];
  try {
    const { hostname } = new URL(process.env.WORDPRESS_URL);
    return [{ protocol: "https", hostname, pathname: "/**" }];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: wordpressImagePatterns(),
  },
};

export default nextConfig;
