"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
} from "react-icons/hi";

import type {
  HomePortfolioPreviewData,
  HomePortfolioProject,
} from "../types";
import styles from "./PortfolioCarousel.module.css";

type PortfolioCarouselProps = {
  data?: HomePortfolioPreviewData;
};

const FALLBACK_PROJECTS: HomePortfolioProject[] = [
  {
    title: "Project preview",
    category: "Digital",
    imageUrl: "",
    slug: "",
  },
  {
    title: "Project preview",
    category: "Brand",
    imageUrl: "",
    slug: "",
  },
  {
    title: "Project preview",
    category: "Web Design",
    imageUrl: "",
    slug: "",
  },
];

export default function PortfolioCarousel({
  data,
}: PortfolioCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const featuredProjects = data?.featuredProjects?.filter(Boolean) ?? [];
  const legacyProjects = data?.legacyProjects?.filter(Boolean) ?? [];
  const projects =
    featuredProjects.length > 0
      ? featuredProjects
      : legacyProjects.length > 0
        ? legacyProjects
        : FALLBACK_PROJECTS;

  const eyebrow = data?.eyebrow?.trim() || "Portfolio";
  const title =
    data?.title?.trim() ||
    "Progetti che prendono forma con metodo, visione e precisione.";
  const description =
    data?.description?.trim() ||
    "Una selezione di lavori che racconta il nostro modo di tradurre identità, obiettivi e performance in esperienze digitali concrete.";
  const ctaLabel = data?.ctaLabel?.trim() || "Vedi tutti i progetti";
  const ctaHref = data?.ctaHref?.trim() || "/portfolio";

  const scrollByAmount = (direction: "prev" | "next") => {
    const container = trackRef.current;
    if (!container) return;

    const amount = Math.max(container.clientWidth * 0.72, 300);

    container.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.header}`}>
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => scrollByAmount("prev")}
            aria-label="Progetto precedente"
          >
            <HiOutlineArrowLeft />
          </button>

          <button
            type="button"
            className={styles.navButton}
            onClick={() => scrollByAmount("next")}
            aria-label="Progetto successivo"
          >
            <HiOutlineArrowRight />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className={styles.track}
        aria-label="Portfolio carousel"
      >
        {projects.map((project, index) => {
          const href = project.slug ? `/portfolio/${project.slug}` : ctaHref;
          const titleText = project.title?.trim() || "Project preview";
          const categoryText = project.category?.trim() || "Kerning";

          return (
            <article
              key={`${project.slug || titleText}-${index}`}
              className={styles.card}
            >
              <Link href={href} className={styles.cardLink}>
                <div className={styles.mediaWrap}>
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={titleText}
                      className={styles.image}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <span>Kerning Project</span>
                    </div>
                  )}

                  <div className={styles.mediaOverlay} />
                </div>

                <div className={styles.meta}>
                  <div className={styles.metaCopy}>
                    <span className={styles.category}>{categoryText}</span>
                    <h3 className={styles.projectTitle}>{titleText}</h3>
                  </div>

                  <span className={styles.cardCta}>
                    <span>Scopri di più</span>
                    <HiOutlineArrowRight className={styles.cardCtaIcon} />
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      <div className={styles.footer}>
        <Link href={ctaHref} className={styles.cta}>
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}