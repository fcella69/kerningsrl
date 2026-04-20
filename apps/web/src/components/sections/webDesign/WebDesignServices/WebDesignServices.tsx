import type { WebDesignServiceItem } from "../types";
import WebDesignReveal from "../WebDesignReveal/WebDesignReveal";
import styles from "./WebDesignServices.module.css";

interface WebDesignServicesProps {
  title?: string;
  intro?: string;
  items?: WebDesignServiceItem[];
}

export default function WebDesignServices({
  title,
  intro,
  items = [],
}: WebDesignServicesProps) {
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
                  <span className={styles.index}>
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
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