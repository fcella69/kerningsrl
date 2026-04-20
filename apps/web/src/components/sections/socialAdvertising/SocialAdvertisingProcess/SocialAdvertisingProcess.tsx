import type { SocialAdvertisingProcessStep } from "../types";
import SocialAdvertisingReveal from "../SocialAdvertisingReveal/SocialAdvertisingReveal";
import styles from "./SocialAdvertisingProcess.module.css";

interface SocialAdvertisingProcessProps {
  title?: string;
  intro?: string;
  steps?: SocialAdvertisingProcessStep[];
}

export default function SocialAdvertisingProcess({
  title,
  intro,
  steps = [],
}: SocialAdvertisingProcessProps) {
  if (!title && !intro && !steps.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SocialAdvertisingReveal>
          <div className={styles.header}>
            {title ? <h2 className={styles.title}>{title}</h2> : null}
            {intro ? <p className={styles.intro}>{intro}</p> : null}
          </div>
        </SocialAdvertisingReveal>

        {steps.length ? (
          <div className={styles.timeline}>
            {steps.map((step, index) => (
              <SocialAdvertisingReveal
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
              </SocialAdvertisingReveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}