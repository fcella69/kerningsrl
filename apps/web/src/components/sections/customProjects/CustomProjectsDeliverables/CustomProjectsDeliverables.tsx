import Image from "next/image";
import type {
  CustomProjectsDeliverable,
  CustomProjectsImage,
} from "../types";
import CustomProjectsReveal from "../CustomProjectsReveal/CustomProjectsReveal";
import styles from "./CustomProjectsDeliverables.module.css";

interface CustomProjectsDeliverablesProps {
  title?: string;
  intro?: string;
  items?: CustomProjectsDeliverable[];
  image?: CustomProjectsImage;
}

export default function CustomProjectsDeliverables({
  title,
  intro,
  items = [],
  image,
}: CustomProjectsDeliverablesProps) {
  if (!title && !intro && !items.length && !image?.asset?.url) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <CustomProjectsReveal>
              <div className={styles.header}>
                {title ? <h2 className={styles.title}>{title}</h2> : null}
                {intro ? <p className={styles.intro}>{intro}</p> : null}
              </div>
            </CustomProjectsReveal>

            {items.length ? (
              <div className={styles.grid}>
                {items.map((item, index) => (
                  <CustomProjectsReveal
                    key={item._key || `${item.label}-${index}`}
                    delay={index * 0.04}
                  >
                    <div className={styles.item}>{item.label}</div>
                  </CustomProjectsReveal>
                ))}
              </div>
            ) : null}
          </div>

          <CustomProjectsReveal delay={0.12}>
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
          </CustomProjectsReveal>
        </div>
      </div>
    </section>
  );
}