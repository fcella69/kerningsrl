import Image from "next/image";
import type {
  BrandIdentityDeliverable,
  BrandIdentityImage,
} from "../types";
import BrandIdentityReveal from "../BrandIdentityReveal/BrandIdentityReveal";
import styles from "./BrandIdentityDeliverables.module.css";

interface BrandIdentityDeliverablesProps {
  title?: string;
  intro?: string;
  items?: BrandIdentityDeliverable[];
  image?: BrandIdentityImage;
}

export default function BrandIdentityDeliverables({
  title,
  intro,
  items = [],
  image,
}: BrandIdentityDeliverablesProps) {
  if (!title && !intro && !items.length && !image?.asset?.url) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.copy}>
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
                    key={item._key || `${item.label}-${index}`}
                    delay={index * 0.04}
                  >
                    <div className={styles.item}>{item.label}</div>
                  </BrandIdentityReveal>
                ))}
              </div>
            ) : null}
          </div>

          <BrandIdentityReveal delay={0.12}>
            <div className={styles.visual}>
              <div className={styles.imageFrame}>
                {image?.asset?.url ? (
                  <Image
                    src={image.asset.url}
                    alt={image.alt || "Deliverables visual"}
                    fill
                    className={styles.image}
                    sizes="(max-width: 960px) 100vw, 40vw"
                  />
                ) : (
                  <div className={styles.fallback}>
                    <div className={styles.fallbackPanel} />
                    <div className={styles.fallbackColumn}>
                      <div />
                      <div />
                      <div />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </BrandIdentityReveal>
        </div>
      </div>
    </section>
  );
}