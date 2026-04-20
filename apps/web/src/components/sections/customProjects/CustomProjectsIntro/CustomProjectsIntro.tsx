import Image from "next/image";
import type { CustomProjectsImage } from "../types";
import CustomProjectsReveal from "../CustomProjectsReveal/CustomProjectsReveal";
import styles from "./CustomProjectsIntro.module.css";

interface CustomProjectsIntroProps {
  title?: string;
  body?: string;
  image?: CustomProjectsImage;
}

export default function CustomProjectsIntro({
  title,
  body,
  image,
}: CustomProjectsIntroProps) {
  if (!title && !body && !image?.asset?.url) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <CustomProjectsReveal>
            <div className={styles.copy}>
              {title ? <h2 className={styles.title}>{title}</h2> : null}
              {body ? <p className={styles.body}>{body}</p> : null}
            </div>
          </CustomProjectsReveal>

          <CustomProjectsReveal delay={0.1}>
            <div className={styles.visual}>
              <div className={styles.imageFrame}>
                {image?.asset?.url ? (
                  <Image
                    src={image.asset.url}
                    alt={image.alt || "Kerning custom projects process"}
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
          </CustomProjectsReveal>
        </div>
      </div>
    </section>
  );
}