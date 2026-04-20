import type { WebDesignPillarItem } from "../types";
import WebDesignReveal from "../WebDesignReveal/WebDesignReveal";
import styles from "./WebDesignPillars.module.css";

interface WebDesignPillarsProps {
  title?: string;
  intro?: string;
  items?: WebDesignPillarItem[];
}

export default function WebDesignPillars({
  title,
  intro,
  items = [],
}: WebDesignPillarsProps) {
  if (!title && !intro && !items.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
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
                key={item._key || `${item.title}-${index}`}
                delay={index * 0.05}
              >
                <article className={styles.card}>
                  {item.title ? <h3 className={styles.cardTitle}>{item.title}</h3> : null}
                  {item.text ? <p className={styles.cardText}>{item.text}</p> : null}
                </article>
              </WebDesignReveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}