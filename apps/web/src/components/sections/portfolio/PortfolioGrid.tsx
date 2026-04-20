"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import styles from "./PortfolioGrid.module.css";
import { HiArrowRight } from "react-icons/hi";

type Project = {
  title: string;
  category?: string;
  imageUrl?: string;
  slug: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  projects?: Project[];
};

export default function PortfolioGrid({
  title = "Portfolio",
  subtitle = "Una selezione di progetti che raccontano il nostro approccio.",
  projects = [],
}: Props) {
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement[]>([]);

  const gridRef = useRef<HTMLDivElement>(null);

  /* =========================
     EFFECTS (bg come Hero)
  ========================= */
  useEffect(() => {
    /* ===== BLOB MOVEMENT ===== */
    const rand = gsap.utils.random;

    const animateBlob = (blob: HTMLDivElement) => {
      gsap.to(blob, {
        x: rand(-window.innerWidth * 0.8, window.innerWidth * 0.8),
        y: rand(-window.innerHeight * 0.8, window.innerHeight * 0.8),
        scale: rand(0.75, 1.35),
        rotation: rand(-25, 25),
        duration: rand(6, 14),
        ease: "sine.inOut",
        onComplete: () => animateBlob(blob),
      });
    };

    blobsRef.current.forEach((blob, i) => {
      if (!blob) return;

      gsap.set(blob, {
        x: rand(-120, 120),
        y: rand(-120, 120),
        scale: rand(0.9, 1.15),
      });

      gsap.to(blob, {
        x: rand(-200, 200),
        y: rand(-200, 200),
        duration: rand(1.2, 2.6),
        ease: "power2.out",
        delay: i * 0.08,
        onComplete: () => animateBlob(blob),
      });
    });

    /* ===== MOUSE GLOW ===== */
    const glow = mouseGlowRef.current;
    if (!glow) return;

    const quickX = gsap.quickTo(glow, "x", { duration: 0.25, ease: "power3.out" });
    const quickY = gsap.quickTo(glow, "y", { duration: 0.25, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      blobsRef.current.forEach((b) => b && gsap.killTweensOf(b));
      gsap.killTweensOf(glow);
    };
  }, []);

  /* =========================
     GSAP CARDS (reveal + hover)
  ========================= */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>(`[data-card="project"]`));
    if (!cards.length) return;

    // Stato iniziale
    gsap.set(cards, { opacity: 0, y: 28, scale: 0.985 });

    // Reveal on enter viewport
    const io = new IntersectionObserver(
      (entries) => {
        // animiamo in “batch” le card che entrano
        const entering = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement);

        if (entering.length) {
          gsap.to(entering, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
          });

          // una volta animate, le “smettiamo di osservare”
          entering.forEach((el) => io.unobserve(el));
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    cards.forEach((c) => io.observe(c));

    // Hover premium (desktop only)
    const prefersTouch =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(hover: none)").matches || window.matchMedia?.("(pointer: coarse)").matches);

    const cleanups: Array<() => void> = [];

    if (!prefersTouch) {
      cards.forEach((card) => {
        const img = card.querySelector<HTMLElement>(`[data-card-img="project"]`);
        if (!img) return;

        const qxCard = gsap.quickTo(card, "x", { duration: 0.35, ease: "power3.out" });
        const qyCard = gsap.quickTo(card, "y", { duration: 0.35, ease: "power3.out" });
        const qrx = gsap.quickTo(card, "rotationX", { duration: 0.45, ease: "power3.out" });
        const qry = gsap.quickTo(card, "rotationY", { duration: 0.45, ease: "power3.out" });

        const qxImg = gsap.quickTo(img, "x", { duration: 0.6, ease: "power3.out" });
        const qyImg = gsap.quickTo(img, "y", { duration: 0.6, ease: "power3.out" });
        const qScaleImg = gsap.quickTo(img, "scale", { duration: 0.6, ease: "power3.out" });

        gsap.set(card, { transformPerspective: 900, transformStyle: "preserve-3d" });

        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width; // 0..1
          const py = (e.clientY - rect.top) / rect.height; // 0..1

          const dx = (px - 0.5) * 10; // drift leggero
          const dy = (py - 0.5) * 10;

          qxCard(dx * 0.25);
          qyCard(dy * 0.25);

          qrx(-(py - 0.5) * 6);
          qry((px - 0.5) * 8);

          qxImg((px - 0.5) * 14);
          qyImg((py - 0.5) * 10);
          qScaleImg(1.045);
        };

        const onEnter = () => {
          gsap.to(card, { scale: 1.01, duration: 0.35, ease: "power3.out" });
        };

        const onLeave = () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.65,
            ease: "elastic.out(1, 0.35)",
          });
          gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.7, ease: "power3.out" });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => {
      io.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [projects.length]);

  return (
    <>
      {/* =========================
          HERO INTRO (FULL SCREEN)
      ========================= */}
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

        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>{title}</h1>
          {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
        </div>
      </section>

      {/* =========================
          PROJECTS GRID
      ========================= */}
      <section className={styles.section}>
        <div ref={gridRef} className={styles.grid}>
          {projects.length === 0 ? (
            <div className={styles.empty}>Portfolio in caricamento…</div>
          ) : (
            projects.map((project) => (
              <article
                key={project.slug}
                className={styles.card}
                data-card="project"
              >
                <Link href={`/portfolio/${project.slug}`} className={styles.cardLink}>
                  <div className={styles.imageWrapper}>
                    {project.imageUrl && (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        data-card-img="project"
                      />
                    )}
                  </div>

                  <div className={styles.meta}>
                    {project.category && (
                      <span className={styles.category}>{project.category}</span>
                    )}

                    <h3 className={styles.projectTitle}>{project.title}</h3>

                    <span className={styles.cta}>
                      Mostra progetto
                      <HiArrowRight />
                    </span>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
}
