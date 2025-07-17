import useSWR from 'swr';
import { getModels } from '../lib/api';
import type { Model } from '../lib/types';

export function useModels(typeId: string | undefined) {
  const shouldFetch = Boolean(typeId);
  const { data, error, isLoading } = useSWR(shouldFetch ? ['models', typeId] : null, () => getModels(typeId!).then(res => res));
  return {
    models: data,
    isLoading,
    isError: !!error,
  };
} 