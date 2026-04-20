"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import styles from "./PageTransition.module.css";

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({
  children,
}: PageTransitionProps) {
  const pathname = usePathname();

  const rootRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLoadRef = useRef(true);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const page = pageRef.current;
    const curtain = curtainRef.current;
    const panel = panelRef.current;

    if (!root || !page || !curtain || !panel) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.killTweensOf([page, curtain, panel]);

      if (firstLoadRef.current) {
        firstLoadRef.current = false;

        gsap.set(curtain, { autoAlpha: 0 });
        gsap.set(panel, { xPercent: -100 });

        gsap.fromTo(
          page,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            delay: 0.08,
          }
        );

        return;
      }

      if (prefersReducedMotion) {
        gsap.fromTo(
          page,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.28,
            ease: "power2.out",
          }
        );
        return;
      }

      const tl = gsap.timeline();

      tl.set(curtain, { autoAlpha: 1 })
        .set(panel, { xPercent: -100 })
        .to(panel, {
          xPercent: 0,
          duration: 0.48,
          ease: "power4.inOut",
        })
        .set(page, { opacity: 0, y: 18 }, 0.2)
        .add(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
          });
        })
        .to(panel, {
          xPercent: 100,
          duration: 0.72,
          ease: "power4.inOut",
          delay: 0.02,
        })
        .fromTo(
          page,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.56,
            ease: "power3.out",
          },
          "-=0.30"
        )
        .set(curtain, { autoAlpha: 0 });
    }, root);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={rootRef} className={styles.root}>
      <div ref={pageRef} className={styles.page}>
        {children}
      </div>

      <div ref={curtainRef} className={styles.curtain} aria-hidden="true">
        <div ref={panelRef} className={styles.panel}>
          <span className={styles.edgeGlow} />
          <span className={styles.edgeLine} />
        </div>
      </div>
    </div>
  );
}