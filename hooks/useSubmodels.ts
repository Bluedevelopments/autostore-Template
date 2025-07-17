import useSWR from 'swr';
import { getSubmodels } from '../lib/api';
import type { Submodel } from '../lib/types';

export function useSubmodels(modelId: string | undefined) {
  const shouldFetch = Boolean(modelId);
  const { data, error, isLoading } = useSWR(shouldFetch ? ['submodels', modelId] : null, () => getSubmodels(modelId!));
  return {
    submodels: data,
    isLoading,
    isError: !!error,
  };
} 