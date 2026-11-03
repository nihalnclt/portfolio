import type { Metadata } from "next";
import TrippayDoc from "@/components/trippay/TrippayDoc";
import { getLegalDoc } from "@/lib/legal";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("trippay-support");

  return {
    title: { absolute: doc.title },
    description: doc.description,
    alternates: { canonical: "/trippay/support" },
    openGraph: { title: doc.title, description: doc.description, type: "website" },
  };
}

export default async function TrippaySupportPage() {
  const doc = await getLegalDoc("trippay-support");
  return <TrippayDoc doc={doc} />;
}
