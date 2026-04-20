"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./FullscreenMenu.module.css";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

/* =========================
   TYPES
========================= */

type MenuItem = {
  label?: string;
  link?: string;
};

type SocialItem = {
  label?: string;
  url?: string;
};

type MenuData = {
  menuLeft?: MenuItem[];
  menuRightTitle?: string;
  menuRightTitleLink?: string;
  menuRight?: MenuItem[];
  address?: string;
  bottomTags?: string;
  socials?: SocialItem[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  data?: MenuData;
};

export default function FullscreenMenu({ open, onClose, data }: Props) {
  const [shouldRender, setShouldRender] = useState(open);

  const overlayRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const menuLeft =
    data?.menuLeft?.length
      ? data.menuLeft
      : [
          { label: "Home", link: "/" },
          { label: "Chi siamo", link: "/chi-siamo" },
          { label: "Portfolio", link: "/portfolio" },
          { label: "Contatti", link: "/contatti" },
        ];

  const menuRightTitle = data?.menuRightTitle || "Soluzioni Digitali";
  const menuRightTitleLink = data?.menuRightTitleLink?.trim() || "/soluzioni-digitali";

  const menuRight =
    data?.menuRight?.length
      ? data.menuRight
      : [
          { label: "Web Design", link: "/web-design" },
          { label: "Social & Advertising", link: "/social-advertising" },
          { label: "Brand Identity", link: "/brand-identity" },
          { label: "Progetti Custom", link: "/progetti-custom" },
        ];

  const address = data?.address || "Via Sanremo, 39 · 85100 Potenza (PZ)";
  const bottomTags =
    data?.bottomTags || "Startup · PMI · Brand culturali · Professionisti";

  const socials =
    data?.socials?.length
      ? data.socials
      : [
          { label: "Instagram", url: "#" },
          { label: "Facebook", url: "#" },
          { label: "LinkedIn", url: "#" },
        ];

  useLayoutEffect(() => {
    if (!overlayRef.current) return;

    gsap.set(overlayRef.current, {
      autoAlpha: 0,
      pointerEvents: "none",
    });
  }, []);

  useEffect(() => {
    if (open) setShouldRender(true);
  }, [open]);

  useEffect(() => {
    if (!shouldRender || !overlayRef.current) return;

    tlRef.current?.kill();
    tlRef.current = null;

    const overlay = overlayRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const bottom = bottomRef.current;
    const menuLis = overlay.querySelectorAll("li");

    if (open) {
      gsap.set(overlay, { pointerEvents: "auto" });

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.set(overlay, { autoAlpha: 1 })
        .fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" },
          0
        )
        .from(
          [left, right],
          {
            y: 36,
            opacity: 0,
            duration: 0.85,
            ease: "power4.out",
            stagger: 0.12,
          },
          0.08
        )
        .from(
          menuLis,
          {
            y: 18,
            opacity: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.05,
          },
          0.22
        )
        .from(
          bottom,
          {
            y: 18,
            opacity: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          0.45
        );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, {
            autoAlpha: 0,
            pointerEvents: "none",
          });
          setShouldRender(false);
        },
      });

      tlRef.current = tl;

      tl.to(overlay, {
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
      });
    }

    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, [open, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.container}>
        <nav ref={leftRef} className={styles.left}>
          <ul>
            {menuLeft.map((item, i) => (
              <li key={i}>
                <Link href={item.link || "#"} onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div ref={rightRef} className={styles.right}>
          {menuRightTitleLink ? (
            <Link
              href={menuRightTitleLink}
              className={styles.sectionTitle}
              onClick={onClose}
            >
              {menuRightTitle}
            </Link>
          ) : (
            <span className={styles.sectionTitle}>{menuRightTitle}</span>
          )}

          <ul>
            {menuRight.map((item, i) => (
              <li key={i}>
                <Link href={item.link || "#"} onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div ref={bottomRef} className={styles.bottom}>
        <div className={styles.address}>{address}</div>

        <div className={styles.bottomCenter}>{bottomTags}</div>

        <div className={styles.socials}>
          {socials.map((s, i) => {
            const Icon =
              s.label?.toLowerCase() === "instagram"
                ? FaInstagram
                : s.label?.toLowerCase() === "facebook"
                  ? FaFacebookF
                  : FaLinkedinIn;

            return (
              <a
                key={i}
                href={s.url || "#"}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
              >
                <Icon />
                <span>{s.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      <button
        aria-label="Chiudi menu"
        className={styles.closeArea}
        onClick={onClose}
      />
    </div>
  );
}