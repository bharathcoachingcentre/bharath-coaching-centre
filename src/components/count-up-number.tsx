"use client"

import React from 'react';
import { useCountUp } from '@/hooks/use-count-up';

interface CountUpNumberProps {
  end: number;
  duration?: number;
  className?: string;
  precision?: number;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({ end, duration, className, precision = 0 }) => {
  const { count, ref } = useCountUp(end, duration);

  return (
    <span ref={ref} className={className}>
      {count.toFixed(precision)}
    </span>
  );
};
