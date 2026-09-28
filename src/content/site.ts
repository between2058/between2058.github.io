export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const links = {
  email: "between2058@gmail.com",
  linkedin: "https://www.linkedin.com/in/johnny-chang-629524186/",
  github: "https://github.com/between2058",
  instagram: "https://www.instagram.com/between2058/",
  fateflux: "https://fateflux.ai",
  guitarDemo: "https://www.youtube.com/watch?v=hYTNauzK3q8",
  guitarTalk: "https://youtu.be/kwQ3WmHKLTg",
  ysed: "http://award.ysed.org.tw/current_detail/293",
  yzuMaker: "https://sites.google.com/g.yzu.edu.tw/2021maker/index?authuser=0",
};

type Field = { name: string; note: string };
type Step = { term: string; han: string; body: string; proof: string };
type Project = {
  id: string;
  title: string;
  han: string;
  period: string;
  summary: string;
  detail: string;
  tags: string[];
  links: { label: string; href: string }[];
};
type Mark = { period: string; title: string; place: string; note?: string };
type Honor = { title: string; note: string; href?: string };

export type Dictionary = {
  meta: { title: string; description: string };
  nav: { work: string; method: string; projects: string; trace: string; writing: string; contact: string };
  langSwitch: { label: string; target: Locale; short: string };
  hero: {
    thesis: string;
    roles: string[];
    contact: string;
    fateflux: string;
  };
  work: { title: string; lead: string; why: string; employer: string; fields: Field[]; discretion: string };
  method: { title: string; lead: string; steps: Step[] };
  projects: { title: string; items: Project[] };
  trace: {
    title: string;
    lead: string;
    scaleLabel: string;
    marks: Mark[];
    honorsTitle: string;
    honors: Honor[];
  };
  writing: {
    title: string;
    lead: string;
    all: string;
    back: string;
    langNote: string;
    medium: string;
    empty: string;
  };
  contact: { title: string; titleLines: string[]; body: string; email: string; copy: string; copied: string };
  footer: { line: string; source: string };
  notFound: { title: string; body: string; home: string };
};

