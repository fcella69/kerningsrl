import Link from "next/link";

import type {
  HomeAboutBridgeData,
  HomeAboutBridgeHighlight,
} from "../types";
import styles from "./HomeAboutBridge.module.css";

type HomeAboutBridgeProps = {
  data?: HomeAboutBridgeData;
};

const FALLBACK_HIGHLIGHTS: HomeAboutBridgeHighlight[] = [
  {
    title: "Visione",
    text: "Ogni progetto nasce da una direzione precisa, non da una somma casuale di elementi.",
  },
  {
    title: "Metodo",
    text: "Analisi, composizione e attenzione al dettaglio restano centrali in tutto il processo.",
  },
  {
    title: "Coerenza",
    text: "Brand, interfaccia e contenuti devono parlare la stessa lingua in ogni punto di contatto.",
  },
];

export default function HomeAboutBridge({
  data,
}: HomeAboutBridgeProps) {
  const eyebrow = data?.eyebrow?.trim() || "Inside Kerning";
  const title =
    data?.title?.trim() ||
    "Dietro ogni progetto c’è un modo preciso di osservare, costruire e rifinire.";
  const text =
    data?.text?.trim() ||
    "Una sezione breve per raccontare la visione, il metodo e il carattere con cui affrontiamo ogni lavoro.";
  const ctaLabel = data?.ctaLabel?.trim() || "Scopri chi siamo";
  const ctaHref = data?.ctaHref?.trim() || "/chi-siamo";

  const highlights =
    data?.highlights?.filter((item) => item?.title || item?.text) ?? [];

  const visibleHighlights: HomeAboutBridgeHighlight[] = highlights.length
    ? highlights
    : FALLBACK_HIGHLIGHTS;

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.text}>{text}</p>

          <div className={styles.actions}>
            <Link href={ctaHref} className={styles.cta}>
              {ctaLabel}
            </Link>
          </div>
        </div>

        <div className={styles.side}>
          <div className={styles.panel}>
            {visibleHighlights.map((item, index) => (
              <article
                key={item._key || `${item.title}-${index}`}
                className={styles.highlightCard}
              >
                <span className={styles.highlightIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.highlightTitle}>{item.title}</h3>
                  <p className={styles.highlightText}>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}