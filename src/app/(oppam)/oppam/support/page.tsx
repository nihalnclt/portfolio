import type { Metadata } from "next";
import OppamDoc from "@/components/oppam/OppamDoc";
import { getLegalDoc } from "@/lib/legal";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("oppam-support");

  return {
    title: { absolute: doc.title },
    description: doc.description,
    alternates: { canonical: "/oppam/support" },
    openGraph: { title: doc.title, description: doc.description, type: "website" },
  };
}

export default async function OppamSupportPage() {
  const doc = await getLegalDoc("oppam-support");
  return <OppamDoc doc={doc} />;
}