const zh: Dictionary = {
  meta: {
    title: "張舜程 Johnny Chang",
    description:
      "張舜程，ML Engineer，在和碩把 AI 帶進產品的設計與驗證；FateFlux.ai 創辦人。拆解複雜系統，再把它重新組合成真正能用的東西。",
  },
  nav: { work: "工作", method: "方法", projects: "作品", trace: "軌跡", writing: "文章", contact: "聯絡" },
  langSwitch: { label: "Switch to English", target: "en", short: "EN" },
  hero: {
    thesis: "拆解複雜系統，再把它重新組合成​真正能用的東西。",
    roles: ["在和碩擔任 ML Engineer，把 AI 帶進產品的設計與驗證", "FateFlux.ai 創辦人"],
    contact: "與我聯絡",
    fateflux: "看看 FateFlux",
  },
  work: {
    title: "現在在做的事",
    lead: "一個產品在量產之前，要經過一輪又一輪的設計、模擬、修改。有人畫 CAD，有人跑模擬，大家等結果；這個迴圈轉得多快，決定了一個設計能被打磨到多好。",
    why: "我在和碩做的，是讓 AI 走進這個迴圈。當機器看得懂形狀、讀得懂也畫得出圖面、能很快估出模擬的結果，工程師就能在同樣的時間裡多試好幾輪，把錯誤留在虛擬世界，而不是產線上。",
    employer: "和碩聯合科技 Pegatron · ML Engineer · 現職",
    fields: [
      { name: "3D", note: "讓模型理解與生成形狀，機器才看得懂它要處理的東西。" },
      { name: "CAD", note: "讓 AI 讀懂工程圖面，也畫得出能繼續編輯的 CAD。" },
      { name: "模擬", note: "用學習模型逼近物理模擬，把等結果的時間縮短。" },
      { name: "數位孿生", note: "把這些接成一個平台，讓設計先在虛擬世界裡被驗證。" },
    ],
    discretion: "具體的專案屬於公司，這裡只談為什麼要做。",
  },
  method: {
    title: "方法",
    lead: "不管題目是工程、吉他還是命盤，我處理問題的順序都一樣。",
    steps: [
      {
        term: "觀測",
        han: "觀",
        body: "先看清楚系統實際上怎麼運作，而不是它被描述成怎樣。",
        proof: "吉他和弦神偷：從彈奏影片裡看出手指與琴格的關係。",
      },
      {
        term: "拆解",
        han: "破",
        body: "把舊框架拆成可以一個一個驗證的部件。",
        proof: "FateFlux：把紫微、八字、人類圖、易經、塔羅、占星拆成可計算的引擎。",
      },
      {
        term: "重組",
        han: "合",
        body: "重新組合成一個真的有人用得上的東西，然後交出去。",
        proof: "FateFlux 以 MCP 連接器的形式，直接在 ChatGPT 與 Claude 裡運作。",
      },
    ],
  },
  projects: {
    title: "作品",
    items: [
      {
        id: "fateflux",
        title: "FateFlux",
        han: "流",
        period: "現在",
        summary: "萬物都在變。FateFlux 讓 AI 讀懂命盤、關係與時間的流動，在無常中看見仍可選擇的方向。",
        detail:
          "一個自我探索與成長的 MCP app，可以直接在 ChatGPT 或 Claude 裡使用。整合紫微斗數、八字、人類圖、易經、文王卦、塔羅與西洋占星，每一套系統都由獨立的計算引擎推演，再交給 AI 解讀。",
        tags: ["Next.js", "MCP", "Supabase", "Claude", "Vercel"],
        links: [
          { label: "fateflux.ai", href: links.fateflux },
          { label: "Instagram", href: "https://www.instagram.com/fateflux.ai" },
        ],
      },
      {
        id: "chord",
        title: "當吉他遇見 AI：吉他和弦神偷",
        han: "弦",
        period: "大學時期",
        summary: "用深度學習與電腦視覺，從彈奏影片中辨識吉他和弦。高中吉他社時的夢想，大學時把它做出來。",
        detail: "第 19 屆育秀盃創意獎軟體實作組銀獎（全國 228 組中第二名），另獲元智大學學生創客競賽與電通學院專題實作競賽特優。",
        tags: ["Deep Learning", "Computer Vision", "Python"],
        links: [
          { label: "Demo 影片", href: links.guitarDemo },
          { label: "介紹影片", href: links.guitarTalk },
        ],
      },
      {
        id: "tables",
        title: "把紙本表格變成資料",
        han: "表",
        period: "2020",
        summary: "945 頁掃描的交易紀錄與 3000 頁 PDF，用 OpenCV 霍夫轉換切格子、Tesseract 辨識，再整理成 pandas DataFrame。",
        detail: "兩篇實作筆記，記錄第一次用程式處理真實世界髒資料的過程。",
        tags: ["OpenCV", "Tesseract", "pandas"],
        links: [
          { label: "切豆腐篇", href: "/zh/writing/table-extraction" },
          { label: "證交所資料前處理篇", href: "/zh/writing/twse-pdf" },
        ],
      },
    ],
  },
  trace: {
    title: "軌跡",
    lead: "以年為刻度。現在在最右端，還沒結束的線段以虛線延伸。",
    scaleLabel: "2018 年到現在的軌跡刻度",
    marks: [
      { period: "現在", title: "ML Engineer", place: "和碩聯合科技 Pegatron", note: "把 AI 帶進工程設計、模擬與數位孿生。" },
      { period: "2022 —", title: "碩士", place: "國立臺灣大學 電信工程學研究所", note: "iDSSP Lab，生物科技組。電信所首屆書審面試，正取第 4 名。" },
      { period: "2018 — 2022", title: "學士", place: "元智大學 電機工程學系", note: "CVIT Lab，研究以深度學習與電腦視覺辨識吉他和弦。" },
    ],
    honorsTitle: "紀錄",
    honors: [
      { title: "第 19 屆育秀盃創意獎 銀獎", note: "軟體實作組，全國 228 組中第二名", href: links.ysed },
      { title: "元智大學學生創客競賽 特優", note: "《吉他和弦神偷》", href: links.yzuMaker },
      { title: "元智大學電通學院專題實作競賽 特優", note: "《和弦神偷》" },
      { title: "TQC+ Python 3 程式能力認證", note: "9 題全對" },
      { title: "臺灣電磁產學聯盟 電磁能力認證", note: "修完電磁學與電磁波後考取" },
    ],
  },
  writing: {
    title: "文章",
    lead: "寫下來的東西。舊文章保留原樣，新的會陸續補上。",
    all: "所有文章",
    back: "回到文章列表",
    langNote: "",
    medium: "Medium 版本",
    empty: "還沒有文章。",
  },
  contact: {
    title: "如果你也在拆解什麼，來聊聊。",
    titleLines: ["如果你也在拆解什麼，", "來聊聊。"],
    body: "合作、工作機會、FateFlux，或者只是想打聲招呼，我會盡量回覆。",
    email: "寄信給我",
    copy: "複製 Email",
    copied: "已複製",
  },
  footer: { line: "張舜程 · between2058", source: "原始碼" },
  notFound: { title: "這裡什麼都沒有觀測到。", body: "你要找的頁面不存在，或已經移動。", home: "回到首頁" },
};

