import "@/app/chat/chat-globals.css";

export const metadata = {
  title: "Toxee — Private chat, your way",
  description:
    "Toxee is a next-generation chat experience: LAN-first, works without the public internet, and built for conversations that stay yours.",
  metadataBase: new URL("https://chat.bytedance.games"),
  openGraph: {
    title: "Toxee — Private chat, your way",
    description:
      "Real-time messaging for teams and individuals who need speed, privacy, and freedom from the cloud.",
    url: "https://chat.bytedance.games",
    siteName: "Toxee",
    type: "website",
  },
};

export default function ChatRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="chat-landing min-h-screen bg-white text-[#1f2329]">{children}</div>
  );
}
