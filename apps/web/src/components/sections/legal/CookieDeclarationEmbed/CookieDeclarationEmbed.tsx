"use client";

import { useEffect, useRef } from "react";

type CookieDeclarationEmbedProps = {
  script?: string;
};

function extractAttribute(source: string, attribute: string) {
  const regex = new RegExp(`${attribute}=["']([^"']+)["']`, "i");
  const match = source.match(regex);
  return match?.[1] || "";
}

export default function CookieDeclarationEmbed({
  script,
}: CookieDeclarationEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const raw = script?.trim();
    if (!raw) return;

    const scriptTagMatch = raw.match(/<script\b[^>]*><\/script>|<script\b[^>]*>/i);
    if (!scriptTagMatch) return;

    const scriptTag = scriptTagMatch[0];

    const src = extractAttribute(scriptTag, "src");
    const id = extractAttribute(scriptTag, "id");
    const type = extractAttribute(scriptTag, "type") || "text/javascript";
    const dataCookieconsent = extractAttribute(scriptTag, "data-cookieconsent");
    const dataCulture = extractAttribute(scriptTag, "data-culture");
    const asyncAttr = /\sasync(\s|>|$)/i.test(scriptTag);
    const deferAttr = /\sdefer(\s|>|$)/i.test(scriptTag);

    const scriptEl = document.createElement("script");

    if (id) scriptEl.id = id;
    if (src) scriptEl.src = src;
    if (type) scriptEl.type = type;
    if (dataCookieconsent) {
      scriptEl.setAttribute("data-cookieconsent", dataCookieconsent);
    }
    if (dataCulture) {
      scriptEl.setAttribute("data-culture", dataCulture);
    }
    if (asyncAttr) scriptEl.async = true;
    if (deferAttr) scriptEl.defer = true;

    container.appendChild(scriptEl);

    return () => {
      container.innerHTML = "";
    };
  }, [script]);

  return <div ref={containerRef} />;
}