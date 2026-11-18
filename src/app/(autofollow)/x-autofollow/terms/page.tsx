import type { Metadata } from "next";
import AutofollowDoc from "@/components/autofollow/AutofollowDoc";
import { getLegalDoc } from "@/lib/legal";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("autofollow-terms");

  return {
    title: { absolute: doc.title },
    description: doc.description,
    alternates: { canonical: "/x-autofollow/terms" },
    openGraph: { title: doc.title, description: doc.description, type: "website" },
  };
}

export default async function AutofollowTermsPage() {
  const doc = await getLegalDoc("autofollow-terms");
  return <AutofollowDoc doc={doc} />;
}
