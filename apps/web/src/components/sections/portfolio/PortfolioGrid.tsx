"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { HiArrowRight } from "react-icons/hi";
import styles from "./PortfolioGrid.module.css";

type ProjectFilterCategory = "Sito Web" | "Social" | "Grafica";

type Project = {
  title: string;
  category?: string;
  portfolioFilterCategory?: string;
  imageUrl?: string;
  slug: string;
};

type Props = {
  heroEyebrow?: string;
  title?: string;
  subtitle?: string;
  sectionEyebrow?: string;
  sectionTitle?: string;
  projectsCountSuffix?: string;
  emptyStateText?: string;
  projects?: Project[];
};

type FilterValue = "all" | ProjectFilterCategory;

const FILTERS: Array<{ label: string; value: FilterValue }> = [
  { label: "Tutti i progetti", value: "all" },
  { label: "Siti Web", value: "Sito Web" },
  { label: "Social", value: "Social" },
  { label: "Grafiche", value: "Grafica" },
];

export default function PortfolioGrid({
  heroEyebrow = "Portfolio",
  title = "Portfolio",
  subtitle = "Una selezione di progetti che raccontano il nostro approccio.",
  sectionEyebrow = "Selected Work",
  sectionTitle = "Progetti costruiti con identità, struttura e attenzione al dettaglio.",
  projectsCountSuffix = "progetti",
  emptyStateText = "Portfolio in caricamento…",
  projects = [],
}: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement[]>([]);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const sectionIntroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;

    return projects.filter(
      (project) => project.portfolioFilterCategory === activeFilter
    );
  }, [activeFilter, projects]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    const rand = gsap.utils.random;

    if (!prefersReducedMotion && !isTouch) {
      const animateBlob = (blob: HTMLDivElement) => {
        gsap.to(blob, {
          x: rand(-window.innerWidth * 0.7, window.innerWidth * 0.7),
          y: rand(-window.innerHeight * 0.55, window.innerHeight * 0.55),
          scale: rand(0.78, 1.28),
          rotation: rand(-18, 18),
          duration: rand(7, 15),
          ease: "sine.inOut",
          onComplete: () => animateBlob(blob),
        });
      };

      blobsRef.current.forEach((blob, index) => {
        if (!blob) return;

        gsap.set(blob, {
          x: rand(-120, 120),
          y: rand(-120, 120),
          scale: rand(0.9, 1.12),
        });

        gsap.to(blob, {
          x: rand(-200, 200),
          y: rand(-200, 200),
          duration: rand(1.2, 2.6),
          ease: "power2.out",
          delay: index * 0.08,
          onComplete: () => animateBlob(blob),
        });
      });
    }

    const glow = mouseGlowRef.current;
    if (!glow || isTouch) return;

    const quickX = gsap.quickTo(glow, "x", {
      duration: 0.25,
      ease: "power3.out",
    });
    const quickY = gsap.quickTo(glow, "y", {
      duration: 0.25,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      blobsRef.current.forEach((blob) => blob && gsap.killTweensOf(blob));
      gsap.killTweensOf(glow);
    };
  }, []);

  useEffect(() => {
    const heroInner = heroInnerRef.current;
    const filters = filtersRef.current;
    const sectionIntro = sectionIntroRef.current;
    const grid = gridRef.current;

    if (heroInner) {
      gsap.fromTo(
        heroInner.children,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.08,
        }
      );
    }

    if (filters) {
      gsap.fromTo(
        filters,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.14,
        }
      );
    }

    const revealTargets = [
      ...(sectionIntro ? [sectionIntro] : []),
      ...(grid
        ? Array.from(grid.querySelectorAll<HTMLElement>(`[data-card="project"]`))
        : []),
    ];

    if (!revealTargets.length) return;

    revealTargets.forEach((element) => {
      gsap.set(element, { y: 28, opacity: 0 });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          gsap.to(entry.target, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
          });

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealTargets.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [filteredProjects.length, activeFilter]);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.noise} />

        <div className={styles.background}>
          {[0, 1, 2, 3].map((_, i) => (
            <div
              key={i}
              className={styles.blob}
              ref={(el) => {
                if (el) blobsRef.current[i] = el;
              }}
            />
          ))}
        </div>

        <div ref={mouseGlowRef} className={styles.mouseGlow} />

        <div ref={heroInnerRef} className={styles.heroInner}>
          <span className={styles.eyebrow}>{heroEyebrow}</span>
          <h1 className={styles.heroTitle}>{title}</h1>
          {subtitle ? <p className={styles.heroSubtitle}>{subtitle}</p> : null}
        </div>

        <div className={styles.bottomLine} />
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.sectionInner}`}>

          <div ref={sectionIntroRef} className={styles.sectionIntro}>
            <div className={styles.sectionCopy}>
              <span className={styles.sectionEyebrow}>{sectionEyebrow}</span>
              <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
            </div>

            <div className={styles.sectionMeta}>
              <span className={styles.projectsCount}>
                {String(filteredProjects.length).padStart(2, "0")}{" "}
                {projectsCountSuffix}
              </span>
            </div>
          </div>

          <div ref={filtersRef} className={styles.filtersBlock}>

            <div className={styles.filtersRow}>
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ""
                      }`}
                    onClick={() => setActiveFilter(filter.value)}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div ref={gridRef} className={styles.grid}>
            {filteredProjects.length === 0 ? (
              <div className={styles.empty}>{emptyStateText}</div>
            ) : (
              filteredProjects.map((project, index) => (
                <article
                  key={project.slug}
                  className={`${styles.card} ${index % 2 === 1 ? styles.cardOffset : ""
                    }`}
                  data-card="project"
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className={styles.cardLink}
                  >
                    <div className={styles.imageWrapper}>
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className={styles.image}
                          sizes="(max-width: 900px) 100vw, 50vw"
                        />
                      ) : (
                        <div className={styles.imagePlaceholder} />
                      )}

                      <span className={styles.imageOverlay} />
                    </div>

                    <div className={styles.meta}>
                      {project.category ? (
                        <span className={styles.category}>{project.category}</span>
                      ) : null}

                      <div className={styles.metaBottom}>
                        <h3 className={styles.projectTitle}>{project.title}</h3>

                        <span className={styles.cta}>
                          <span>Mostra progetto</span>
                          <HiArrowRight />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}