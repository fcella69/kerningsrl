import Link from "next/link";
import SocialAdvertisingReveal from "../SocialAdvertisingReveal/SocialAdvertisingReveal";
import styles from "./SocialAdvertisingCta.module.css";

interface SocialAdvertisingCtaProps {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function SocialAdvertisingCta({
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: SocialAdvertisingCtaProps) {
  if (!title && !text && !primaryLabel && !secondaryLabel) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SocialAdvertisingReveal>
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
        </SocialAdvertisingReveal>
      </div>
    </section>
  );
}