import { readFile } from "node:fs/promises";
import path from "node:path";

export type Post = {
  slug: string;
  title: string;
  titleEn: string;
  date: string;
  summary: string;
  summaryEn: string;
  medium?: string;
  /** Path the post lived at on the old Hugo site, kept as a redirect. */
  legacyPath: string;
};

export const posts: Post[] = [
  {
    slug: "twse-pdf",
    title: "pandas 分析 PDF 文本：證交所股票交易紀錄（資料前處理篇）",
    titleEn: "Analyzing TWSE trade records from PDF with pandas: preprocessing",
    date: "2020-02-27",
    summary: "將近 600 人、約 3000 頁的臺灣證交所交易紀錄表，整理成 pandas DataFrame，方便後續分析。",
    summaryEn: "Around 3,000 pages of Taiwan Stock Exchange trade records for nearly 600 people, rebuilt as a pandas DataFrame for analysis.",
    medium: "https://medium.com/p/4bb45fa29aa2",
    legacyPath: "/blogs/pandas分析pdf文本證交所股票交易紀錄資料前處理篇",
  },
  {
    slug: "table-extraction",
    title: "使用 Python 萃取掃描文件中的表格（一）切豆腐篇",
    titleEn: "Extracting tables from scanned documents with Python, part 1: cutting the grid",
    date: "2020-02-21",
    summary: "945 頁的掃描交易紀錄，用 OpenCV 霍夫轉換找出表格線、切成一格一格，再交給 Tesseract 辨識。",
    summaryEn: "945 scanned pages: finding table lines with OpenCV's Hough transform, cutting cells, and reading them with Tesseract.",
    medium: "https://medium.com/p/d5b65b7ec320",
    legacyPath: "/blogs/使用python萃取掃描文件中的表格一切豆腐篇",
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export async function getPostHtml(slug: string) {
  const file = path.join(process.cwd(), "src/content/posts", `${slug}.html`);
  return readFile(file, "utf8");
}
