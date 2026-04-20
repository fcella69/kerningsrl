"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { ContactSidebarBlock } from "../types";
import styles from "./ContactFormSection.module.css";

type ContactFormSectionProps = {
  title?: string;
  description?: string;
  serviceOptions?: string[];
  sidebarBlocks?: ContactSidebarBlock[];
};

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactFormSection({
  title,
  description,
  serviceOptions = [],
  sidebarBlocks = [],
}: ContactFormSectionProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("company") || ""),
      service: String(formData.get("service") || ""),
      message: String(formData.get("message") || ""),
      privacy: formData.get("privacy") === "on",
      website: String(formData.get("website") || ""),
    };

    setSubmitState("loading");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        success: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        setSubmitState("error");
        setFeedbackMessage(
          result.error || "Invio non riuscito. Riprova tra qualche istante."
        );
        return;
      }

      form.reset();
      setSubmitState("success");
      setFeedbackMessage("Messaggio inviato correttamente. Ti risponderemo al più presto.");
    } catch {
      setSubmitState("error");
      setFeedbackMessage("Si è verificato un errore. Riprova tra qualche istante.");
    }
  }

  return (
    <section className={styles.section} id="contact-form">
      <div className={styles.inner}>
        <div className={styles.formColumn}>
          <div className={styles.sectionHeader}>
            {title ? <h2 className={styles.title}>{title}</h2> : null}
            {description ? <p className={styles.description}>{description}</p> : null}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.honeypot}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className={styles.grid}>
              <label className={styles.field}>
                <span className={styles.label}>Nome e cognome</span>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Il tuo nome"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Email</span>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="nome@email.it"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Azienda / realtà</span>
                <input
                  className={styles.input}
                  type="text"
                  name="company"
                  placeholder="Nome azienda o progetto"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Ambito di interesse</span>
                <select className={styles.select} name="service" defaultValue="">
                  <option value="" disabled>
                    Seleziona un ambito
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className={`${styles.field} ${styles.full}`}>
                <span className={styles.label}>Messaggio</span>
                <textarea
                  className={styles.textarea}
                  name="message"
                  placeholder="Raccontaci il contesto, l’obiettivo e ciò di cui hai bisogno. Anche poche righe vanno benissimo per iniziare."
                  rows={7}
                  required
                />
              </label>
            </div>

            <label className={styles.checkboxRow}>
              <input className={styles.checkbox} type="checkbox" name="privacy" required />
              <span className={styles.checkboxText}>
                Ho letto l’informativa privacy e acconsento al trattamento dei dati.
              </span>
            </label>

            <div className={styles.actions}>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={submitState === "loading"}
              >
                {submitState === "loading" ? "Invio in corso..." : "Invia richiesta"}
              </button>
            </div>

            {feedbackMessage ? (
              <p
                className={
                  submitState === "success"
                    ? styles.feedbackSuccess
                    : styles.feedbackError
                }
              >
                {feedbackMessage}
              </p>
            ) : null}
          </form>
        </div>

        <aside className={styles.sidebar}>
          {sidebarBlocks.map((block, index) => {
            const key = block._key ?? `${block.title}-${index}`;

            return (
              <div className={styles.sidebarCard} key={key}>
                {block.title ? <h3 className={styles.sidebarTitle}>{block.title}</h3> : null}
                {block.text ? <p className={styles.sidebarText}>{block.text}</p> : null}

                {block.ctaLabel && block.ctaHref ? (
                  <a className={styles.sidebarLink} href={block.ctaHref}>
                    {block.ctaLabel}
                  </a>
                ) : null}
              </div>
            );
          })}
        </aside>
      </div>
    </section>
  );
}