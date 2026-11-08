import type { Metadata } from "next";
import ExpensoDoc from "@/components/expenso/ExpensoDoc";
import { getLegalDoc } from "@/lib/legal";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("expenso-privacy");

  return {
    title: { absolute: doc.title },
    description: doc.description,
    alternates: { canonical: "/expenso/privacy" },
    openGraph: { title: doc.title, description: doc.description, type: "website" },
  };
}

export default async function ExpensoPrivacyPage() {
  const doc = await getLegalDoc("expenso-privacy");
  return <ExpensoDoc doc={doc} />;
}
