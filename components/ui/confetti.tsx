"use client";

import { useEffect } from "react";

export function triggerConfetti() {
  const colors = ["#D4AF37", "#B87333", "#8A9A5B", "#FFD700", "#FFA500"];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    createConfetti(colors[Math.floor(Math.random() * colors.length)]);
  }
}

function createConfetti(color: string) {
  const confetti = document.createElement("div");
  confetti.style.position = "fixed";
  confetti.style.width = "10px";
  confetti.style.height = "10px";
  confetti.style.backgroundColor = color;
  confetti.style.left = Math.random() * window.innerWidth + "px";
  confetti.style.top = "-10px";
  confetti.style.opacity = "1";
  confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
  confetti.style.pointerEvents = "none";
  confetti.style.zIndex = "9999";
  confetti.style.borderRadius = "50%";

  document.body.appendChild(confetti);

  const fallDuration = 3000 + Math.random() * 2000;
  const horizontalMovement = (Math.random() - 0.5) * 200;

  const animation = confetti.animate(
    [
      {
        transform: `translate(0, 0) rotate(0deg)`,
        opacity: 1,
      },
      {
        transform: `translate(${horizontalMovement}px, ${window.innerHeight + 20}px) rotate(${360 * (Math.random() * 5)}deg)`,
        opacity: 0,
      },
    ],
    {
      duration: fallDuration,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    }
  );

  animation.onfinish = () => {
    confetti.remove();
  };
}

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function Confetti({ trigger, onComplete }: ConfettiProps) {
  useEffect(() => {
    if (trigger) {
      triggerConfetti();
      if (onComplete) {
        setTimeout(onComplete, 3000);
      }
    }
  }, [trigger, onComplete]);

  return null;
}
