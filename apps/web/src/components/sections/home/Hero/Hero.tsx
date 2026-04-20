"use client";

import { useEffect, useMemo, useRef } from "react";
import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineArrowDown } from "react-icons/hi";
import gsap from "gsap";

import type { HomeHeroData } from "../types";
import styles from "./Hero.module.css";

type HeroProps = {
  hero?: HomeHeroData;
};

const FALLBACK: Required<
  Pick<HomeHeroData, "fixedWord" | "rotatingWords" | "ctaLabel" | "address">
> & {
  socials: { label: string; url: string }[];
} = {
  fixedWord: "siamo",
  rotatingWords: ["strateghi", "designer", "creator"],
  ctaLabel: "Scopri di più",
  address: "Via Sanremo, 39 · 85100 Potenza (PZ)",
  socials: [
    { label: "Facebook", url: "#" },
    { label: "Instagram", url: "#" },
    { label: "LinkedIn", url: "#" },
  ],
};

const SOCIAL_ICONS: Record<string, IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
};

function getSocialIcon(label?: string) {
  const key = label?.trim().toLowerCase() ?? "";
  return SOCIAL_ICONS[key] ?? null;
}

export default function Hero({ hero }: HeroProps) {
  const data = useMemo(() => {
    const rotatingWords =
      hero?.rotatingWords?.map((word) => String(word).trim()).filter(Boolean) ??
      [];

    const socials =
      hero?.socials
        ?.map((item) => ({
          label: item?.label?.trim() || "",
          url: item?.url?.trim() || "",
        }))
        .filter((item) => item.label && item.url) ?? [];

    return {
      fixedWord: hero?.fixedWord?.trim() || FALLBACK.fixedWord,
      rotatingWords: rotatingWords.length ? rotatingWords : FALLBACK.rotatingWords,
      ctaLabel: hero?.ctaLabel?.trim() || FALLBACK.ctaLabel,
      address: hero?.address?.trim() || FALLBACK.address,
      socials: socials.length ? socials : FALLBACK.socials,
    };
  }, [hero]);

  const titleWordsRef = useRef<HTMLSpanElement[]>([]);
  const rotatingWordRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement[]>([]);
  const scrollBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const titleEls = titleWordsRef.current.filter(Boolean);

    if (titleEls.length) {
      gsap.from(titleEls, {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.2,
      });
    }

    const rotatingWords = data.rotatingWords;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseTimeout: ReturnType<typeof setTimeout> | null = null;

    const type = () => {
      const el = rotatingWordRef.current;
      if (!el) return;

      const current = rotatingWords[wordIndex] ?? "";

      if (!isDeleting) {
        charIndex += 1;
        el.textContent = current.slice(0, charIndex);

        if (charIndex === current.length) {
          if (pauseTimeout) clearTimeout(pauseTimeout);
          pauseTimeout = setTimeout(() => {
            isDeleting = true;
          }, 1200);
        }
      } else {
        charIndex -= 1;
        el.textContent = current.slice(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % rotatingWords.length;
        }
      }
    };

    const typingInterval = window.setInterval(type, 80);

    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut",
    });

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const random = gsap.utils.random;

    const computeRange = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      return {
        x: width * 1.1,
        y: height,
      };
    };

    const animateBlob = (blob: HTMLDivElement) => {
      if (prefersReducedMotion) return;

      const { x, y } = computeRange();
      const isQuick = Math.random() < 0.28;
      const duration = isQuick ? random(1.8, 3.2) : random(6.5, 14.5);
      const ease = isQuick ? "power2.out" : "sine.inOut";

      gsap.to(blob, {
        x: random(-x, x),
        y: random(-y, y),
        scale: random(0.75, 1.35),
        rotation: random(-25, 25),
        duration,
        ease,
        onComplete: () => animateBlob(blob),
      });
    };

    blobsRef.current.forEach((blob, index) => {
      if (!blob) return;

      gsap.set(blob, { x: 0, y: 0, rotation: 0 });

      gsap.to(blob, {
        x: random(-120, 120),
        y: random(-120, 120),
        scale: random(0.9, 1.15),
        duration: random(1.2, 2.6),
        ease: "power2.out",
        delay: index * 0.06,
        onComplete: () => animateBlob(blob),
      });
    });

    const glow = mouseGlowRef.current;
    const quickX = glow
      ? gsap.quickTo(glow, "x", { duration: 0.25, ease: "power3.out" })
      : null;
    const quickY = glow
      ? gsap.quickTo(glow, "y", { duration: 0.25, ease: "power3.out" })
      : null;

    const handleMouseMove = (event: MouseEvent) => {
      if (!glow || !quickX || !quickY) return;
      quickX(event.clientX);
      quickY(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const button = scrollBtnRef.current;
    let removeMagnet = () => {};

    if (button) {
      const strength = 18;

      const onMove = (event: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);

        gsap.to(button, {
          x: dx / strength,
          y: dy / strength,
          duration: 0.28,
          ease: "power3.out",
        });
      };

      const onLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: "elastic.out(1, 0.35)",
        });
      };

      button.addEventListener("mousemove", onMove);
      button.addEventListener("mouseleave", onLeave);

      removeMagnet = () => {
        button.removeEventListener("mousemove", onMove);
        button.removeEventListener("mouseleave", onLeave);
      };
    }

    return () => {
      window.clearInterval(typingInterval);
      if (pauseTimeout) clearTimeout(pauseTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      removeMagnet();

      blobsRef.current.forEach((blob) => blob && gsap.killTweensOf(blob));
      if (glow) gsap.killTweensOf(glow);
    };
  }, [data.rotatingWords.join("|")]);

  const scrollNext = () => {
    document.querySelector("#next-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.noise} />

      <div className={styles.background}>
        {[0, 1, 2, 3].map((_, index) => (
          <div
            key={index}
            className={styles.blob}
            ref={(element) => {
              if (element) blobsRef.current[index] = element;
            }}
          />
        ))}
      </div>

      <div ref={mouseGlowRef} className={styles.mouseGlow} />

      <div className={styles.content}>
        <h1 className={styles.title}>
          <span
            className={styles.word}
            ref={(element) => {
              if (element) titleWordsRef.current[0] = element;
            }}
          >
            {data.fixedWord}
          </span>
          <br />
          <span className={styles.typing}>
            <span ref={rotatingWordRef} />
            <span ref={cursorRef} className={styles.cursor}>
              /
            </span>
          </span>
        </h1>
      </div>

      <div className={styles.heroFooter}>
        <div className={styles.address}>{data.address}</div>

        <button
          ref={scrollBtnRef}
          onClick={scrollNext}
          className={styles.scrollButton}
          type="button"
        >
          <span>{data.ctaLabel}</span>
          <HiOutlineArrowDown className={styles.scrollIcon} />
        </button>

        <div className={styles.socials}>
          {data.socials.map((social) => {
            const Icon = getSocialIcon(social.label);

            return (
              <a
                key={`${social.label}-${social.url}`}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
              >
                {Icon ? <Icon /> : null}
                <span>{social.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}