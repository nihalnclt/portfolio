// Paddle "default payment link" page. Paddle sends buyers here with ?_ptxn=<transaction id>
// and Paddle.js opens the checkout for that transaction automatically.
// The client-side token is public by design; the API key is never used here.
import Script from "next/script";

export const dynamic = "force-dynamic";
export const metadata = { title: "Auto Follow Pro checkout", robots: { index: false } };

export default function AutoFollowCheckout() {
  const token = process.env.PADDLE_CLIENT_TOKEN || "";
  const sandbox = process.env.PADDLE_ENV !== "production";
  // Waits for paddle.js, since the two script tags can load in either order.
  const init = `
    (function start() {
      if (!window.Paddle) return setTimeout(start, 50);
      ${sandbox ? 'Paddle.Environment.set("sandbox");' : ""}
      Paddle.Initialize({
        token: ${JSON.stringify(token)},
        eventCallback: function (e) {
          if (e.name === "checkout.completed") {
            document.getElementById("af-msg").textContent =
              "Payment complete. Open the extension and press \\"I have already paid, check again\\".";
          }
        }
      });
    })();
  `;
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Auto Follow Pro</h1>
        <p id="af-msg" style={{ marginTop: 8, opacity: 0.7 }}>
          {token ? "Opening secure checkout..." : "Checkout is not configured."}
        </p>
      </div>
      <Script src="https://cdn.paddle.com/paddle/v2/paddle.js" strategy="afterInteractive" />
      {token ? <Script id="paddle-init" strategy="afterInteractive">{init}</Script> : null}
    </main>
  );
}
