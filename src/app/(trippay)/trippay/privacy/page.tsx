import type { Metadata } from "next";
import TrippayDoc from "@/components/trippay/TrippayDoc";
import { getLegalDoc } from "@/lib/legal";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("trippay-privacy");

  return {
    title: { absolute: doc.title },
    description: doc.description,
    alternates: { canonical: "/trippay/privacy" },
    openGraph: { title: doc.title, description: doc.description, type: "website" },
  };
}

export default async function TrippayPrivacyPage() {
  const doc = await getLegalDoc("trippay-privacy");
  return <TrippayDoc doc={doc} />;
}
