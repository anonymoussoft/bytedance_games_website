import type { AppLocale } from "@/content/locales";

export type Messages = {
  siteName: string;
  nav: {
    games: string;
    chat: string;
    news: string;
    insights: string;
    about: string;
    faq: string;
    contact: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    disclaimerTitle: string;
    disclaimerBody: string;
    featuredGames: string;
    latestUpdates: string;
  };
  games: {
    title: string;
    subtitle: string;
    officialLinks: string;
    platforms: string;
    sourceNote: string;
  };
  footer: {
    legal: string;
    privacy: string;
  };
};

const EN: Messages = {
  siteName: "ByteDance Games",
  nav: {
    games: "Games",
    chat: "Chat",
    news: "News",
    insights: "Insights",
    about: "About",
    faq: "FAQ",
    contact: "Contact",
  },
  home: {
    heroTitle: "ByteDance Games",
    heroSubtitle:
      "A brand entry site for game products, updates, and verifiable references. This MVP focuses on discoverability and accuracy, not transactions or community features.",
    disclaimerTitle: "Scope & attribution",
    disclaimerBody:
      "Some game entries may be listed based on publicly verifiable sources (e.g., official websites or official store pages). We avoid making ownership or operational claims beyond what sources support.",
    featuredGames: "Featured games",
    latestUpdates: "Latest updates",
  },
  games: {
    title: "Games",
    subtitle:
      "A curated, source-backed list of game entries. Each card links to an official site or an official platform page when available.",
    officialLinks: "Official links",
    platforms: "Platforms",
    sourceNote: "Source-backed entry",
  },
  footer: {
    legal: "Legal",
    privacy: "Privacy",
  },
};

const ZH_HANS: Messages = {
  siteName: "ByteDance Games",
  nav: {
    games: "游戏",
    chat: "聊天",
    news: "动态",
    insights: "洞察",
    about: "关于",
    faq: "FAQ",
    contact: "联系",
  },
  home: {
    heroTitle: "ByteDance Games",
    heroSubtitle:
      "面向品牌展示与搜索可发现性的游戏官网入口站。当前阶段不承载交易、下载闭环、登录或社区等复杂功能。",
    disclaimerTitle: "范围与归因声明",
    disclaimerBody:
      "部分游戏条目依据公开可验证来源（如官方站点、官方商店页）呈现。我们不会在缺乏来源支撑的情况下做出所有权或运营归属宣称。",
    featuredGames: "精选游戏",
    latestUpdates: "最新更新",
  },
  games: {
    title: "游戏",
    subtitle:
      "基于来源可追溯的游戏条目列表。每个条目都会尽量指向官方站点或官方平台页面。",
    officialLinks: "官方链接",
    platforms: "平台",
    sourceNote: "来源可追溯条目",
  },
  footer: {
    legal: "法律声明",
    privacy: "隐私政策",
  },
};

// Lightweight initial JP/KR to keep MVP bilingual quality high.
// These can be expanded later via governance workflow.
const JA: Messages = {
  ...EN,
  nav: { ...EN.nav, games: "ゲーム", news: "ニュース", about: "概要", contact: "連絡先" },
};
const KO: Messages = {
  ...EN,
  nav: { ...EN.nav, games: "게임", news: "뉴스", about: "소개", contact: "문의" },
};

export function getMessages(locale: AppLocale): Messages {
  switch (locale) {
    case "zh-hans":
      return ZH_HANS;
    case "ja":
      return JA;
    case "ko":
      return KO;
    case "en":
    default:
      return EN;
  }
}

