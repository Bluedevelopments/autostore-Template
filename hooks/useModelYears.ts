import useSWR from 'swr';
import { getModelYears } from '../lib/api';
import type { ModelYear } from '../lib/types';

export function useModelYears(submodelId: string | undefined) {
  const shouldFetch = Boolean(submodelId);
  const { data, error, isLoading } = useSWR(shouldFetch ? ['modelYears', submodelId] : null, () => getModelYears(submodelId!));
  return {
    modelYears: data,
    isLoading,
    isError: !!error,
  };
} 