"use client";

import { useEffect, useState } from "react";
import styles from "./SplashScreen.module.css";

const ICON_SRC = "/logo-icon.png";
const WORDMARK_SRC = "/testo-kerning.png";

const SHOW_DURATION = 1800;
const EXIT_DURATION = 700;

export default function SplashScreen() {
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [iconFailed, setIconFailed] = useState(false);
  const [wordmarkFailed, setWordmarkFailed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const shouldShow = root.classList.contains("show-initial-splash");

    if (!shouldShow) {
      setHidden(true);
      return;
    }

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const enterRaf = window.requestAnimationFrame(() => {
      setEntered(true);
    });

    const visibleDuration = prefersReducedMotion ? 850 : SHOW_DURATION;
    const exitDuration = prefersReducedMotion ? 240 : EXIT_DURATION;

    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, visibleDuration);

    const cleanupTimer = window.setTimeout(() => {
      root.classList.remove("show-initial-splash");
      root.classList.add("app-ready");
      setHidden(true);
    }, visibleDuration + exitDuration);

    return () => {
      window.cancelAnimationFrame(enterRaf);
      window.clearTimeout(exitTimer);
      window.clearTimeout(cleanupTimer);
      root.classList.remove("show-initial-splash");
      root.classList.add("app-ready");
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={[
        styles.overlay,
        entered ? styles.entered : "",
        exiting ? styles.exiting : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className={styles.backdropGlow} />

      <div className={styles.content}>
        <div className={styles.iconShell}>
          {!iconFailed ? (
            <img
              src={ICON_SRC}
              alt=""
              className={styles.iconVisual}
              onError={() => setIconFailed(true)}
            />
          ) : (
            <span className={styles.iconFallback}>K</span>
          )}
        </div>

        <div className={styles.wordmarkStage}>
          {!wordmarkFailed ? (
            <>
              <img
                src={WORDMARK_SRC}
                alt=""
                className={styles.wordmarkBase}
                onError={() => setWordmarkFailed(true)}
              />

              <div className={styles.wordmarkLiquidMask}>
                <div className={styles.liquidBody}>
                  <span className={styles.waveFront} />
                  <span className={styles.waveBack} />
                </div>
              </div>
            </>
          ) : (
            <div className={styles.textFallback}>
              <span className={styles.textBase}>Kerning</span>
              <span className={styles.textLiquidMask}>
                <span className={styles.textLiquidBody}>
                  <span className={styles.waveFront} />
                  <span className={styles.waveBack} />
                </span>
              </span>
            </div>
          )}
        </div>

        <div className={styles.progressTrack}>
          <span className={styles.progressFill} />
        </div>
      </div>
    </div>
  );
}