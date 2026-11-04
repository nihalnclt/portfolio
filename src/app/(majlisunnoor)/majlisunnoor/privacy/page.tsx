import type { Metadata } from "next";
import MajlisDoc from "@/components/majlisunnoor/MajlisDoc";
import { getLegalDoc } from "@/lib/legal";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("majlisunnoor-privacy");

  return {
    title: { absolute: doc.title },
    description: doc.description,
    alternates: { canonical: "/majlisunnoor/privacy" },
    openGraph: { title: doc.title, description: doc.description, type: "website" },
  };
}

export default async function MajlisunnoorPrivacyPage() {
  const doc = await getLegalDoc("majlisunnoor-privacy");
  return <MajlisDoc doc={doc} />;
}