const en: Dictionary = {
  meta: {
    title: "Johnny Chang 張舜程",
    description:
      "Johnny Chang, ML Engineer at Pegatron bringing AI into how products are designed and validated. Founder of FateFlux.ai. I take complex systems apart and put them back together as things that work.",
  },
  nav: { work: "Work", method: "Method", projects: "Projects", trace: "Trace", writing: "Writing", contact: "Contact" },
  langSwitch: { label: "切換到中文", target: "zh", short: "中" },
  hero: {
    thesis: "I take complex systems apart and put them back together as things that work.",
    roles: ["ML Engineer at Pegatron, bringing AI into how products are designed and validated", "Founder of FateFlux.ai"],
    contact: "Get in touch",
    fateflux: "See FateFlux",
  },
  work: {
    title: "What I work on",
    lead: "Before a product ships, it goes through round after round of design, simulate, revise. Someone draws the CAD, someone runs the simulation, everyone waits for results. How fast that loop turns decides how good a design can get.",
    why: "At Pegatron I bring AI into that loop. When machines can understand shapes, read and draw engineering models, and estimate simulation results quickly, engineers get more rounds in the same time, and mistakes stay in the virtual world instead of on the production line.",
    employer: "Pegatron · ML Engineer · Present",
    fields: [
      { name: "3D", note: "Models that understand and generate shape, so the machine can see what it is working on." },
      { name: "CAD", note: "AI that reads engineering drawings and produces CAD you can keep editing." },
      { name: "Simulation", note: "Learned models that approximate physics simulation, so waiting for results takes less time." },
      { name: "Digital twin", note: "Connecting it all into one platform, so a design is proven in the virtual world first." },
    ],
    discretion: "The specific projects belong to the company; this page is about why the work matters.",
  },
  method: {
    title: "Method",
    lead: "Whether the problem is engineering, a guitar, or a birth chart, I work through it in the same order.",
    steps: [
      {
        term: "Observe",
        han: "觀",
        body: "See how the system actually behaves, not how it is described.",
        proof: "Chord Thief: reading the relation between fingers and frets from performance video.",
      },
      {
        term: "Deconstruct",
        han: "破",
        body: "Break the old framework into parts that can each be checked.",
        proof: "FateFlux: Zi Wei, BaZi, Human Design, I Ching, Tarot and astrology split into computable engines.",
      },
      {
        term: "Recompose",
        han: "合",
        body: "Put it back together as something people can actually use, and ship it.",
        proof: "FateFlux runs as an MCP connector inside ChatGPT and Claude.",
      },
    ],
  },
  projects: {
    title: "Projects",
    items: [
      {
        id: "fateflux",
        title: "FateFlux",
        han: "流",
        period: "Now",
        summary: "Everything changes. FateFlux lets AI read the flow of charts, relationships and time, so you can see which directions are still yours to choose.",
        detail:
          "An MCP app for self-discovery and personal growth that works inside ChatGPT and Claude. It brings together Zi Wei Dou Shu, BaZi, Human Design, I Ching, Wen Wang Gua, Tarot and astrology, each computed by its own engine before the AI interprets it.",
        tags: ["Next.js", "MCP", "Supabase", "Claude", "Vercel"],
        links: [
          { label: "fateflux.ai", href: links.fateflux },
          { label: "Instagram", href: "https://www.instagram.com/fateflux.ai" },
        ],
      },
      {
        id: "chord",
        title: "When Guitar Meets AI: Chord Thief",
        han: "弦",
        period: "Undergraduate",
        summary: "Recognizing guitar chords from performance video with deep learning and computer vision. A dream from my high-school guitar club, built at university.",
        detail: "Silver award, 19th YSED Creativity Award, software track (2nd of 228 teams nationwide); top prizes at Yuan Ze University's maker and EECS project competitions.",
        tags: ["Deep Learning", "Computer Vision", "Python"],
        links: [
          { label: "Demo video", href: links.guitarDemo },
          { label: "Project talk", href: links.guitarTalk },
        ],
      },
      {
        id: "tables",
        title: "Turning paper tables into data",
        han: "表",
        period: "2020",
        summary: "945 pages of scanned statements and 3,000 pages of PDFs, cut into cells with OpenCV's Hough transform, read with Tesseract, and rebuilt as pandas DataFrames.",
        detail: "Two hands-on notes (in Chinese) from my first time processing messy real-world data with code.",
        tags: ["OpenCV", "Tesseract", "pandas"],
        links: [
          { label: "Cutting the grid", href: "/en/writing/table-extraction" },
          { label: "TWSE PDF preprocessing", href: "/en/writing/twse-pdf" },
        ],
      },
    ],
  },
  trace: {
    title: "Trace",
    lead: "Measured in years. Now sits at the right end; lines that haven't closed trail off dotted.",
    scaleLabel: "Trace scale from 2018 to now",
    marks: [
      { period: "Now", title: "ML Engineer", place: "Pegatron", note: "Bringing AI into engineering design, simulation and digital twins." },
      { period: "2022 —", title: "M.S.", place: "Graduate Institute of Communication Engineering, National Taiwan University", note: "iDSSP Lab, biotech group. Admitted 4th in the institute's first review-and-interview intake." },
      { period: "2018 — 2022", title: "B.S.", place: "Electrical Engineering, Yuan Ze University", note: "CVIT Lab: guitar chord recognition with deep learning and computer vision." },
    ],
    honorsTitle: "Record",
    honors: [
      { title: "Silver, 19th YSED Creativity Award", note: "Software track, 2nd of 228 teams nationwide", href: links.ysed },
      { title: "Top prize, YZU Student Maker Competition", note: "Chord Thief", href: links.yzuMaker },
      { title: "Top prize, YZU College of EECS Project Competition", note: "Chord Thief" },
      { title: "TQC+ Python 3 certification", note: "9 of 9 correct" },
      { title: "Taiwan Electromagnetics Alliance certification", note: "After Electromagnetics and EM Waves" },
    ],
  },
  writing: {
    title: "Writing",
    lead: "Things I've written down. The early posts stay as they were; new ones will follow.",
    all: "All writing",
    back: "Back to writing",
    langNote: "This post is written in Traditional Chinese.",
    medium: "On Medium",
    empty: "Nothing here yet.",
  },
  contact: {
    title: "If you're taking something apart too, let's talk.",
    titleLines: ["If you're taking something", "apart too, let's talk."],
    body: "Collaboration, roles, FateFlux, or just saying hi. I'll do my best to reply.",
    email: "Email me",
    copy: "Copy email",
    copied: "Copied",
  },
  footer: { line: "Johnny Chang · between2058", source: "Source" },
  notFound: { title: "Nothing observed here.", body: "The page you're looking for doesn't exist or has moved.", home: "Back home" },
};

export const dictionaries: Record<Locale, Dictionary> = { zh, en };
