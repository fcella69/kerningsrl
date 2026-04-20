import styles from "./ContactCta.module.css";

type ContactCtaProps = {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function ContactCta({
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: ContactCtaProps) {
  if (!title && !text && !primaryLabel && !secondaryLabel) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.panel}>
          <div className={styles.copy}>
            {title ? <h2 className={styles.title}>{title}</h2> : null}
            {text ? <p className={styles.text}>{text}</p> : null}
          </div>

          {(primaryLabel && primaryHref) || (secondaryLabel && secondaryHref) ? (
            <div className={styles.actions}>
              {primaryLabel && primaryHref ? (
                <a className={styles.primaryButton} href={primaryHref}>
                  {primaryLabel}
                </a>
              ) : null}

              {secondaryLabel && secondaryHref ? (
                <a className={styles.secondaryButton} href={secondaryHref}>
                  {secondaryLabel}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}