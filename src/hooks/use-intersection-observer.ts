
"use client"

import { useEffect, useRef, useState } from 'react';

type IntersectionObserverOptions = {
  threshold?: number | number[];
  rootMargin?: string;
};

export const useIntersectionObserver = (
  options: IntersectionObserverOptions = { threshold: 0.1, rootMargin: '0px' }
) => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    if (element) {
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.current?.disconnect();
          }
        },
        options
      );
      observer.current.observe(element);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [element, options]);

  return { setElement, isIntersecting };
};
