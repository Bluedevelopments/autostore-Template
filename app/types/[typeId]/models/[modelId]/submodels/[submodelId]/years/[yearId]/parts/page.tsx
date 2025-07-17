"use client";
import React from 'react';
import { PartsList } from '../../../../../../../../../../components/PartsList';
import Link from 'next/link';

export default function PartsPage({ params }: { params: { typeId: string; modelId: string; submodelId: string; yearId: string } }) {
  const { typeId, modelId, submodelId, yearId } = React.use(params);

  return (
    <main className="max-w-7xl mx-auto p-8">
      <Link href={`/types/${typeId}/models/${modelId}/submodels/${submodelId}/years/${yearId}`} className="text-blue-600 hover:underline mb-6 inline-block">← Back to Model Year</Link>
      <h1 className="text-3xl font-bold mb-8">Parts</h1>
      <PartsList modelYearId={yearId} />
    </main>
  );
} 