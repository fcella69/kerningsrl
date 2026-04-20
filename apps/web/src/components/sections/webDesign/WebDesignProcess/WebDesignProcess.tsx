import type { WebDesignProcessStep } from "../types";
import WebDesignReveal from "../WebDesignReveal/WebDesignReveal";
import styles from "./WebDesignProcess.module.css";

interface WebDesignProcessProps {
  title?: string;
  intro?: string;
  steps?: WebDesignProcessStep[];
}

export default function WebDesignProcess({
  title,
  intro,
  steps = [],
}: WebDesignProcessProps) {
  if (!title && !intro && !steps.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <WebDesignReveal>
          <div className={styles.header}>
            {title ? <h2 className={styles.title}>{title}</h2> : null}
            {intro ? <p className={styles.intro}>{intro}</p> : null}
          </div>
        </WebDesignReveal>

        {steps.length ? (
          <div className={styles.timeline}>
            {steps.map((step, index) => (
              <WebDesignReveal
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
              </WebDesignReveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}