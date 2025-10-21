"use client";

import React, { ReactNode, useState } from "react";

interface EnhancedMarqueeProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export function EnhancedMarquee({
  children,
  speed = 30,
  className = "",
  pauseOnHover = false,
}: EnhancedMarqueeProps) {
  const childrenArray = React.Children.toArray(children);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex gap-8"
        style={{
          animation: `scroll-left ${speed}s linear infinite`,
          animationPlayState: pauseOnHover && isPaused ? 'paused' : 'running',
        }}
      >
        {/* First set */}
        <div className="flex gap-8 shrink-0">
          {childrenArray.map((child, index) => (
            <div
              key={`first-${index}`}
              onMouseEnter={() => pauseOnHover && setIsPaused(true)}
              onMouseLeave={() => pauseOnHover && setIsPaused(false)}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div className="flex gap-8 shrink-0" aria-hidden="true">
          {childrenArray.map((child, index) => (
            <div
              key={`second-${index}`}
              onMouseEnter={() => pauseOnHover && setIsPaused(true)}
              onMouseLeave={() => pauseOnHover && setIsPaused(false)}
            >
              {child}
            </div>
          ))}
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
      `}</style>
    </div>
  );
}
