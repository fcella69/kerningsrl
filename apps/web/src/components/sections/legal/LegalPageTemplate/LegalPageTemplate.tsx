import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { ReactNode } from "react";
import styles from "./LegalPageTemplate.module.css";

type LegalPageTemplateProps = {
  eyebrow?: string;
  title?: string;
  introText?: string;
  content?: PortableTextBlock[];
  children?: ReactNode;
};

export default function LegalPageTemplate({
  eyebrow,
  title,
  introText,
  content,
  children,
}: LegalPageTemplateProps) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.background}>
          <span className={styles.blob} />
          <span className={styles.blob} />
          <span className={styles.blob} />
        </div>

        <div className={styles.noise} />

        <div className={`container ${styles.heroInner}`}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          {title ? <h1 className={styles.title}>{title}</h1> : null}
          {introText ? <p className={styles.intro}>{introText}</p> : null}
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={`container ${styles.contentInner}`}>
          <div className={styles.contentCard}>
            {content?.length ? (
              <div className={styles.richText}>
                <PortableText value={content} />
              </div>
            ) : null}

            {children ? <div className={styles.extraSection}>{children}</div> : null}
          </div>
        </div>
      </section>
    </main>
  );
}