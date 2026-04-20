"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiOutlineArrowRight, HiOutlineChevronUp } from "react-icons/hi";
import styles from "./Footer.module.css";

type FooterLink = {
  label?: string;
  href?: string;
};

type FooterSocial = {
  label?: string;
  url?: string;
};

type FooterData = {
  logoUrl?: string;
  logoAlt?: string;
  logoLink?: string;
  tagline?: string;
  backToTopLabel?: string;

  contactTitle?: string;
  address?: string;
  phone?: string;
  email?: string;

  navigationTitle?: string;
  navigationLinks?: FooterLink[];

  solutionsTitle?: string;
  solutionsLinks?: FooterLink[];

  socialsTitle?: string;
  socials?: FooterSocial[];

  legalLinks?: FooterLink[];

  copyrightText?: string;
  vatNumber?: string;
};

type FooterProps = {
  data?: FooterData | null;
};

const FALLBACK_NAVIGATION: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contatti", href: "/contatti" },
];

const FALLBACK_SOLUTIONS: FooterLink[] = [
  { label: "Web Design", href: "/web-design" },
  { label: "Social & Advertising", href: "/social-advertising" },
  { label: "Brand Identity", href: "/brand-identity" },
  { label: "Progetti Custom", href: "/progetti-custom" },
];

const FALLBACK_LEGAL: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Termini e Condizioni", href: "/termini-e-condizioni" },
];

const FALLBACK_SOCIALS: FooterSocial[] = [
  { label: "Instagram", url: "#" },
  { label: "Facebook", url: "#" },
  { label: "LinkedIn", url: "#" },
];

function getSocialIcon(label?: string) {
  const key = label?.trim().toLowerCase();

  if (key === "instagram") return FaInstagram;
  if (key === "facebook") return FaFacebookF;
  return FaLinkedinIn;
}

export default function Footer({ data }: FooterProps) {
  const content = useMemo(
    () => ({
      logoUrl: data?.logoUrl?.trim() || "",
      logoAlt: data?.logoAlt?.trim() || "Kerning",
      logoLink: data?.logoLink?.trim() || "/",
      tagline:
        data?.tagline?.trim() ||
        "Progetti digitali costruiti con metodo, visione e precisione.",
      backToTopLabel: data?.backToTopLabel?.trim() || "Torna su",

      contactTitle: data?.contactTitle?.trim() || "Contatti",
      address: data?.address?.trim() || "Via Sanremo, 39 · 85100 Potenza (PZ)",
      phone: data?.phone?.trim() || "+39 000 000 0000",
      email: data?.email?.trim() || "info@kerning.it",

      navigationTitle: data?.navigationTitle?.trim() || "Navigazione",
      navigationLinks:
        data?.navigationLinks?.filter((item) => item?.label || item?.href) ??
        FALLBACK_NAVIGATION,

      solutionsTitle: data?.solutionsTitle?.trim() || "Soluzioni Digitali",
      solutionsLinks:
        data?.solutionsLinks?.filter((item) => item?.label || item?.href) ??
        FALLBACK_SOLUTIONS,

      socialsTitle: data?.socialsTitle?.trim() || "Social",
      socials:
        data?.socials?.filter((item) => item?.label || item?.url) ??
        FALLBACK_SOCIALS,

      legalLinks:
        data?.legalLinks?.filter((item) => item?.label || item?.href) ??
        FALLBACK_LEGAL,

      copyrightText:
        data?.copyrightText?.trim() ||
        "© 2026 Kerning. Tutti i diritti riservati.",
      vatNumber: data?.vatNumber?.trim() || "P.IVA 00000000000",
    }),
    [data]
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.noise} />

      <div className={`container ${styles.inner}`}>
        <div className={styles.topRow}>
          <div className={styles.brandBlock}>
            <Link href={content.logoLink} className={styles.logoLink}>
              {content.logoUrl ? (
                <img
                  src={content.logoUrl}
                  alt={content.logoAlt}
                  className={styles.logo}
                />
              ) : (
                <span className={styles.logoFallback}>Kerning</span>
              )}
            </Link>

            <p className={styles.tagline}>{content.tagline}</p>
          </div>

          <button
            type="button"
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label={content.backToTopLabel}
          >
            <span>{content.backToTopLabel}</span>
            <HiOutlineChevronUp className={styles.backToTopIcon} />
          </button>
        </div>

        <div className={styles.middleRow}>
          <div className={styles.column}>
            <span className={styles.columnTitle}>{content.contactTitle}</span>

            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Indirizzo</span>
                <span className={styles.contactValue}>{content.address}</span>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Telefono</span>
                <a href={`tel:${content.phone}`} className={styles.contactLink}>
                  {content.phone}
                </a>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email</span>
                <a
                  href={`mailto:${content.email}`}
                  className={styles.contactLink}
                >
                  {content.email}
                </a>
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <span className={styles.columnTitle}>{content.navigationTitle}</span>
            <ul className={styles.linkList}>
              {content.navigationLinks.map((item, index) => (
                <li key={`${item.label}-${index}`}>
                  <Link href={item.href?.trim() || "#"} className={styles.textLink}>
                    <span>{item.label}</span>
                    <HiOutlineArrowRight className={styles.linkIcon} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <span className={styles.columnTitle}>{content.solutionsTitle}</span>
            <ul className={styles.linkList}>
              {content.solutionsLinks.map((item, index) => (
                <li key={`${item.label}-${index}`}>
                  <Link href={item.href?.trim() || "#"} className={styles.textLink}>
                    <span>{item.label}</span>
                    <HiOutlineArrowRight className={styles.linkIcon} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <span className={styles.columnTitle}>{content.socialsTitle}</span>

            <div className={styles.socialsColumn}>
              {content.socials.map((item, index) => {
                const Icon = getSocialIcon(item.label);

                return (
                  <a
                    key={`${item.label}-${index}`}
                    href={item.url?.trim() || "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className={styles.socialLink}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.bottomLeft}>
            <span className={styles.metaText}>{content.copyrightText}</span>
            <span className={styles.metaDivider} />
            <span className={styles.metaText}>{content.vatNumber}</span>
          </div>

          <div className={styles.bottomRight}>
            {content.legalLinks.map((item, index) => (
              <Link
                key={`${item.label}-${index}`}
                href={item.href?.trim() || "#"}
                className={styles.legalLink}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}