"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface VideoPreviewProps {
  image: string;
  videoSrc?: string; // Optional: path to video file
  alt: string;
  isHovered: boolean;
}

export function VideoPreview({ image, videoSrc, alt, isHovered }: VideoPreviewProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && isHovered && videoSrc) {
      videoRef.current.play().catch(() => {
        // Video play failed, fallback to image
      });
    } else if (videoRef.current && !isHovered) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, videoSrc]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Static Image */}
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Video Preview (if available) */}
      {videoSrc && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10"
            >
              <video
                ref={videoRef}
                src={videoSrc}
                loop
                muted
                playsInline
                onLoadedData={() => setIsVideoLoaded(true)}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Play icon indicator when video is available */}
      {videoSrc && !isHovered && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-16 h-16 rounded-full bg-orange-pantone/90 backdrop-blur-sm flex items-center justify-center"
          >
            <svg
              className="w-7 h-7 text-white-pure ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
