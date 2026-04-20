import Image from "next/image";
import Link from "next/link";
import type { PartnerLogo } from "../types";
import AboutReveal from "../AboutReveal/AboutReveal";
import styles from "./AboutPartners.module.css";

interface AboutPartnersProps {
  title?: string;
  logos?: PartnerLogo[];
}

export default function AboutPartners({
  title,
  logos = [],
}: AboutPartnersProps) {
  const validLogos = logos.filter((item) => item?.image?.asset?.url);

  if (!title && validLogos.length === 0) {
    return null;
  }

  const duplicated = [...validLogos, ...validLogos];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {title ? (
          <AboutReveal>
            <div className={styles.header}>
              <h2 className={styles.title}>{title}</h2>
            </div>
          </AboutReveal>
        ) : null}

        {validLogos.length > 0 ? (
          <AboutReveal delay={0.08}>
            <div className={styles.marquee}>
              <div className={styles.track}>
                {duplicated.map((item, index) => {
                  const content = (
                    <div className={styles.logoCard}>
                      <Image
                        src={item.image!.asset!.url!}
                        alt={item.image?.alt || item.name || "Partner logo"}
                        fill
                        className={styles.logo}
                        sizes="200px"
                      />
                    </div>
                  );

                  return item.link ? (
                    <Link
                      key={`${item._key ?? item.name ?? "logo"}-${index}`}
                      href={item.link}
                      className={styles.logoLink}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div
                      key={`${item._key ?? item.name ?? "logo"}-${index}`}
                      className={styles.logoLink}
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </AboutReveal>
        ) : null}
      </div>
    </section>
  );
}