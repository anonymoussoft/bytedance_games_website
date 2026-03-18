import Link from "next/link";

type Lang = "en" | "zh";

const copy: Record<
  Lang,
  {
    navFeatures: string;
    navScenarios: string;
    navDownload: string;
    navGames: string;
    heroTitle: string;
    heroSub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaSoon: string;
    pill1: string;
    pill2: string;
    pill3: string;
    whyTitle: string;
    f1t: string;
    f1d: string;
    f2t: string;
    f2d: string;
    f3t: string;
    f3d: string;
    f4t: string;
    f4d: string;
    sceneTitle: string;
    s1t: string;
    s1d: string;
    s2t: string;
    s2d: string;
    s3t: string;
    s3d: string;
    s4t: string;
    s4d: string;
    devicesTitle: string;
    devicesSub: string;
    win: string;
    mac: string;
    ios: string;
    android: string;
    linux: string;
    bottomTitle: string;
    bottomSub: string;
    footerTag: string;
    disclaimer: string;
  }
> = {
  en: {
    navFeatures: "Highlights",
    navScenarios: "Scenarios",
    navDownload: "Download",
    navGames: "ByteDance Games",
    heroTitle: "A new way to chat",
    heroSub:
      "Toxee puts crisp, real-time messaging in one beautiful client — tuned for speed, resilience, and conversations that don’t phone home to big tech.",
    ctaPrimary: "Get started",
    ctaSecondary: "Explore scenarios",
    ctaSoon: "Coming soon",
    pill1: "LAN & offline-friendly",
    pill2: "No account wall",
    pill3: "Built for privacy-first teams",
    whyTitle: "Why Toxee?",
    f1t: "All in one flow",
    f1d:
      "Messages, groups, and presence in a single streamlined experience — stay in sync without juggling a dozen apps.",
    f2t: "Mobile & desktop ready",
    f2d:
      "Use the same calm interface on the devices you already carry. Your chats stay coherent wherever you are.",
    f3t: "Serious about your data",
    f3d:
      "We treat your threads as yours — not as ad inventory. Enterprise-grade discipline without enterprise bloat.",
    f4t: "Always-on reliability",
    f4d:
      "Designed to keep talking even when the “normal” internet is noisy, filtered, or simply not there.",
    sceneTitle: "Built for real-world edges",
    s1t: "LAN & intranet chat",
    s1d:
      "Talk across the office, the studio, or the event floor over local networks — blazing fast, no WAN required.",
    s2t: "Works without the public internet",
    s2d:
      "When uplinks fail or you deliberately stay off-grid, Toxee keeps your circle connected on the paths that still work.",
    s3t: "Anonymous by design",
    s3d:
      "No real-name policy, no corporate identity graph — communicate with cryptographic handles that resist casual tracking.",
    s4t: "Untraceable conversations",
    s4d:
      "Engineered so there’s no central ledger of who said what to whom. Your metadata footprint stays as small as we can make it.",
    devicesTitle: "Join on any device",
    devicesSub:
      "Clients for the platforms you use every day. Downloads are opening in phases — stay tuned.",
    win: "Windows",
    mac: "macOS",
    ios: "iOS",
    android: "Android",
    linux: "Linux",
    bottomTitle: "Discover a calmer inbox",
    bottomSub:
      "Toxee is an open-source–friendly chat client focused on the experience — not on mining your social graph.",
    footerTag: "Toxee · chat.bytedance.games",
    disclaimer:
      "Marketing copy. Actual anonymity and offline behavior depend on your network, device, and how you use the product.",
  },
  zh: {
    navFeatures: "亮点",
    navScenarios: "场景",
    navDownload: "下载",
    navGames: "ByteDance Games",
    heroTitle: "聊天的新方式",
    heroSub:
      "Toxee 将即时、流畅的对话装进一个精致的客户端 —— 为速度、韧性和「不把对话卖给大厂」而调校。",
    ctaPrimary: "立即体验",
    ctaSecondary: "了解场景",
    ctaSoon: "即将开放",
    pill1: "局域网 / 弱网友好",
    pill2: "无强制账号体系",
    pill3: "隐私优先团队之选",
    whyTitle: "为什么选择 Toxee？",
    f1t: "一站式沟通",
    f1d: "消息、群组与状态统一在一套简洁体验里，不必在十几个应用间来回切换。",
    f2t: "全端就绪",
    f2d: "在手机与电脑上使用同一套克制界面，对话上下文自然延续。",
    f3t: "把数据当数据，不当商品",
    f3d: "以企业级严谨对待你的会话，却没有企业软件的臃肿与绑架感。",
    f4t: "时刻在线的韧性",
    f4d: "当公网拥堵、受限或根本不可用时，仍尽可能保持你与重要的人保持连接。",
    sceneTitle: "为真实世界的边缘场景而造",
    s1t: "局域网 / 内网畅聊",
    s1d: "办公室、片场、活动现场 —— 纯本地网络即可高速互通，无需依赖外网出口。",
    s2t: "不依赖公网也能聊",
    s2d: "上行中断或主动断网时，在仍可用的链路上延续对话，不被「有没有网」绑架。",
    s3t: "默认匿名身份",
    s3d: "无实名制社交图谱，以密码学身份标识沟通，极大增加被侧写与追踪的难度。",
    s4t: "无法轻易追踪的对话",
    s4d: "没有中心化「谁对谁说了什么」的总账本，元数据暴露面被压到我们能做的极限。",
    devicesTitle: "全平台加入",
    devicesSub: "覆盖你日常使用的系统。客户端下载将分阶段开放，敬请期待。",
    win: "Windows",
    mac: "macOS",
    ios: "iOS",
    android: "Android",
    linux: "Linux",
    bottomTitle: "发现更安静的收件箱",
    bottomSub: "Toxee 是面向体验的聊天客户端，开源友好 —— 专注对话本身，而非收割关系链。",
    footerTag: "Toxee · chat.bytedance.games",
    disclaimer:
      "以上为宣传文案。匿名性与离线能力因网络环境、设备与使用方式而异，请以实际表现为准。",
  },
};

