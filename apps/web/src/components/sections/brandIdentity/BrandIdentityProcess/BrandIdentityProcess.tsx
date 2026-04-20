import type { BrandIdentityProcessStep } from "../types";
import BrandIdentityReveal from "../BrandIdentityReveal/BrandIdentityReveal";
import styles from "./BrandIdentityProcess.module.css";

interface BrandIdentityProcessProps {
  title?: string;
  intro?: string;
  steps?: BrandIdentityProcessStep[];
}

export default function BrandIdentityProcess({
  title,
  intro,
  steps = [],
}: BrandIdentityProcessProps) {
  if (!title && !intro && !steps.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <BrandIdentityReveal>
          <div className={styles.header}>
            {title ? <h2 className={styles.title}>{title}</h2> : null}
            {intro ? <p className={styles.intro}>{intro}</p> : null}
          </div>
        </BrandIdentityReveal>

        {steps.length ? (
          <div className={styles.timeline}>
            {steps.map((step, index) => (
              <BrandIdentityReveal
                key={step._key || `${step.numberLabel}-${index}`}
                delay={index * 0.06}
              >
                <article className={styles.step}>
                  <div className={styles.stepLine} />
                  <div className={styles.stepNumber}>
                    {step.numberLabel || (index + 1).toString().padStart(2, "0")}
                  </div>
                  <div className={styles.stepContent}>
                    {step.title ? <h3 className={styles.stepTitle}>{step.title}</h3> : null}
                    {step.text ? <p className={styles.stepText}>{step.text}</p> : null}
                  </div>
                </article>
              </BrandIdentityReveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}