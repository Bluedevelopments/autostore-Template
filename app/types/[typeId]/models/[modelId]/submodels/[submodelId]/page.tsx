"use client";
import React from 'react';
import { ModelYearsList } from '../../../../../../../components/ModelYearsList';
import { useModelYears } from '../../../../../../../hooks/useModelYears';
import Link from 'next/link';

export default function ModelYearsPage({ params }: { params: { typeId: string; modelId: string; submodelId: string } }) {
  const { typeId, modelId, submodelId } = React.use(params);
  const { modelYears, isLoading, isError } = useModelYears(submodelId);

  return (
    <main className="max-w-7xl mx-auto p-8">
      <Link href={`/types/${typeId}/models/${modelId}`} className="text-blue-600 hover:underline mb-6 inline-block">← Back to Submodels</Link>
      <h1 className="text-3xl font-bold mb-8">Model Years</h1>
      {isLoading ? (
        <div>Loading model years...</div>
      ) : isError ? (
        <div>Error loading model years.</div>
      ) : (
        <ModelYearsList
          submodelId={submodelId}
          onSelect={() => {}}
          renderItem={(modelYear, children) => (
            <Link
              href={`/types/${typeId}/models/${modelId}/submodels/${submodelId}/years/${modelYear._id}`}
              key={modelYear._id}
              legacyBehavior
            >
              <a className="block h-full w-full">{children}</a>
            </Link>
          )}
        />
      )}
    </main>
  );
} 