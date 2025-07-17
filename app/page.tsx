"use client";
import React, { useState } from 'react';
import { TypesList } from '../components/TypesList';
import { useTypes } from '../hooks/useTypes';
import Link from 'next/link';
import type { Type } from '../lib/types';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { types, links, isLoading, isError } = useTypes(page);

  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Browse Vehicle Parts</h1>
      {isLoading ? (
        <div>Loading types...</div>
      ) : isError ? (
        <div>Error loading types.</div>
      ) : (
        <TypesList
          types={types}
          links={links}
          onSelect={() => {}}
          onPageChange={setPage}
          renderItem={(type: Type, children) => (
            <Link href={`/types/${type.id}`} key={type.id} legacyBehavior>
              <a className="block h-full w-full">{children}</a>
            </Link>
          )}
        />
      )}
    </main>
  );
}
