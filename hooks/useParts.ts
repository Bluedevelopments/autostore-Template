import useSWR from 'swr';
import { getParts } from '../lib/api';
import type { Part } from '../lib/types';

export function useParts(modelYearId: string | undefined, versionId?: string) {
  const shouldFetch = Boolean(modelYearId);
  const { data, error, isLoading } = useSWR(
    shouldFetch ? ['parts', modelYearId, versionId] : null,
    () => getParts(modelYearId!, versionId)
  );
  return {
    parts: data,
    isLoading,
    isError: !!error,
  };
} 