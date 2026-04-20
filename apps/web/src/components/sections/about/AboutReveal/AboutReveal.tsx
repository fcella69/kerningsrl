"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutReveal.module.css";

type AboutRevealProps = {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
};

export default function AboutReveal({
  children,
  delay = 0,
  direction = "up",
}: AboutRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const className = [
    styles.reveal,
    styles[direction],
    isVisible ? styles.visible : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={className}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}