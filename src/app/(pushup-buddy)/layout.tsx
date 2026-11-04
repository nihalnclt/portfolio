import PushupFooter from "@/components/pushup-buddy/PushupFooter";
import PushupHeader from "@/components/pushup-buddy/PushupHeader";

// Pushup Buddy has its own look instead of the portfolio shell.
export default function PushupBuddyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="pushup flex min-h-screen flex-col antialiased">
      <PushupHeader />
      <main className="flex-1">{children}</main>
      <PushupFooter />
    </div>
  );
}
