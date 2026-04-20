"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineArrowRight } from "react-icons/hi";

import type { DigitalSolutionsCard } from "../types";
import styles from "./DigitalSolutionsPinnedCards.module.css";

gsap.registerPlugin(ScrollTrigger);

type DigitalSolutionsPinnedCardsProps = {
  cards?: DigitalSolutionsCard[];
};

const FALLBACK_CARDS: DigitalSolutionsCard[] = [
  {
    title: "Web Design",
    text: "Siti e interfacce progettati per dare autorevolezza, chiarezza e forza al brand, con un equilibrio preciso tra impatto visivo, esperienza e struttura.",
    bullets: [
      "Siti corporate e istituzionali",
      "Landing page ad alta conversione",
      "Design system e UI coerenti",
    ],
    ctaLabel: "Vai alla pagina",
    ctaHref: "/web-design",
    imageUrl: "",
    imageAlt: "Web Design",
  },
  {
    title: "Social & Advertising",
    text: "Strategia, contenuti e campagne pensati per costruire presenza, continuità e risultati misurabili, senza comunicazione generica e senza dispersione.",
    bullets: [
      "Strategia editoriale e creativa",
      "ADV orientata a lead e performance",
      "Presenza coerente su tutti i touchpoint",
    ],
    ctaLabel: "Vai alla pagina",
    ctaHref: "/social-advertising",
    imageUrl: "",
    imageAlt: "Social & Advertising",
  },
  {
    title: "Brand Identity",
    text: "Sistemi visivi costruiti per rendere un brand riconoscibile, coerente e credibile in ogni punto di contatto, online e offline.",
    bullets: [
      "Identità visive solide e distintive",
      "Palette, tipografia e linguaggio coerenti",
      "Materiali coordinati per il brand",
    ],
    ctaLabel: "Vai alla pagina",
    ctaHref: "/brand-identity",
    imageUrl: "",
    imageAlt: "Brand Identity",
  },
  {
    title: "Progetti Custom",
    text: "Soluzioni digitali su misura per esigenze specifiche, processi reali e obiettivi concreti, progettate per adattarsi davvero al contesto in cui devono vivere.",
    bullets: [
      "Tool e piattaforme su misura",
      "Processi e flussi progettati ad hoc",
      "Approccio tecnico orientato all’uso reale",
    ],
    ctaLabel: "Vai alla pagina",
    ctaHref: "/progetti-custom",
    imageUrl: "",
    imageAlt: "Progetti Custom",
  },
];

export default function DigitalSolutionsPinnedCards({
  cards,
}: DigitalSolutionsPinnedCardsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const visibleCards = useMemo(() => {
    const parsed = cards?.filter((card) => card?.title || card?.text) ?? [];
    return parsed.length ? parsed : FALLBACK_CARDS;
  }, [cards]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance() + window.innerHeight * 0.45}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const refresh = () => ScrollTrigger.refresh();

      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("resize", refresh);
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [visibleCards.length]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={viewportRef} className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          {visibleCards.map((card, index) => (
            <article
              key={card._key || `${card.title}-${index}`}
              className={styles.card}
            >
              <div className={styles.cardContent}>
                <span className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className={styles.copy}>
                  <h2 className={styles.title}>{card.title}</h2>
                  <p className={styles.text}>{card.text}</p>

                  <ul className={styles.bullets}>
                    {(card.bullets ?? []).map((bullet, bulletIndex) => (
                      <li key={`${bullet}-${bulletIndex}`} className={styles.bullet}>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={card.ctaHref?.trim() || "#"}
                    className={styles.cta}
                  >
                    <span>{card.ctaLabel || "Scopri di più"}</span>
                    <HiOutlineArrowRight className={styles.ctaIcon} />
                  </Link>
                </div>
              </div>

              <div className={styles.media}>
                {card.imageUrl ? (
                  <img
                    src={card.imageUrl}
                    alt={card.imageAlt || card.title || "Digital solution"}
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <span>{card.title}</span>
                  </div>
                )}
                <div className={styles.mediaOverlay} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}