function LangSwitch({ lang }: { lang: Lang }) {
  return (
    <div className="flex rounded-lg border border-black/8 bg-white p-0.5 text-sm shadow-sm">
      <Link
        href={`/chat?lang=en`}
        className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
          lang === "en" ? "bg-[#3370ff] text-white" : "text-[#646a73] hover:text-[#1f2329]"
        }`}
      >
        EN
      </Link>
      <Link
        href={`/chat?lang=zh`}
        className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
          lang === "zh" ? "bg-[#3370ff] text-white" : "text-[#646a73] hover:text-[#1f2329]"
        }`}
      >
        中文
      </Link>
    </div>
  );
}

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const sp = await searchParams;
  const lang: Lang = sp?.lang === "zh" ? "zh" : "en";
  const t = copy[lang];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-[60px] max-w-[1200px] items-center justify-between px-5 md:px-8">
          <span className="text-lg font-semibold tracking-tight text-[#1f2329]">Toxee</span>
          <nav className="hidden items-center gap-8 text-sm text-[#646a73] md:flex">
            <a href="#highlights" className="hover:text-[#3370ff]">
              {t.navFeatures}
            </a>
            <a href="#scenarios" className="hover:text-[#3370ff]">
              {t.navScenarios}
            </a>
            <a href="#download" className="hover:text-[#3370ff]">
              {t.navDownload}
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <LangSwitch lang={lang} />
            <Link
              href="https://bytedance.games/en"
              className="hidden text-sm font-medium text-[#3370ff] hover:underline sm:inline"
            >
              {t.navGames}
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#f0f4ff] to-white pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(51,112,255,0.15),transparent)]" />
        <div className="relative mx-auto max-w-[1200px] px-5 text-center md:px-8">
          <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#1f2329] md:text-5xl lg:text-[3.25rem]">
            {t.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#646a73] md:text-xl">
            {t.heroSub}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-[#646a73]">
            <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-black/5">
              {t.pill1}
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-black/5">
              {t.pill2}
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-black/5">
              {t.pill3}
            </span>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <span
              className="inline-flex h-12 cursor-not-allowed items-center justify-center rounded-lg bg-[#3370ff] px-8 text-base font-medium text-white opacity-60 shadow-lg shadow-blue-500/25"
              title={t.ctaSoon}
            >
              {t.ctaPrimary} · {t.ctaSoon}
            </span>
            <a
              href="#scenarios"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-black/10 bg-white px-8 text-base font-medium text-[#1f2329] hover:bg-[#f5f6f7]"
            >
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      <section id="highlights" className="border-t border-black/[0.06] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 className="text-center text-3xl font-semibold text-[#1f2329] md:text-4xl">
            {t.whyTitle}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: t.f1t, body: t.f1d },
              { title: t.f2t, body: t.f2d },
              { title: t.f3t, body: t.f3d },
              { title: t.f4t, body: t.f4d },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-black/[0.06] bg-[#fafbfc] p-6 transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-[#1f2329]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#646a73]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="scenarios" className="bg-[#f5f6f7] py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 className="text-center text-3xl font-semibold text-[#1f2329] md:text-4xl">
            {t.sceneTitle}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { title: t.s1t, body: t.s1d },
              { title: t.s2t, body: t.s2d },
              { title: t.s3t, body: t.s3d },
              { title: t.s4t, body: t.s4d },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-black/[0.06] bg-white p-8 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-[#3370ff]">{item.title}</h3>
                <p className="mt-4 leading-7 text-[#646a73]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="border-t border-black/[0.06] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 className="text-center text-3xl font-semibold text-[#1f2329] md:text-4xl">
            {t.devicesTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[#646a73]">{t.devicesSub}</p>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[t.win, t.mac, t.ios, t.android, t.linux].map((name) => (
              <div
                key={name}
                className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/15 bg-[#fafbfc] px-4 py-10"
              >
                <span className="font-medium text-[#1f2329]">Toxee for {name}</span>
                <span className="mt-4 inline-flex cursor-not-allowed rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-500">
                  {t.ctaSoon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#3370ff] to-[#2860e1] py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 text-center md:px-8">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">{t.bottomTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">{t.bottomSub}</p>
          <span className="mt-8 inline-flex cursor-not-allowed rounded-lg bg-white/30 px-8 py-3 text-base font-medium text-white backdrop-blur-sm">
            {t.ctaPrimary} · {t.ctaSoon}
          </span>
        </div>
      </section>

      <footer className="border-t border-black/[0.06] bg-[#f5f6f7] py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-5 text-center text-sm text-[#646a73] md:px-8">
          <p>{t.footerTag}</p>
          <p className="max-w-2xl text-xs leading-5 opacity-90">{t.disclaimer}</p>
          <p className="text-xs">
            Product inspired by open chat ecosystems ·{" "}
            <a
              href="https://github.com/anonymoussoft/toxee"
              className="text-[#3370ff] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
