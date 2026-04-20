"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import styles from "./ProjectPage.module.css";

type Project = {
  title: string;
  category?: string;
  description?: PortableTextBlock[];
  coverImageUrl?: string;
  gallery?: {
    url: string;
  }[];
};

type Props = {
  project: Project;
};

export default function ProjectTemplate({ project }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  /* =========================
     ENTRANCE ANIMATIONS
  ========================= */
  useEffect(() => {
    if (!rootRef.current) return;

    const elements = rootRef.current.querySelectorAll("[data-animate]");

    gsap.fromTo(
      elements,
      { y: 48, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.12,
      }
    );
  }, []);

  /* =========================
     MOUSE GLOW
  ========================= */
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const moveX = gsap.quickTo(glow, "x", { duration: 0.35 });
    const moveY = gsap.quickTo(glow, "y", { duration: 0.35 });

    const handleMove = (e: MouseEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /* =========================
     ZOOM HANDLER
  ========================= */
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) =>
      e.deltaY < 0 ? Math.min(prev + 0.2, 3) : Math.max(prev - 0.2, 1)
    );
  };

  return (
    <article ref={rootRef} className={styles.project}>
      <div ref={glowRef} className={styles.mouseGlow} />

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          {project.category && (
            <span className={styles.category} data-animate>
              {project.category}
            </span>
          )}
          <h1 className={styles.title} data-animate>
            {project.title}
          </h1>
        </div>
      </header>

      {/* CONTENT */}
      <section className={styles.content}>
        <div className={styles.topSection}>
          {project.description && (
            <div className={styles.description} data-animate>
              <PortableText value={project.description} />
            </div>
          )}

          {project.coverImageUrl && (
            <div
              className={styles.coverWrapper}
              data-animate
              onClick={() => {
                setLightboxImage(project.coverImageUrl!);
                setZoom(1);
              }}
            >
              <img
                src={project.coverImageUrl}
                alt={project.title}
                className={styles.coverImage}
              />
            </div>
          )}
        </div>
      </section>

      {/* FULL WIDTH GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <section className={styles.gallerySection}>
          <div className={styles.gallery}>
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className={styles.galleryItem}
                onClick={() => {
                  setLightboxImage(img.url);
                  setZoom(1);
                }}
              >
                <img src={img.url} alt="" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div
          className={styles.lightbox}
          onClick={() => setLightboxImage(null)}
        >
          <div
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={styles.closeButton}
              onClick={() => setLightboxImage(null)}
            >
              Close
            </div>

            <img
              src={lightboxImage}
              alt=""
              className={styles.lightboxImage}
              style={{ transform: `scale(${zoom})` }}
              onWheel={handleWheel}
            />
          </div>
        </div>
      )}
    </article>
  );
}