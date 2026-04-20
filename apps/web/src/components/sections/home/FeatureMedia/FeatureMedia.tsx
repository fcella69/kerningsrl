import type { HomeFeatureMediaData } from "../types";
import styles from "./FeatureMedia.module.css";

type FeatureMediaProps = {
  media?: HomeFeatureMediaData;
};

export default function FeatureMedia({ media }: FeatureMediaProps) {
  const videoUrl = media?.videoUrl?.trim();
  const imageUrl = media?.imageUrl?.trim();
  const imageAlt = media?.imageAlt?.trim() || "Kerning feature media";

  return (
    <section id="next-section" className={styles.section}>
      <div className={styles.frame}>
        {videoUrl ? (
          <video
            className={styles.media}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={videoUrl} />
          </video>
        ) : imageUrl ? (
          <img className={styles.media} src={imageUrl} alt={imageAlt} />
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.placeholderInner}>
              <span className={styles.placeholderLabel}>Kerning</span>
            </div>
          </div>
        )}

        <div className={styles.overlay} />
      </div>
    </section>
  );
}