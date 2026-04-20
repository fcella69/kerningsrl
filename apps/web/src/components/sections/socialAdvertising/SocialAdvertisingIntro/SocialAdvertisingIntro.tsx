import Image from "next/image";
import type { SocialAdvertisingImage } from "../types";
import SocialAdvertisingReveal from "../SocialAdvertisingReveal/SocialAdvertisingReveal";
import styles from "./SocialAdvertisingIntro.module.css";

interface SocialAdvertisingIntroProps {
  title?: string;
  body?: string;
  image?: SocialAdvertisingImage;
}

export default function SocialAdvertisingIntro({
  title,
  body,
  image,
}: SocialAdvertisingIntroProps) {
  if (!title && !body && !image?.asset?.url) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <SocialAdvertisingReveal>
            <div className={styles.copy}>
              {title ? <h2 className={styles.title}>{title}</h2> : null}
              {body ? <p className={styles.body}>{body}</p> : null}
            </div>
          </SocialAdvertisingReveal>

          <SocialAdvertisingReveal delay={0.1}>
            <div className={styles.visual}>
              <div className={styles.imageFrame}>
                {image?.asset?.url ? (
                  <Image
                    src={image.asset.url}
                    alt={image.alt || "Kerning social advertising process"}
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
          </SocialAdvertisingReveal>
        </div>
      </div>
    </section>
  );
}