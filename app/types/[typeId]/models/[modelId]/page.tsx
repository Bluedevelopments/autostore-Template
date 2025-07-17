"use client";
import React from 'react';
import { SubmodelsList } from '../../../../../components/SubmodelsList';
import { useSubmodels } from '../../../../../hooks/useSubmodels';
import Link from 'next/link';

export default function SubmodelsPage({ params }: { params: { typeId: string; modelId: string } }) {
  const { typeId, modelId } = React.use(params);
  const { submodels, isLoading, isError } = useSubmodels(modelId);

  return (
    <main className="max-w-7xl mx-auto p-8">
      <Link href={`/types/${typeId}`} className="text-blue-600 hover:underline mb-6 inline-block">← Back to Models</Link>
      <h1 className="text-3xl font-bold mb-8">Submodels</h1>
      {isLoading ? (
        <div>Loading submodels...</div>
      ) : isError ? (
        <div>Error loading submodels.</div>
      ) : (
        <SubmodelsList
          modelId={modelId}
          onSelect={() => {}}
          renderItem={(submodel, children) => (
            <Link href={`/types/${typeId}/models/${modelId}/submodels/${submodel._id}`} key={submodel._id} legacyBehavior>
              <a className="block h-full w-full">{children}</a>
            </Link>
          )}
        />
      )}
    </main>
  );
} 