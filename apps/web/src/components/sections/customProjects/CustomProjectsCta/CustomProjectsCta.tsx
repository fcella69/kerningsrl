import Link from "next/link";
import CustomProjectsReveal from "../CustomProjectsReveal/CustomProjectsReveal";
import styles from "./CustomProjectsCta.module.css";

interface CustomProjectsCtaProps {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CustomProjectsCta({
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CustomProjectsCtaProps) {
  if (!title && !text && !primaryLabel && !secondaryLabel) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <CustomProjectsReveal>
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
        </CustomProjectsReveal>
      </div>
    </section>
  );
}