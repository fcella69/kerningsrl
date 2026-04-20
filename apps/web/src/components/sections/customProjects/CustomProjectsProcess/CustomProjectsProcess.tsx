import type { CustomProjectsProcessStep } from "../types";
import CustomProjectsReveal from "../CustomProjectsReveal/CustomProjectsReveal";
import styles from "./CustomProjectsProcess.module.css";

interface CustomProjectsProcessProps {
  title?: string;
  intro?: string;
  steps?: CustomProjectsProcessStep[];
}

export default function CustomProjectsProcess({
  title,
  intro,
  steps = [],
}: CustomProjectsProcessProps) {
  if (!title && !intro && !steps.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <CustomProjectsReveal>
          <div className={styles.header}>
            {title ? <h2 className={styles.title}>{title}</h2> : null}
            {intro ? <p className={styles.intro}>{intro}</p> : null}
          </div>
        </CustomProjectsReveal>

        {steps.length ? (
          <div className={styles.timeline}>
            {steps.map((step, index) => (
              <CustomProjectsReveal
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
              </CustomProjectsReveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}