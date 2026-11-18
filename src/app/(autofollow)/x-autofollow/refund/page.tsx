import type { Metadata } from "next";
import AutofollowDoc from "@/components/autofollow/AutofollowDoc";
import { getLegalDoc } from "@/lib/legal";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDoc("autofollow-refund");

  return {
    title: { absolute: doc.title },
    description: doc.description,
    alternates: { canonical: "/x-autofollow/refund" },
    openGraph: { title: doc.title, description: doc.description, type: "website" },
  };
}

export default async function AutofollowRefundPage() {
  const doc = await getLegalDoc("autofollow-refund");
  return <AutofollowDoc doc={doc} />;
}
