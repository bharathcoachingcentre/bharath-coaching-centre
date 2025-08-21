"use client"

import { useState, useEffect, useRef, useCallback } from 'react';

export const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animationFrameId = useRef<number>();

  const animate = useCallback((timestamp: number, startTime: number, startVal: number) => {
    const progress = timestamp - startTime;
    const percentage = Math.min(progress / duration, 1);
    const currentCount = startVal + (end - startVal) * percentage;
    setCount(currentCount);

    if (progress < duration) {
      animationFrameId.current = requestAnimationFrame((ts) => animate(ts, startTime, startVal));
    } else {
      setCount(end);
    }
  }, [end, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = performance.now();
          animationFrameId.current = requestAnimationFrame((ts) => animate(ts, startTime, 0));
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate]);

  return { count, ref };
};
