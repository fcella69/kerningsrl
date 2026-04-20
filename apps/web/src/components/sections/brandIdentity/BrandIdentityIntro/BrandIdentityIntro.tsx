import Image from "next/image";
import type { BrandIdentityImage } from "../types";
import BrandIdentityReveal from "../BrandIdentityReveal/BrandIdentityReveal";
import styles from "./BrandIdentityIntro.module.css";

interface BrandIdentityIntroProps {
  title?: string;
  body?: string;
  image?: BrandIdentityImage;
}

export default function BrandIdentityIntro({
  title,
  body,
  image,
}: BrandIdentityIntroProps) {
  if (!title && !body && !image?.asset?.url) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <BrandIdentityReveal>
            <div className={styles.copy}>
              {title ? <h2 className={styles.title}>{title}</h2> : null}
              {body ? <p className={styles.body}>{body}</p> : null}
            </div>
          </BrandIdentityReveal>

          <BrandIdentityReveal delay={0.1}>
            <div className={styles.visual}>
              <div className={styles.imageFrame}>
                {image?.asset?.url ? (
                  <Image
                    src={image.asset.url}
                    alt={image.alt || "Kerning brand identity process"}
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
          </BrandIdentityReveal>
        </div>
      </div>
    </section>
  );
}