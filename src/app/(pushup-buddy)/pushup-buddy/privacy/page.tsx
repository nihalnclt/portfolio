import type { Metadata } from "next";
import PushupDoc from "@/components/pushup-buddy/PushupDoc";
import { getLegalDoc } from "@/lib/legal";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("pushup-buddy-privacy");

  return {
    title: { absolute: doc.title },
    description: doc.description,
    alternates: { canonical: "/pushup-buddy/privacy" },
    openGraph: { title: doc.title, description: doc.description, type: "website" },
  };
}

export default async function PushupBuddyPrivacyPage() {
  const doc = await getLegalDoc("pushup-buddy-privacy");
  return <PushupDoc doc={doc} />;
}
