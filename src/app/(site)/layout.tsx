import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 mt-8">{children}</div>
      <Footer />
    </div>
  );
}
