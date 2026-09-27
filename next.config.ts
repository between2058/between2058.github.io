import type { NextConfig } from "next";
import { posts } from "./src/content/posts";

// Visitors whose browser prefers English and not Chinese land on /en; everyone else on /zh.
const prefersEnglish = "^(?![\\s\\S]*zh)[\\s\\S]*en[\\s\\S]*$";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/[lang]/writing/[slug]": ["./src/content/posts/*.html"],
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "header", key: "accept-language", value: prefersEnglish }],
        destination: "/en",
        permanent: false,
      },
      { source: "/", destination: "/zh", permanent: false },
      // Old Hugo site paths.
      { source: "/blogs", destination: "/zh/writing", permanent: true },
      { source: "/blogs/page/:n", destination: "/zh/writing", permanent: true },
      ...posts.flatMap((p) => {
        const encoded = encodeURI(p.legacyPath);
        return [encoded, `${encoded}/`].map((source) => ({
          source,
          destination: `/zh/writing/${p.slug}`,
          permanent: true,
        }));
      }),
      { source: "/index.xml", destination: "/zh/writing", permanent: true },
    ];
  },
};

export default nextConfig;
