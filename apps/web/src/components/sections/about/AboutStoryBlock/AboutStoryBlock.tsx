import Image from "next/image";
import type { SanityImage } from "../types";
import AboutReveal from "../AboutReveal/AboutReveal";
import styles from "./AboutStoryBlock.module.css";

interface AboutStoryBlockProps {
  title?: string;
  body?: string;
  image?: SanityImage;
  reverse?: boolean;
}

export default function AboutStoryBlock({
  title,
  body,
  image,
  reverse = false,
}: AboutStoryBlockProps) {
  if (!title && !body && !image?.asset?.url) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.top} ${reverse ? styles.reverse : ""}`}>
          <AboutReveal direction={reverse ? "right" : "left"}>
            <h2 className={styles.title}>{title}</h2>
          </AboutReveal>

          <AboutReveal delay={0.08} direction={reverse ? "left" : "right"}>
            <p className={styles.body}>{body}</p>
          </AboutReveal>
        </div>

        {image?.asset?.url ? (
          <AboutReveal delay={0.14}>
            <div className={styles.imageWrap}>
              <Image
                src={image.asset.url}
                alt={image.alt || title || "Kerning story image"}
                fill
                className={styles.image}
                sizes="100vw"
              />
            </div>
          </AboutReveal>
        ) : null}
      </div>
    </section>
  );
}