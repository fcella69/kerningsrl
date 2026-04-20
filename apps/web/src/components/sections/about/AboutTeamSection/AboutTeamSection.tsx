"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { AboutTeamMember } from "../types";
import AboutReveal from "../AboutReveal/AboutReveal";
import styles from "./AboutTeamSection.module.css";

interface AboutTeamSectionProps {
  title?: string;
  body?: string;
  showMembers?: boolean;
  members?: AboutTeamMember[];
}

/**
 * PARAMETRI DA MODIFICARE
 */
const DESKTOP_BREAKPOINT = 900;
const AUTO_SCROLL_SPEED_PX_PER_SEC = 28; // prova 24 / 34 / 46
const CARD_GAP_DESKTOP = 45; // deve restare coerente col CSS

export default function AboutTeamSection({
  title,
  body,
  showMembers = false,
  members = [],
}: AboutTeamSectionProps) {
  const hasMembers = showMembers && members.length > 0;

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const cycleWidthRef = useRef(0);
  const positionRef = useRef(0);

  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPositionRef = useRef(0);

  const [isDraggingUi, setIsDraggingUi] = useState(false);

  const repeatedMembers = useMemo(() => {
    if (!hasMembers) return [];
    return [...members, ...members, ...members];
  }, [hasMembers, members]);

  const isDesktop = () =>
    typeof window !== "undefined" && window.innerWidth > DESKTOP_BREAKPOINT;

  const wrapPosition = (value: number) => {
    const cycle = cycleWidthRef.current;
    if (!cycle) return value;

    while (value <= -2 * cycle) {
      value += cycle;
    }

    while (value > 0) {
      value -= cycle;
    }

    return value;
  };

  const applyTransform = () => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
  };

  const measure = () => {
    const track = trackRef.current;
    if (!track) return;

    if (!isDesktop()) {
      cycleWidthRef.current = 0;
      positionRef.current = 0;
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    cycleWidthRef.current = track.scrollWidth / 3;
    positionRef.current = -cycleWidthRef.current;
    applyTransform();
  };

  useEffect(() => {
    if (!hasMembers) return;

    measure();

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const deltaMs = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (
        isDesktop() &&
        !isHoveringRef.current &&
        !isDraggingRef.current &&
        cycleWidthRef.current > 0
      ) {
        const deltaPx =
          (AUTO_SCROLL_SPEED_PX_PER_SEC * deltaMs) / 1000;

        positionRef.current = wrapPosition(positionRef.current - deltaPx);
        applyTransform();
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    const handleResize = () => {
      lastTimeRef.current = null;
      measure();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [hasMembers, repeatedMembers.length]);

  const handleMouseEnter = () => {
    if (!isDesktop()) return;
    isHoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    if (!isDesktop()) return;
    if (isDraggingRef.current) return;
    isHoveringRef.current = false;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDesktop()) return;

    isDraggingRef.current = true;
    isHoveringRef.current = true;
    setIsDraggingUi(true);

    dragStartXRef.current = e.clientX;
    dragStartPositionRef.current = positionRef.current;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDesktop() || !isDraggingRef.current) return;

    const deltaX = e.clientX - dragStartXRef.current;
    positionRef.current = wrapPosition(dragStartPositionRef.current + deltaX);
    applyTransform();
  };

  const endDrag = () => {
    if (!isDesktop()) return;

    isDraggingRef.current = false;
    setIsDraggingUi(false);
  };

  const handlePointerUp = () => {
    endDrag();
  };

  const handlePointerCancel = () => {
    endDrag();
  };

  if (!title && !body && !hasMembers) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.copy}>
            <AboutReveal direction="left">
              <h2 className={styles.title}>{title}</h2>
            </AboutReveal>

            <AboutReveal delay={0.08} direction="right">
              <p className={styles.body}>{body}</p>
            </AboutReveal>
          </div>
        </div>

        {hasMembers ? (
          <div
            ref={viewportRef}
            className={`${styles.viewport} ${
              isDraggingUi ? styles.dragging : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div ref={trackRef} className={styles.track}>
              {repeatedMembers.map((member, index) => (
                <article
                  key={`${member._key ?? member.name ?? "member"}-${index}`}
                  className={styles.card}
                >
                  {member.image?.asset?.url ? (
                    <div className={styles.imageWrap}>
                      <Image
                        src={member.image.asset.url}
                        alt={member.image.alt || member.name || "Team member"}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 78vw, 280px"
                      />
                    </div>
                  ) : null}

                  <div className={styles.content}>
                    {member.name ? <h3 className={styles.name}>{member.name}</h3> : null}
                    {member.role ? <p className={styles.role}>{member.role}</p> : null}
                    {member.description ? (
                      <p className={styles.description}>{member.description}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}