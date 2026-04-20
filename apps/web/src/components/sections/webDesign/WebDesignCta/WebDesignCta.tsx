import Link from "next/link";
import WebDesignReveal from "../WebDesignReveal/WebDesignReveal";
import styles from "./WebDesignCta.module.css";

interface WebDesignCtaProps {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function WebDesignCta({
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: WebDesignCtaProps) {
  if (!title && !text && !primaryLabel && !secondaryLabel) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <WebDesignReveal>
          <div className={styles.card}>
            <div className={styles.copy}>
              {title ? <h2 className={styles.title}>{title}</h2> : null}
              {text ? <p className={styles.text}>{text}</p> : null}
            </div>

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
        </WebDesignReveal>
      </div>
    </section>
  );
}