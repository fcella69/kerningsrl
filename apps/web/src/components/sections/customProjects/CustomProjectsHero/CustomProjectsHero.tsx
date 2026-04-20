"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import type { CustomProjectsImage } from "../types";
import styles from "./CustomProjectsHero.module.css";

interface CustomProjectsHeroProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image?: CustomProjectsImage;
}

export default function CustomProjectsHero({
  eyebrow,
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  image,
}: CustomProjectsHeroProps) {
  const blobRefs = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const content = contentRef.current;
    const visual = visualRef.current;

    if (content) {
      const children = Array.from(content.children);
      gsap.from(children, {
        y: 42,
        opacity: 0,
        duration: 0.95,
        stagger: 0.08,
        ease: "power3.out",
      });
    }

    if (visual) {
      gsap.from(visual, {
        y: 50,
        opacity: 0,
        duration: 1.1,
        delay: 0.18,
        ease: "power3.out",
      });
    }

    if (prefersReduced) return;

    const rand = gsap.utils.random;

    const animateBlob = (blob: HTMLDivElement) => {
      gsap.to(blob, {
        x: rand(-70, 70),
        y: rand(-60, 60),
        scale: rand(0.92, 1.12),
        rotation: rand(-12, 12),
        duration: rand(9, 15),
        ease: "sine.inOut",
        onComplete: () => animateBlob(blob),
      });
    };

    blobRefs.current.forEach((blob, index) => {
      if (!blob) return;

      gsap.set(blob, { x: 0, y: 0, rotation: 0 });
      gsap.to(blob, {
        x: rand(-36, 36),
        y: rand(-24, 24),
        scale: rand(0.98, 1.04),
        duration: rand(1.2, 2),
        delay: index * 0.08,
        ease: "power2.out",
        onComplete: () => animateBlob(blob),
      });
    });

    return () => {
      blobRefs.current.forEach((blob) => blob && gsap.killTweensOf(blob));
      if (content) gsap.killTweensOf(content.children);
      if (visual) gsap.killTweensOf(visual);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.noise} />

      <div className={styles.background}>
        {[0, 1, 2, 3].map((item, index) => (
          <div
            key={item}
            className={styles.blob}
            ref={(element) => {
              if (element) blobRefs.current[index] = element;
            }}
          />
        ))}
      </div>

      <div className={styles.inner}>
        <div ref={contentRef} className={styles.content}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}

          {title ? <h1 className={styles.title}>{title}</h1> : null}

          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}

          <div className={styles.actions}>
            {primaryLabel && primaryHref ? (
              <Link href={primaryHref} className={styles.primaryLink}>
                {primaryLabel}
              </Link>
            ) : null}

            {secondaryLabel && secondaryHref ? (
              <Link href={secondaryHref} className={styles.secondaryLink}>
                {secondaryLabel}
              </Link>
            ) : null}
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaChip}>Sistemi operativi</span>
            <span className={styles.metaChip}>Logiche su misura</span>
            <span className={styles.metaChip}>Strumenti connessi</span>
          </div>
        </div>

        <div ref={visualRef} className={styles.visual}>
          {image?.asset?.url ? (
            <div className={styles.visualArt}>
              <Image
                src={image.asset.url}
                alt={image.alt || "Custom projects visual"}
                fill
                className={styles.visualImage}
                sizes="(max-width: 960px) 100vw, 42vw"
              />
            </div>
          ) : (
            <div className={styles.visualShell}>
              <div className={styles.visualFrame}>
                <div className={styles.mockup}>
                  <div className={styles.mockupTopbar}>
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className={styles.mockupBody}>
                    <div className={styles.mockupHeroBlock} />

                    <div className={styles.mockupColumns}>
                      <div className={styles.mockupSidebar} />
                      <div className={styles.mockupMain}>
                        <div />
                        <div />
                        <div />
                      </div>
                    </div>

                    <div className={styles.mockupFooterRow}>
                      <div />
                      <div />
                      <div />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.bottomLine} />
    </section>
  );
}