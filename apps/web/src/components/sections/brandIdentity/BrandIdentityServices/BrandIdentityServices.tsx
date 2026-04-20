import type { BrandIdentityServiceItem } from "../types";
import BrandIdentityReveal from "../BrandIdentityReveal/BrandIdentityReveal";
import styles from "./BrandIdentityServices.module.css";

interface BrandIdentityServicesProps {
  title?: string;
  intro?: string;
  items?: BrandIdentityServiceItem[];
}

export default function BrandIdentityServices({
  title,
  intro,
  items = [],
}: BrandIdentityServicesProps) {
  if (!title && !intro && !items.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <BrandIdentityReveal>
          <div className={styles.header}>
            {title ? <h2 className={styles.title}>{title}</h2> : null}
            {intro ? <p className={styles.intro}>{intro}</p> : null}
          </div>
        </BrandIdentityReveal>

        {items.length ? (
          <div className={styles.grid}>
            {items.map((item, index) => (
              <BrandIdentityReveal
                key={item._key || `${item.title}-${index}`}
                delay={index * 0.05}
              >
                <article className={styles.card}>
                  <span className={styles.index}>
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  {item.title ? <h3 className={styles.cardTitle}>{item.title}</h3> : null}
                  {item.text ? <p className={styles.cardText}>{item.text}</p> : null}
                </article>
              </BrandIdentityReveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}