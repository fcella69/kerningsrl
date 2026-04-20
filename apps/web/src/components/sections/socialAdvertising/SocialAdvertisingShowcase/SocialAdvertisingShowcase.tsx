import Image from "next/image";
import Link from "next/link";
import type { SocialAdvertisingFeaturedProject } from "../types";
import SocialAdvertisingReveal from "../SocialAdvertisingReveal/SocialAdvertisingReveal";
import styles from "./SocialAdvertisingShowcase.module.css";

interface SocialAdvertisingShowcaseProps {
  title?: string;
  text?: string;
  projects?: SocialAdvertisingFeaturedProject[];
}

export default function SocialAdvertisingShowcase({
  title,
  text,
  projects = [],
}: SocialAdvertisingShowcaseProps) {
  if (!title && !text && !projects.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SocialAdvertisingReveal>
          <div className={styles.header}>
            <div className={styles.copy}>
              {title ? <h2 className={styles.title}>{title}</h2> : null}
              {text ? <p className={styles.text}>{text}</p> : null}
            </div>

            <Link href="/portfolio" className={styles.headerLink}>
              Vedi portfolio
            </Link>
          </div>
        </SocialAdvertisingReveal>

        {projects.length ? (
          <div className={styles.grid}>
            {projects.map((project, index) => (
              <SocialAdvertisingReveal
                key={`${project.slug}-${index}`}
                delay={index * 0.07}
              >
                <Link
                  href={project.slug ? `/portfolio/${project.slug}` : "/portfolio"}
                  className={styles.card}
                >
                  <div className={styles.imageWrap}>
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title || "Project preview"}
                        fill
                        className={styles.image}
                        sizes="(max-width: 960px) 100vw, 33vw"
                      />
                    ) : (
                      <div className={styles.imageFallback} />
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    {project.category ? (
                      <span className={styles.category}>{project.category}</span>
                    ) : null}
                    {project.title ? <h3 className={styles.cardTitle}>{project.title}</h3> : null}
                  </div>
                </Link>
              </SocialAdvertisingReveal>
            ))}
          </div>
        ) : (
          <SocialAdvertisingReveal delay={0.08}>
            <div className={styles.emptyState}>
              <p>
                Puoi collegare da Sanity i progetti che vuoi usare come showcase
                di questa pagina, mantenendo così il controllo editoriale anche
                sulla selezione.
              </p>
            </div>
          </SocialAdvertisingReveal>
        )}
      </div>
    </section>
  );
}