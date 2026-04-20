import Link from "next/link";
import AboutReveal from "../AboutReveal/AboutReveal";
import styles from "./AboutCta.module.css";

interface AboutCtaProps {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function AboutCta({
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: AboutCtaProps) {
  if (!title && !text && !primaryLabel && !secondaryLabel) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <AboutReveal>
          <div className={styles.card}>
            {title ? <h2 className={styles.title}>{title}</h2> : null}
            {text ? <p className={styles.text}>{text}</p> : null}

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
          </div>
        </AboutReveal>
      </div>
    </section>
  );
}