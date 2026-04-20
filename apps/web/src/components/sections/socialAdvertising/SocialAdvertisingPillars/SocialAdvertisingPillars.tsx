import type { SocialAdvertisingPillarItem } from "../types";
import SocialAdvertisingReveal from "../SocialAdvertisingReveal/SocialAdvertisingReveal";
import styles from "./SocialAdvertisingPillars.module.css";

interface SocialAdvertisingPillarsProps {
  title?: string;
  intro?: string;
  items?: SocialAdvertisingPillarItem[];
}

export default function SocialAdvertisingPillars({
  title,
  intro,
  items = [],
}: SocialAdvertisingPillarsProps) {
  if (!title && !intro && !items.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
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
                key={item._key || `${item.title}-${index}`}
                delay={index * 0.05}
              >
                <article className={styles.card}>
                  {item.title ? <h3 className={styles.cardTitle}>{item.title}</h3> : null}
                  {item.text ? <p className={styles.cardText}>{item.text}</p> : null}
                </article>
              </SocialAdvertisingReveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}