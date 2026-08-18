export default function NewsLetter() {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <h4 className="font-medium text-heading">Newsletter</h4>
      <p className="mt-1 text-sm">Be notified of new posts. No spam, unsubscribe anytime.</p>
      {/* Static stub - not wired to a provider yet */}
      <div className="mt-4 flex gap-2">
        <input
          type="email"
          placeholder="you@example.com"
          aria-label="Email address"
          className="flex-1 rounded-lg border border-line bg-base px-3 py-2 text-sm placeholder:text-faint/70 focus:border-line-strong focus:outline-none"
        />
        <button
          type="button"
          className="rounded-lg border border-line bg-base px-4 py-2 text-sm text-heading transition-colors hover:border-line-strong"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
