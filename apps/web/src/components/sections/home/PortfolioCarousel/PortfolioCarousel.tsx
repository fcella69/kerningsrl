"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
} from "react-icons/hi";
import styles from "./PortfolioCarousel.module.css";

type PortfolioProject = {
  title?: string;
  category?: string;
  slug?: string;
  imageUrl?: string;
};

type PortfolioPreviewData = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  featuredProjects?: PortfolioProject[];
  legacyProjects?: PortfolioProject[];
};

type PortfolioCarouselProps = {
  data?: PortfolioPreviewData;
};

export default function PortfolioCarousel({
  data,
}: PortfolioCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const eyebrow = data?.eyebrow?.trim() || "Selected Work";
  const title =
    data?.title?.trim() ||
    "Una selezione di progetti costruiti con metodo, identità e attenzione al dettaglio.";
  const description =
    data?.description?.trim() ||
    "Lavori sviluppati per dare presenza, chiarezza e qualità reale all’esperienza digitale del brand.";
  const ctaLabel = data?.ctaLabel?.trim() || "Tutti i progetti";
  const ctaHref = data?.ctaHref?.trim() || "/portfolio";

  const projects = useMemo(() => {
    const featured =
      data?.featuredProjects?.filter(
        (item) => item?.title && item?.slug
      ) ?? [];

    if (featured.length) return featured;

    return (
      data?.legacyProjects?.filter((item) => item?.title && item?.slug) ?? []
    );
  }, [data?.featuredProjects, data?.legacyProjects]);

  const getClosestIndex = () => {
    const container = trackRef.current;
    if (!container || !cardRefs.current.length) return 0;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  const scrollToIndex = (index: number) => {
    const container = trackRef.current;
    const card = cardRefs.current[index];

    if (!container || !card) return;

    const targetLeft =
      card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;

    container.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (!projects.length) return;

    const currentIndex = getClosestIndex();
    const delta = direction === "next" ? 1 : -1;
    const nextIndex = Math.max(
      0,
      Math.min(projects.length - 1, currentIndex + delta)
    );

    scrollToIndex(nextIndex);
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.header}`}>
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>{title}</h2>
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}
        </div>

        <div className={styles.headerControls}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => handleNavigate("prev")}
            aria-label="Progetto precedente"
          >
            <HiOutlineArrowLeft />
          </button>

          <button
            type="button"
            className={styles.navButton}
            onClick={() => handleNavigate("next")}
            aria-label="Progetto successivo"
          >
            <HiOutlineArrowRight />
          </button>
        </div>
      </div>

      <div className={styles.carouselViewport}>
        <div className={styles.overlayControls} aria-hidden="true">
          <button
            type="button"
            className={styles.navButton}
            onClick={() => handleNavigate("prev")}
            aria-label="Progetto precedente"
          >
            <HiOutlineArrowLeft />
          </button>

          <button
            type="button"
            className={styles.navButton}
            onClick={() => handleNavigate("next")}
            aria-label="Progetto successivo"
          >
            <HiOutlineArrowRight />
          </button>
        </div>

        <div ref={trackRef} className={styles.track}>
          {projects.map((project, index) => {
            const slug = project.slug?.trim();
            const titleText = project.title?.trim() || "Project";
            const categoryText = project.category?.trim();

            return (
              <div
                key={`${slug}-${index}`}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className={styles.card}
              >
                <Link
                  href={slug ? `/portfolio/${slug}` : "#"}
                  className={styles.cardLink}
                >
                  <div className={styles.mediaWrap}>
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={titleText}
                        fill
                        className={styles.image}
                        sizes="(max-width: 640px) 86vw, (max-width: 1200px) 66vw, 750px"
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <span>{titleText}</span>
                      </div>
                    )}

                    <span className={styles.mediaOverlay} />
                  </div>

                  <div className={styles.meta}>
                    <div className={styles.metaCopy}>
                      {categoryText ? (
                        <span className={styles.category}>{categoryText}</span>
                      ) : null}

                      <h3 className={styles.projectTitle}>{titleText}</h3>
                    </div>

                    <span className={styles.cardCta}>
                      <span>Scopri di più</span>
                      <HiOutlineArrowRight className={styles.cardCtaIcon} />
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <Link href={ctaHref} className={styles.cta}>
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}