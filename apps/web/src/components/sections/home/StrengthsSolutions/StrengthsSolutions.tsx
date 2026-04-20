"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
} from "react-icons/hi";

import type {
  HomeStrengthItem,
  HomeSolutionCard,
  HomeStrengthsSectionData,
} from "../types";
import styles from "./StrengthsSolutions.module.css";

type StrengthsSolutionsProps = {
  data?: HomeStrengthsSectionData;
};

const FALLBACK_STRENGTHS: HomeStrengthItem[] = [
  {
    title: "Metodo chiaro",
    text: "Ogni progetto parte da una direzione precisa, con obiettivi, struttura e priorità definite fin dall’inizio.",
  },
  {
    title: "Qualità visiva",
    text: "Costruiamo interfacce, identità e sistemi digitali con un linguaggio premium, solido e coerente.",
  },
  {
    title: "Visione pratica",
    text: "Uniamo estetica, contenuto e funzione per produrre soluzioni realmente utili, non semplici esercizi di stile.",
  },
  {
    title: "Continuità progettuale",
    text: "Dalla prima idea alla messa online, ogni parte del lavoro resta allineata e riconoscibile.",
  },
];

const FALLBACK_SOLUTIONS: HomeSolutionCard[] = [
  {
    eyebrow: "Solution",
    title: "Web Design",
    text: "Siti e interfacce pensati per dare autorevolezza, chiarezza e performance al brand.",
    href: "/web-design",
    hoverImageUrl: "",
    hoverImageAlt: "Web Design",
  },
  {
    eyebrow: "Solution",
    title: "Social & Advertising",
    text: "Strategia, contenuti e campagne per costruire presenza, coerenza e risultati misurabili.",
    href: "/social-advertising",
    hoverImageUrl: "",
    hoverImageAlt: "Social & Advertising",
  },
  {
    eyebrow: "Solution",
    title: "Brand Identity",
    text: "Sistemi visivi capaci di rendere un brand riconoscibile, credibile e memorabile.",
    href: "/brand-identity",
    hoverImageUrl: "",
    hoverImageAlt: "Brand Identity",
  },
  {
    eyebrow: "Solution",
    title: "Progetti Custom",
    text: "Strumenti digitali su misura, progettati attorno a processi reali, obiettivi e casi d’uso concreti.",
    href: "/progetti-custom",
    hoverImageUrl: "",
    hoverImageAlt: "Progetti Custom",
  },
];

export default function StrengthsSolutions({
  data,
}: StrengthsSolutionsProps) {
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLSpanElement[]>([]);

  const eyebrow = data?.eyebrow?.trim() || "Perché Kerning";
  const title =
    data?.title?.trim() ||
    "Un approccio chiaro, progettuale e orientato al risultato.";
  const intro =
    data?.intro?.trim() ||
    "Un modo di lavorare che mette insieme visione, composizione e concretezza, senza compromessi sulla qualità.";

  const strengths: HomeStrengthItem[] =
    data?.strengths?.filter((item) => item?.title || item?.text) ?? [];

  const solutionCards: HomeSolutionCard[] =
    data?.solutionsCards?.filter((item) => item?.title || item?.text) ?? [];

  const solutionsEyebrow =
    data?.solutionsEyebrow?.trim() || "Soluzioni digitali";
  const solutionsTitle =
    data?.solutionsTitle?.trim() ||
    "Quattro aree, un unico metodo: qualità, coerenza e visione.";
  const solutionsCtaLabel =
    data?.solutionsCtaLabel?.trim() || "Vai a Soluzioni Digitali";
  const solutionsCtaHref =
    data?.solutionsCtaHref?.trim() || "/soluzioni-digitali";

  const visibleStrengths: HomeStrengthItem[] = strengths.length
    ? strengths
    : FALLBACK_STRENGTHS;

  const visibleSolutions: HomeSolutionCard[] = solutionCards.length
    ? solutionCards
    : FALLBACK_SOLUTIONS;

  const scrollCards = (direction: "prev" | "next") => {
    const container = cardsTrackRef.current;
    if (!container) return;

    const amount = Math.max(container.clientWidth * 0.72, 280);

    container.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const random = gsap.utils.random;

    const computeRange = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      return {
        x: width * 0.8,
        y: height * 0.6,
      };
    };

    const animateBlob = (blob: HTMLSpanElement) => {
      const { x, y } = computeRange();

      const isQuick = Math.random() < 0.26;
      const duration = isQuick ? random(1.8, 3.2) : random(6.8, 14.2);
      const ease = isQuick ? "power2.out" : "sine.inOut";

      gsap.to(blob, {
        x: random(-x, x),
        y: random(-y, y),
        scale: random(0.8, 1.28),
        rotation: random(-20, 20),
        duration,
        ease,
        onComplete: () => animateBlob(blob),
      });
    };

    blobsRef.current.forEach((blob, index) => {
      if (!blob) return;

      gsap.set(blob, { x: 0, y: 0, rotation: 0 });

      gsap.to(blob, {
        x: random(-80, 80),
        y: random(-80, 80),
        scale: random(0.92, 1.12),
        duration: random(1.2, 2.4),
        ease: "power2.out",
        delay: index * 0.06,
        onComplete: () => animateBlob(blob),
      });
    });

    return () => {
      blobsRef.current.forEach((blob) => blob && gsap.killTweensOf(blob));
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.background}>
        {[0, 1, 2, 3].map((_, index) => (
          <span
            key={index}
            className={styles.blob}
            ref={(element) => {
              if (element) blobsRef.current[index] = element;
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.topBlock}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.intro}>{intro}</p>

          <div className={styles.strengthsGrid}>
            {visibleStrengths.map((item, index) => (
              <article
                key={item._key || `${item.title}-${index}`}
                className={styles.strengthCard}
              >
                <span className={styles.strengthIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.strengthTitle}>{item.title}</h3>
                <p className={styles.strengthText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.solutionsBlock}>
          <div className={styles.solutionsHeader}>
            <div className={styles.solutionsCopy}>
              <span className={styles.eyebrow}>{solutionsEyebrow}</span>
              <h3 className={styles.solutionsTitle}>{solutionsTitle}</h3>
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.navButton}
                onClick={() => scrollCards("prev")}
                aria-label="Card precedente"
              >
                <HiOutlineArrowLeft />
              </button>

              <button
                type="button"
                className={styles.navButton}
                onClick={() => scrollCards("next")}
                aria-label="Card successiva"
              >
                <HiOutlineArrowRight />
              </button>
            </div>
          </div>

          <div ref={cardsTrackRef} className={styles.cardsTrack}>
            {visibleSolutions.map((card, index) => (
              <article
                key={card._key || `${card.title}-${index}`}
                className={styles.solutionCard}
              >
                {card.hoverImageUrl ? (
                  <div className={styles.hoverThumb}>
                    <img
                      src={card.hoverImageUrl}
                      alt={card.hoverImageAlt || card.title || "Solution image"}
                      className={styles.hoverThumbImage}
                    />
                  </div>
                ) : null}

                <span className={styles.solutionEyebrow}>
                  {card.eyebrow || "Soluzione"}
                </span>
                <h4 className={styles.solutionTitle}>{card.title}</h4>
                <p className={styles.solutionText}>{card.text}</p>

                <Link
                  href={card.href?.trim() || "#"}
                  className={styles.solutionLink}
                >
                  Scopri di più
                </Link>
              </article>
            ))}
          </div>

          <div className={styles.footer}>
            <Link href={solutionsCtaHref} className={styles.cta}>
              {solutionsCtaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}