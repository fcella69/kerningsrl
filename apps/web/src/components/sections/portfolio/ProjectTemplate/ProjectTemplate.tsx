"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
} from "react-icons/hi";
import styles from "./ProjectPage.module.css";

gsap.registerPlugin(ScrollTrigger);

type ProjectNavItem = {
  title: string;
  category?: string;
  slug: string;
  imageUrl?: string;
};

type Project = {
  title: string;
  category?: string;
  slug: string;

  coverImageUrl?: string;
  coverImageAlt?: string;

  overviewEyebrow?: string;
  overviewTitle?: string;
  description?: PortableTextBlock[];

  services?: string[];
  liveSiteLabel?: string;
  liveSiteUrl?: string;

  galleryTopWideImageUrl?: string;
  galleryTopWideImageAlt?: string;

  galleryPairLeftImageUrl?: string;
  galleryPairLeftImageAlt?: string;

  galleryPairRightImageUrl?: string;
  galleryPairRightImageAlt?: string;

  galleryBottomWideImageUrl?: string;
  galleryBottomWideImageAlt?: string;

  galleryFinalWideImageUrl?: string;
  galleryFinalWideImageAlt?: string;
};

type Props = {
  project: Project;
  previousProject?: ProjectNavItem | null;
  nextProject?: ProjectNavItem | null;
};

function NavCard({
  label,
  direction,
  project,
}: {
  label: string;
  direction: "prev" | "next";
  project?: ProjectNavItem | null;
}) {
  if (!project) return null;

  return (
    <Link href={`/portfolio/${project.slug}`} className={styles.navCard}>
      <div className={styles.navCardMedia}>
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className={styles.navCardImage}
          />
        ) : (
          <div className={styles.navCardPlaceholder} />
        )}
      </div>

      <div className={styles.navCardBody}>
        <span className={styles.navCardLabel}>{label}</span>

        {project.category ? (
          <span className={styles.navCardCategory}>{project.category}</span>
        ) : null}

        <h3 className={styles.navCardTitle}>{project.title}</h3>

        <span className={styles.navCardCta}>
          {direction === "prev" ? <HiOutlineArrowLeft /> : <HiOutlineArrowRight />}
          <span>Mostra progetto</span>
        </span>
      </div>
    </Link>
  );
}

