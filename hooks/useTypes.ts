import useSWR from 'swr';
import { getTypes } from '../lib/api';
import type { Type } from '../lib/types';

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export function useTypes(page: number) {
  const { data, error, isLoading } = useSWR(['types', page], () => getTypes(page));
  return {
    types: data?.data as Type[] || [],
    links: data?.links || [],
    meta: data?.meta || undefined,
    isLoading,
    isError: !!error,
  };
} 