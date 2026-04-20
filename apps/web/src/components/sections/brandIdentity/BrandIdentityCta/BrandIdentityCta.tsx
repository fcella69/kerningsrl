import Link from "next/link";
import BrandIdentityReveal from "../BrandIdentityReveal/BrandIdentityReveal";
import styles from "./BrandIdentityCta.module.css";

interface BrandIdentityCtaProps {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function BrandIdentityCta({
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: BrandIdentityCtaProps) {
  if (!title && !text && !primaryLabel && !secondaryLabel) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <BrandIdentityReveal>
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
        </BrandIdentityReveal>
      </div>
    </section>
  );
}