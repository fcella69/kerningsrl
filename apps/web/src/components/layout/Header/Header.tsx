"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import FullscreenMenu from "./FullscreenMenu";

type HeaderMenuItem = {
  label?: string;
  link?: string;
};

type HeaderSocial = {
  label?: string;
  url?: string;
};

type HeaderSanityData = {
  logo?: {
    asset?: {
      url?: string;
    };
  };
  menuLeft?: HeaderMenuItem[];
  menuRightTitle?: string;
  menuRight?: HeaderMenuItem[];
  address?: string;
  bottomTags?: string;
  socials?: HeaderSocial[];
};

type HeaderProps = {
  data?: HeaderSanityData | null;
};

export default function Header({ data }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // inizializza subito
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fallback robusti se Sanity non ha ancora contenuti
  const headerContent = useMemo(() => {
    const menuLeft =
      data?.menuLeft?.length
        ? data.menuLeft
        : [
            { label: "Home", link: "/" },
            { label: "Chi siamo", link: "/chi-siamo" },
            { label: "Portfolio", link: "/portfolio" },
            { label: "Contatti", link: "/contatti" },
          ];

    const menuRightTitle = data?.menuRightTitle || "Comunicazione";

    const menuRight =
      data?.menuRight?.length
        ? data.menuRight
        : [
            { label: "Branding", link: "/comunicazione/branding" },
            { label: "Web Design", link: "/comunicazione/web-design" },
            { label: "Gestione Social", link: "/comunicazione/social" },
            { label: "Fotografia", link: "/comunicazione/fotografia" },
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

    const sanityLogoUrl = data?.logo?.asset?.url;

    return {
      menuLeft,
      menuRightTitle,
      menuRight,
      address,
      bottomTags,
      socials,
      sanityLogoUrl,
    };
  }, [data]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          {/* LOGO */}
          <div className={styles.logo}>
             <Link href="/" aria-label="Vai alla homepage">
            {headerContent.sanityLogoUrl ? (
              // URL remoto da Sanity
              <Image
                src={headerContent.sanityLogoUrl}
                alt="Kerning Digital Studio"
                width={140}
                height={36}
                priority
              />
            ) : (
              // Fallback locale
              <Image
                src="/logo-kerning.png"
                alt="Kerning Digital Studio"
                width={140}
                height={36}
                priority
              />
            )}
            </Link>
          </div>

          {/* RIGHT ACTIONS */}
          <div className={styles.actions}>
            {/* DESKTOP CTA */}
            <a href="/contatti" className={styles.cta}>
              CONTATTACI
            </a>

            {/* MENU */}
            <button
              className={`${styles.menuButton} ${
                menuOpen ? styles.menuOpen : ""
              }`}
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={styles.menuText}>Menu</span>

              <span className={styles.menuIcon}>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN MENU */}
      <FullscreenMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        data={{
          menuLeft: headerContent.menuLeft,
          menuRightTitle: headerContent.menuRightTitle,
          menuRight: headerContent.menuRight,
          address: headerContent.address,
          bottomTags: headerContent.bottomTags,
          socials: headerContent.socials,
        }}
      />
    </>
  );
}
