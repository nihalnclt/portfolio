import type { Metadata } from "next";
import OppamDoc from "@/components/oppam/OppamDoc";
import { getLegalDoc } from "@/lib/legal";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("oppam-terms");

  return {
    title: { absolute: doc.title },
    description: doc.description,
    alternates: { canonical: "/oppam/terms" },
    openGraph: { title: doc.title, description: doc.description, type: "website" },
  };
}

export default async function OppamTermsPage() {
  const doc = await getLegalDoc("oppam-terms");
  return <OppamDoc doc={doc} />;
}