export default function ProjectTemplate({
  project,
  previousProject,
  nextProject,
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const heroMediaSectionRef = useRef<HTMLElement>(null);
  const heroMediaShellRef = useRef<HTMLDivElement>(null);
  const heroMediaImageRef = useRef<HTMLImageElement>(null);

  const services = project.services?.filter(Boolean) ?? [];

  useEffect(() => {
    if (!rootRef.current) return;

    const elements = rootRef.current.querySelectorAll("[data-animate]");

    gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.95,
        ease: "power4.out",
        stagger: 0.08,
      }
    );
  }, []);

  useLayoutEffect(() => {
    const section = heroMediaSectionRef.current;
    const shell = heroMediaShellRef.current;
    const image = heroMediaImageRef.current;

    if (!section || !shell || !image) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.set(shell, {
        scale: 0.84,
        transformOrigin: "center center",
      });

      gsap.set(image, {
        scale: 1.08,
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          end: "top 42%",
          scrub: 0.9,
        },
      });

      tl.to(
        shell,
        {
          scale: 1,
          ease: "none",
        },
        0
      ).to(
        image,
        {
          scale: 1,
          ease: "none",
        },
        0
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    mm.add("(max-width: 768px)", () => {
      gsap.set(shell, {
        scale: 0.93,
        transformOrigin: "center center",
      });

      gsap.set(image, {
        scale: 1.04,
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 92%",
          end: "top 55%",
          scrub: 0.9,
        },
      });

      tl.to(
        shell,
        {
          scale: 1,
          ease: "none",
        },
        0
      ).to(
        image,
        {
          scale: 1,
          ease: "none",
        },
        0
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const moveX = gsap.quickTo(glow, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(glow, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const handleMove = (e: MouseEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      gsap.killTweensOf(glow);
    };
  }, []);

  return (
    <article ref={rootRef} className={styles.project}>
      <div ref={glowRef} className={styles.mouseGlow} />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          {project.category ? (
            <span className={styles.category} data-animate>
              {project.category}
            </span>
          ) : null}

          <h1 className={styles.title} data-animate>
            {project.title}
          </h1>
        </div>
      </header>

      {project.coverImageUrl ? (
        <section
          ref={heroMediaSectionRef}
          className={styles.heroMediaSection}
          data-animate
        >
          <div ref={heroMediaShellRef} className={styles.heroMediaShell}>
            <img
              ref={heroMediaImageRef}
              src={project.coverImageUrl}
              alt={project.coverImageAlt || project.title}
              className={styles.heroMediaImage}
            />
          </div>
        </section>
      ) : null}

      <section className={styles.overviewSection}>
        <div className={`container ${styles.overviewGrid}`}>
          <div className={styles.overviewMain} data-animate>
            <span className={styles.overviewEyebrow}>
              {project.overviewEyebrow || "Case Study"}
            </span>

            <h2 className={styles.overviewTitle}>
              {project.overviewTitle || project.title}
            </h2>

            {project.description ? (
              <div className={styles.overviewText}>
                <PortableText value={project.description} />
              </div>
            ) : null}
          </div>

          <aside className={styles.overviewAside} data-animate>
            {services.length ? (
              <div className={styles.infoCard}>
                <span className={styles.infoCardTitle}>Servizi</span>

                <ul className={styles.servicesList}>
                  {services.map((service, index) => (
                    <li key={`${service}-${index}`} className={styles.serviceItem}>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.liveSiteUrl ? (
              <a
                href={project.liveSiteUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.liveSiteButton}
              >
                <span>{project.liveSiteLabel || "Vedi il sito"}</span>
                <HiOutlineArrowRight />
              </a>
            ) : null}
          </aside>
        </div>
      </section>

      {project.galleryTopWideImageUrl ? (
        <section className={styles.fullBleedBlock}>
          <img
            src={project.galleryTopWideImageUrl}
            alt={project.galleryTopWideImageAlt || project.title}
            className={styles.fullBleedImage}
          />
        </section>
      ) : null}

      {project.galleryPairLeftImageUrl || project.galleryPairRightImageUrl ? (
        <section className={styles.pairBleedBlock}>
          <div className={styles.pairBleedItem}>
            {project.galleryPairLeftImageUrl ? (
              <img
                src={project.galleryPairLeftImageUrl}
                alt={project.galleryPairLeftImageAlt || project.title}
                className={styles.pairBleedImage}
              />
            ) : null}
          </div>

          <div className={styles.pairBleedItem}>
            {project.galleryPairRightImageUrl ? (
              <img
                src={project.galleryPairRightImageUrl}
                alt={project.galleryPairRightImageAlt || project.title}
                className={styles.pairBleedImage}
              />
            ) : null}
          </div>
        </section>
      ) : null}

      {project.galleryBottomWideImageUrl ? (
        <section className={styles.fullBleedBlock}>
          <img
            src={project.galleryBottomWideImageUrl}
            alt={project.galleryBottomWideImageAlt || project.title}
            className={styles.fullBleedImage}
          />
        </section>
      ) : null}

      {project.galleryFinalWideImageUrl ? (
        <section className={styles.fullBleedBlock}>
          <img
            src={project.galleryFinalWideImageUrl}
            alt={project.galleryFinalWideImageAlt || project.title}
            className={styles.fullBleedImage}
          />
        </section>
      ) : null}

      {previousProject || nextProject ? (
        <section className={styles.navigationSection}>
          <div className={`container ${styles.navigationGrid}`}>
            <NavCard
              label="Progetto precedente"
              direction="prev"
              project={previousProject}
            />

            <NavCard
              label="Progetto successivo"
              direction="next"
              project={nextProject}
            />
          </div>
        </section>
      ) : null}

      <section className={styles.finalCtaSection}>
        <div className={`container ${styles.finalCtaInner}`}>
          <span className={styles.finalCtaEyebrow}>Portfolio</span>
          <h2 className={styles.finalCtaTitle}>Vuoi vedere altri progetti?</h2>
          <Link href="/portfolio" className={styles.finalCtaButton}>
            Tutti i progetti
          </Link>
        </div>
      </section>
    </article>
  );
}