import Image from "next/image";
import type { WebDesignDeliverable, WebDesignImage } from "../types";
import WebDesignReveal from "../WebDesignReveal/WebDesignReveal";
import styles from "./WebDesignDeliverables.module.css";

interface WebDesignDeliverablesProps {
  title?: string;
  intro?: string;
  items?: WebDesignDeliverable[];
  image?: WebDesignImage;
}

export default function WebDesignDeliverables({
  title,
  intro,
  items = [],
  image,
}: WebDesignDeliverablesProps) {
  if (!title && !intro && !items.length && !image?.asset?.url) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <WebDesignReveal>
              <div className={styles.header}>
                {title ? <h2 className={styles.title}>{title}</h2> : null}
                {intro ? <p className={styles.intro}>{intro}</p> : null}
              </div>
            </WebDesignReveal>

            {items.length ? (
              <div className={styles.grid}>
                {items.map((item, index) => (
                  <WebDesignReveal
                    key={item._key || `${item.label}-${index}`}
                    delay={index * 0.04}
                  >
                    <div className={styles.item}>{item.label}</div>
                  </WebDesignReveal>
                ))}
              </div>
            ) : null}
          </div>

          <WebDesignReveal delay={0.12}>
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
          </WebDesignReveal>
        </div>
      </div>
    </section>
  );
}