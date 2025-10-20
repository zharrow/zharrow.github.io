"use client";

import { ReactNode } from "react";

interface InfiniteMarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMarquee({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: InfiniteMarqueeProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`flex gap-8 ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `scroll-${direction} ${speed}s linear infinite`,
        }}
      >
        {/* First set */}
        <div className="flex gap-8 shrink-0">{children}</div>
        {/* Duplicate for seamless loop */}
        <div className="flex gap-8 shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
