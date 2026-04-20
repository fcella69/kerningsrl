import Image from "next/image";
import Link from "next/link";
import type { CustomProjectsFeaturedProject } from "../types";
import CustomProjectsReveal from "../CustomProjectsReveal/CustomProjectsReveal";
import styles from "./CustomProjectsShowcase.module.css";

interface CustomProjectsShowcaseProps {
  title?: string;
  text?: string;
  projects?: CustomProjectsFeaturedProject[];
}

export default function CustomProjectsShowcase({
  title,
  text,
  projects = [],
}: CustomProjectsShowcaseProps) {
  if (!title && !text && !projects.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <CustomProjectsReveal>
          <div className={styles.header}>
            <div className={styles.copy}>
              {title ? <h2 className={styles.title}>{title}</h2> : null}
              {text ? <p className={styles.text}>{text}</p> : null}
            </div>

            <Link href="/portfolio" className={styles.headerLink}>
              Vedi portfolio
            </Link>
          </div>
        </CustomProjectsReveal>

        {projects.length ? (
          <div className={styles.grid}>
            {projects.map((project, index) => (
              <CustomProjectsReveal
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
              </CustomProjectsReveal>
            ))}
          </div>
        ) : (
          <CustomProjectsReveal delay={0.08}>
            <div className={styles.emptyState}>
              <p>
                Puoi collegare da Sanity i progetti che vuoi usare come showcase
                di questa pagina, mantenendo così il controllo editoriale anche
                sulla selezione.
              </p>
            </div>
          </CustomProjectsReveal>
        )}
      </div>
    </section>
  );
}