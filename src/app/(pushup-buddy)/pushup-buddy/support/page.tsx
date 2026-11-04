import type { Metadata } from "next";
import PushupDoc from "@/components/pushup-buddy/PushupDoc";
import { getLegalDoc } from "@/lib/legal";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("pushup-buddy-support");

  return {
    title: { absolute: doc.title },
    description: doc.description,
    alternates: { canonical: "/pushup-buddy/support" },
    openGraph: { title: doc.title, description: doc.description, type: "website" },
  };
}

export default async function PushupBuddySupportPage() {
  const doc = await getLegalDoc("pushup-buddy-support");
  return <PushupDoc doc={doc} />;
}
