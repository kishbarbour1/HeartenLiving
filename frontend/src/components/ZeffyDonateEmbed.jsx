import { useEffect, useRef } from "react";

// Zeffy donation form for Hearten Horizons.
// The form is rendered inside Zeffy's PCI-compliant iframe — no payment or
// donor information ever passes through this site.
const FORM_PATH =
  "embed/donation-form/supporting-youth-through-housing-mentorship-and-life-skills";
const EMBED_SRC = `https://www.zeffy.com/${FORM_PATH}`;
const SCRIPT_SRC = "https://www.zeffy.com/embed/v2/zeffy-embed.js";

export default function ZeffyDonateEmbed() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    // Element Zeffy's script upgrades into an auto-resizing iframe.
    const embed = document.createElement("div");
    embed.setAttribute("data-zeffy-embed", "");
    embed.setAttribute("data-form-url", `/${FORM_PATH}`);

    // Plain-iframe fallback if the embed script fails to load.
    const fallback = document.createElement("div");
    fallback.setAttribute("data-zeffy-embed-fallback", "");
    fallback.style.display = "none";
    fallback.innerHTML =
      '<div style="position:relative;overflow:hidden;min-height:680px;width:100%;">' +
      '<iframe title="Donation form powered by Zeffy" ' +
      'style="position:absolute;border:0;top:0;left:0;bottom:0;right:0;width:100%;height:100%" ' +
      `data-zeffy-embed-src="${EMBED_SRC}" ` +
      'allow="payment" allowpaymentrequest allowtransparency="true"></iframe></div>';

    container.appendChild(embed);
    container.appendChild(fallback);

    // (Re)load Zeffy's embed script so it scans the freshly mounted element,
    // which keeps the form working after client-side route changes.
    document
      .querySelectorAll(`script[src="${SCRIPT_SRC}"]`)
      .forEach((el) => el.remove());
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onerror = () => {
      fallback.style.display = "block";
      fallback
        .querySelectorAll("iframe[data-zeffy-embed-src]")
        .forEach((f) => {
          f.src = f.getAttribute("data-zeffy-embed-src");
        });
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className="w-full" />;
}
