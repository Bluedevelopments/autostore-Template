"use client";
import React from 'react';
import { ModelsList } from '../../../components/ModelsList';
import { useModels } from '../../../hooks/useModels';
import Link from 'next/link';

export default function ModelsPage({ params }: { params: { typeId: string } }) {
  const { typeId } = React.use(params);
  const { models, isLoading, isError } = useModels(typeId);

  return (
    <main className="max-w-7xl mx-auto p-8">
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">← Back to Types</Link>
      <h1 className="text-3xl font-bold mb-8">Models</h1>
      {isLoading ? (
        <div>Loading models...</div>
      ) : isError ? (
        <div>Error loading models.</div>
      ) : (
        <ModelsList
          typeId={typeId}
          onSelect={() => {}}
          renderItem={(model, children) => (
            <Link href={`/types/${typeId}/models/${model.id}`} key={model.id} legacyBehavior>
              <a className="block h-full w-full">{children}</a>
            </Link>
          )}
        />
      )}
    </main>
  );
} 