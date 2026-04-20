import Image from "next/image";
import type {
  SocialAdvertisingDeliverable,
  SocialAdvertisingImage,
} from "../types";
import SocialAdvertisingReveal from "../SocialAdvertisingReveal/SocialAdvertisingReveal";
import styles from "./SocialAdvertisingDeliverables.module.css";

interface SocialAdvertisingDeliverablesProps {
  title?: string;
  intro?: string;
  items?: SocialAdvertisingDeliverable[];
  image?: SocialAdvertisingImage;
}

export default function SocialAdvertisingDeliverables({
  title,
  intro,
  items = [],
  image,
}: SocialAdvertisingDeliverablesProps) {
  if (!title && !intro && !items.length && !image?.asset?.url) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <SocialAdvertisingReveal>
              <div className={styles.header}>
                {title ? <h2 className={styles.title}>{title}</h2> : null}
                {intro ? <p className={styles.intro}>{intro}</p> : null}
              </div>
            </SocialAdvertisingReveal>

            {items.length ? (
              <div className={styles.grid}>
                {items.map((item, index) => (
                  <SocialAdvertisingReveal
                    key={item._key || `${item.label}-${index}`}
                    delay={index * 0.04}
                  >
                    <div className={styles.item}>{item.label}</div>
                  </SocialAdvertisingReveal>
                ))}
              </div>
            ) : null}
          </div>

          <SocialAdvertisingReveal delay={0.12}>
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
          </SocialAdvertisingReveal>
        </div>
      </div>
    </section>
  );
}