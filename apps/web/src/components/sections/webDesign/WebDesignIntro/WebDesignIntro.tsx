import Image from "next/image";
import type { WebDesignImage } from "../types";
import WebDesignReveal from "../WebDesignReveal/WebDesignReveal";
import styles from "./WebDesignIntro.module.css";

interface WebDesignIntroProps {
  title?: string;
  body?: string;
  image?: WebDesignImage;
}

export default function WebDesignIntro({
  title,
  body,
  image,
}: WebDesignIntroProps) {
  if (!title && !body && !image?.asset?.url) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <WebDesignReveal>
            <div className={styles.copy}>
              {title ? <h2 className={styles.title}>{title}</h2> : null}
              {body ? <p className={styles.body}>{body}</p> : null}
            </div>
          </WebDesignReveal>

          <WebDesignReveal delay={0.1}>
            <div className={styles.visual}>
              <div className={styles.imageFrame}>
                {image?.asset?.url ? (
                  <Image
                    src={image.asset.url}
                    alt={image.alt || "Kerning web design process"}
                    fill
                    className={styles.image}
                    sizes="(max-width: 960px) 100vw, 42vw"
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <div className={styles.placeholderTop} />
                    <div className={styles.placeholderBody}>
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