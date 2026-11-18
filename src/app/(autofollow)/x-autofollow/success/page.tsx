// Creem sends buyers here after a completed payment.
export const dynamic = "force-static";
export const metadata = { title: { absolute: "Auto Follow Pro: payment complete" }, robots: { index: false } };

export default function AutofollowSuccess() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-16 text-center md:pt-24">
      <h1 className="text-[34px] font-extrabold tracking-tight text-white md:text-[44px]">Payment complete</h1>
      <p className="mt-4 text-[18px] leading-relaxed text-[#8b98a5]">
        Thank you. Open the Auto Follow extension, go to the Pro tab and press &quot;I have already paid, check
        again&quot;. Your daily limit rises as soon as the payment is confirmed.
      </p>
      <p className="mt-6 text-[15px] text-[#71767b]">
        Something not right? Email{" "}
        <a href="mailto:nihalnclt@gmail.com" className="text-[#1d9bf0] hover:underline">
          nihalnclt@gmail.com
        </a>
        .
      </p>
    </div>
  );
}
