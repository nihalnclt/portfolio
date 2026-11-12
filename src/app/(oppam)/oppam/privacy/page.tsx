import type { Metadata } from "next";
import OppamDoc from "@/components/oppam/OppamDoc";
import { getLegalDoc } from "@/lib/legal";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("oppam-privacy");

  return {
    title: { absolute: doc.title },
    description: doc.description,
    alternates: { canonical: "/oppam/privacy" },
    openGraph: { title: doc.title, description: doc.description, type: "website" },
  };
}

export default async function OppamPrivacyPage() {
  const doc = await getLegalDoc("oppam-privacy");
  return <OppamDoc doc={doc} />;
}
