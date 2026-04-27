import Image from "next/image";
import type { HomeFeatureMediaData } from "../types";
import styles from "./FeatureMedia.module.css";

type ResponsiveHomeFeatureMediaData = HomeFeatureMediaData & {
  mobileVideoUrl?: string;
  mobileImageUrl?: string;
  mobileImageAlt?: string;
};

type FeatureMediaProps = {
  media?: HomeFeatureMediaData;
};

function MediaSlot({
  videoUrl,
  imageUrl,
  imageAlt,
}: {
  videoUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
}) {
  if (videoUrl) {
    return (
      <div className={styles.mediaSlot}>
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
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className={styles.mediaSlot}>
        <Image
          src={imageUrl}
          alt={imageAlt || "Kerning feature media"}
          fill
          className={styles.media}
          sizes="100vw"
          priority
        />
      </div>
    );
  }

  return (
    <div className={styles.placeholder}>
      <div className={styles.placeholderInner}>
        <span className={styles.placeholderLabel}>Kerning</span>
      </div>
    </div>
  );
}

export default function FeatureMedia({ media }: FeatureMediaProps) {
  const data = media as ResponsiveHomeFeatureMediaData | undefined;

  const desktopVideoUrl = data?.videoUrl?.trim();
  const desktopImageUrl = data?.imageUrl?.trim();
  const desktopImageAlt = data?.imageAlt?.trim() || "Kerning feature media";

  const mobileVideoUrl = data?.mobileVideoUrl?.trim();
  const mobileImageUrl = data?.mobileImageUrl?.trim();
  const mobileImageAlt =
    data?.mobileImageAlt?.trim() || desktopImageAlt;

  return (
    <section id="next-section" className={styles.section}>
      <div className={styles.desktopFrame}>
        <MediaSlot
          videoUrl={desktopVideoUrl || mobileVideoUrl}
          imageUrl={desktopVideoUrl ? undefined : desktopImageUrl || mobileImageUrl}
          imageAlt={desktopImageAlt}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.mobileFrame}>
        <MediaSlot
          videoUrl={mobileVideoUrl || desktopVideoUrl}
          imageUrl={mobileVideoUrl ? undefined : mobileImageUrl || desktopImageUrl}
          imageAlt={mobileImageAlt}
        />
        <div className={styles.overlay} />
      </div>
    </section>
  );
}