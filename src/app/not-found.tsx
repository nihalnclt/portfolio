import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-start gap-4 py-24">
      <p className="text-[12px] uppercase tracking-[0.16em] text-faint">404</p>
      <h1 className="text-2xl font-semibold text-heading">Page not found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link
        href="/"
        className="text-heading underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-faint"
      >
        Back home
      </Link>
    </div>
  );
}
