"use client";

import Image from "next/image";
import styles from "./CustomProjectsFeatureImage.module.css";

interface Props {
  image?: {
    asset?: {
      url?: string;
    };
    alt?: string;
    mobileUrl?: string;
    mobileAlt?: string;
  };
  video?: {
    asset?: {
      url?: string;
    };
    mobileUrl?: string;
  };
}

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
      <div className={styles.mediaLayer}>
        <video
          className={styles.video}
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
      <div className={styles.mediaLayer}>
        <Image
          src={imageUrl}
          alt={imageAlt || "Feature media"}
          fill
          className={styles.image}
          sizes="100vw"
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

export default function CustomProjectsFeatureImage({ image, video }: Props) {
  const desktopVideoUrl = video?.asset?.url?.trim();
  const desktopImageUrl = image?.asset?.url?.trim();
  const desktopImageAlt = image?.alt?.trim() || "Feature media";

  const mobileVideoUrl = video?.mobileUrl?.trim();
  const mobileImageUrl = image?.mobileUrl?.trim();
  const mobileImageAlt = image?.mobileAlt?.trim() || desktopImageAlt;

  return (
    <section className={styles.section}>
      <div className={styles.desktopViewport}>
        <MediaSlot
          videoUrl={desktopVideoUrl || mobileVideoUrl}
          imageUrl={desktopVideoUrl ? undefined : desktopImageUrl || mobileImageUrl}
          imageAlt={desktopImageAlt}
        />
      </div>

      <div className={styles.mobileViewport}>
        <MediaSlot
          videoUrl={mobileVideoUrl || desktopVideoUrl}
          imageUrl={mobileVideoUrl ? undefined : mobileImageUrl || desktopImageUrl}
          imageAlt={mobileImageAlt}
        />
      </div>
    </section>
  );
}