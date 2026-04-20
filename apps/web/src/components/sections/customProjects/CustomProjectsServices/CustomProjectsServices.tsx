import type { CustomProjectsServiceItem } from "../types";
import CustomProjectsReveal from "../CustomProjectsReveal/CustomProjectsReveal";
import styles from "./CustomProjectsServices.module.css";

interface CustomProjectsServicesProps {
  title?: string;
  intro?: string;
  items?: CustomProjectsServiceItem[];
}

export default function CustomProjectsServices({
  title,
  intro,
  items = [],
}: CustomProjectsServicesProps) {
  if (!title && !intro && !items.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
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
              </CustomProjectsReveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}