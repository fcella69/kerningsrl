"use client";

import Image from "next/image";
import styles from "./BrandIdentityFeatureImage.module.css";

interface Props {
  image?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
  video?: {
    asset?: {
      url?: string;
    };
  };
}

export default function BrandIdentityFeatureImage({ image, video }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.viewport}>
        {video?.asset?.url ? (
          <video className={styles.video} autoPlay muted loop playsInline>
            <source src={video.asset.url} />
          </video>
        ) : image?.asset?.url ? (
          <Image
            src={image.asset.url}
            alt={image.alt || "Feature media"}
            fill
            className={styles.image}
            sizes="100vw"
          />
        ) : null}
      </div>
    </section>
  );
}