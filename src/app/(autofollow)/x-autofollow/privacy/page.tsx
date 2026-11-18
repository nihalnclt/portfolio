import type { Metadata } from "next";
import AutofollowDoc from "@/components/autofollow/AutofollowDoc";
import { getLegalDoc } from "@/lib/legal";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("autofollow-privacy");

  return {
    title: { absolute: doc.title },
    description: doc.description,
    alternates: { canonical: "/x-autofollow/privacy" },
    openGraph: { title: doc.title, description: doc.description, type: "website" },
  };
}

export default async function AutofollowPrivacyPage() {
  const doc = await getLegalDoc("autofollow-privacy");
  return <AutofollowDoc doc={doc} />;
}
