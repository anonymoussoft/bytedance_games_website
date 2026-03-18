import type { AppLocale } from "@/content/locales";

export type Article = {
  slug: string;
  kind: "news" | "insights";
  date: string; // ISO yyyy-mm-dd
  title: Record<AppLocale, string>;
  summary: Record<AppLocale, string>;
  body: Record<AppLocale, string>;
  sources: Array<{ label: string; url: string }>;
};

export const ARTICLES: Article[] = [
  {
    slug: "mvp-launch",
    kind: "news",
    date: "2026-03-18",
    title: {
      en: "bytedance.games MVP launched",
      "zh-hans": "bytedance.games MVP 上线",
      ja: "bytedance.games MVP 公開",
      ko: "bytedance.games MVP 공개",
    },
    summary: {
      en: "Initial launch focused on IA + SEO foundations + source-backed game entries.",
      "zh-hans": "首期聚焦信息架构、SEO 基建与来源可追溯的游戏条目。",
      ja: "情報設計・SEO 基盤・出典付きゲームエントリーに集中した初期公開。",
      ko: "정보 구조, SEO 기반, 출처 기반 게임 항목 중심의 초기 공개.",
    },
    body: {
      en: "This is an MVP release of bytedance.games. The site intentionally avoids complex product functions and focuses on building a trustworthy, maintainable information architecture with verifiable sources.\n\nCurrent scope includes multi-language routing, games listing + game detail pages, and baseline legal/privacy pages.\n\nNext steps will expand content governance, add recurring updates, and replace seed sources with first-party references when available.",
      "zh-hans":
        "这是 bytedance.games 的 MVP 版本上线。站点当前阶段刻意不承载复杂产品能力，而是优先建立真实可信、可持续维护的信息架构与内容机制，并为搜索收录与可发现性打好基础。\n\n当前包含：多语言路由、Games 列表与详情页、以及基础 Legal/Privacy 页面。\n\n下一步将完善内容治理、建立更新节奏，并在可获得一手资料时逐步替换种子来源。",
      ja: "This is an MVP release of bytedance.games.\n\n(Translation to be expanded via governance workflow.)",
      ko: "This is an MVP release of bytedance.games.\n\n(Translation to be expanded via governance workflow.)",
    },
    sources: [{ label: "Nuverse official site", url: "https://www.nvsgames.com/" }],
  },
  {
    slug: "content-governance-principles",
    kind: "insights",
    date: "2026-03-18",
    title: {
      en: "Content governance principles for a brand entry site",
      "zh-hans": "品牌入口站的内容治理原则",
      ja: "ブランド入口サイトのコンテンツガバナンス",
      ko: "브랜드 엔트리 사이트 콘텐츠 거버넌스",
    },
    summary: {
      en: "How to scale pages without falling into thin content or SEO spam.",
      "zh-hans": "如何规模化扩页但不陷入薄内容与 SEO 垃圾页风险。",
      ja: "薄いコンテンツやスパムを避けつつ拡張する方法。",
      ko: "thin content/스팸을 피하면서 확장하는 방법.",
    },
    body: {
      en: "When building a brand entry site, scale should come from structured facts and governance—not from mass-generated keyword pages.\n\nKey rules:\n- Every indexable page must add unique, verifiable information.\n- Each game entry should include official outbound links and a last-updated timestamp.\n- Parameterized pages (filters, internal search) should be noindex unless they provide meaningful unique content.\n\nThis site stores source snapshots for seed content to keep attribution auditable and maintainable.",
      "zh-hans":
        "建设品牌入口站时，规模来自“结构化事实 + 治理机制”，而不是批量生成关键词页面。\n\n关键规则：\n- 每个可收录页面必须有独有信息增量，并且可验证。\n- 每条游戏信息应包含官方外链与最后更新时间。\n- 参数化页面（筛选、站内搜索）除非能提供足够独立内容，否则应 noindex。\n\n本站对种子内容保留来源快照，用于可审计的归因与后续替换维护。",
      ja: "Key governance rules for scaling content without spam.\n\n(Translation to be expanded via governance workflow.)",
      ko: "Key governance rules for scaling content without spam.\n\n(Translation to be expanded via governance workflow.)",
    },
    sources: [],
  },
];

export function getArticles(kind: Article["kind"]) {
  return ARTICLES.filter((a) => a.kind === kind).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(kind: Article["kind"], slug: string) {
  return ARTICLES.find((a) => a.kind === kind && a.slug === slug) ?? null;
}

export function localize<T extends { [k in AppLocale]: string }>(obj: T, locale: AppLocale) {
  return obj[locale] || obj.en;
}

