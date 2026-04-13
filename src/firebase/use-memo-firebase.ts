'use client';

import { useMemo } from 'react';

/**
 * A specialized memoization hook for Firebase references and queries.
 * It ensures the reference is only updated when its dependencies change,
 * preventing infinite loops in hooks like useCollection and useDoc.
 */
export function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}
