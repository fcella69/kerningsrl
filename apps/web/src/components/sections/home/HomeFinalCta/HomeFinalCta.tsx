import Link from "next/link";

import type { HomeFinalCtaData } from "../types";
import styles from "./HomeFinalCta.module.css";

type HomeFinalCtaProps = {
  data?: HomeFinalCtaData;
};

export default function HomeFinalCta({ data }: HomeFinalCtaProps) {
  const eyebrow = data?.eyebrow?.trim() || "Contatti";
  const title =
    data?.title?.trim() ||
    "Se vuoi costruire qualcosa di solido, possiamo iniziare da qui.";
  const text =
    data?.text?.trim() ||
    "Che si tratti di branding, web, contenuti o progetti custom, il primo passo è capire bene dove vuoi arrivare.";
  const primaryLabel = data?.primaryLabel?.trim() || "Contattaci";
  const primaryHref = data?.primaryHref?.trim() || "/contatti";
  const secondaryLabel =
    data?.secondaryLabel?.trim() || "Scopri i servizi";
  const secondaryHref =
    data?.secondaryHref?.trim() || "/soluzioni-digitali";

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.text}>{text}</p>

          <div className={styles.actions}>
            <Link href={primaryHref} className={styles.primaryCta}>
              {primaryLabel}
            </Link>

            <Link href={secondaryHref} className={styles.secondaryCta}>
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}