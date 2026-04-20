import Image from "next/image";
import Link from "next/link";
import type { SanityImage } from "../types";
import AboutReveal from "../AboutReveal/AboutReveal";
import styles from "./AboutIntroStatement.module.css";

interface AboutIntroStatementProps {
  lead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: SanityImage;
}

export default function AboutIntroStatement({
  lead,
  ctaLabel,
  ctaHref,
  image,
}: AboutIntroStatementProps) {
  if (!lead && !image?.asset?.url) {
    return null;
  }

  return (
    <section id="next-section" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          {lead ? (
            <AboutReveal>
              <p className={styles.lead}>{lead}</p>
            </AboutReveal>
          ) : null}

          {ctaLabel && ctaHref ? (
            <AboutReveal delay={0.08}>
              <Link href={ctaHref} className={styles.link}>
                {ctaLabel}
              </Link>
            </AboutReveal>
          ) : null}
        </div>

        {image?.asset?.url ? (
          <AboutReveal delay={0.12} direction="right">
            <div className={styles.imageWrap}>
              <Image
                src={image.asset.url}
                alt={image.alt || "Kerning intro image"}
                fill
                className={styles.image}
                sizes="(max-width: 980px) 100vw, 42vw"
              />
            </div>
          </AboutReveal>
        ) : null}
      </div>
    </section>
  );
}