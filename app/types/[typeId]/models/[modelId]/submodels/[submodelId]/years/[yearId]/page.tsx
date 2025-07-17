"use client";
import React, { useEffect } from 'react';
import { VersionsList } from '../../../../../../../../../components/VersionsList';
import { useVersions } from '../../../../../../../../../hooks/useVersions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function YearStepPage({ params }: { params: { typeId: string; modelId: string; submodelId: string; yearId: string } }) {
  const { typeId, modelId, submodelId, yearId } = React.use(params);
  const { versions, isLoading, isError } = useVersions(yearId);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isError && versions && versions.length === 0) {
      // No versions, go directly to parts page
      router.replace(`/types/${typeId}/models/${modelId}/submodels/${submodelId}/years/${yearId}/parts`);
    }
  }, [isLoading, isError, versions, typeId, modelId, submodelId, yearId, router]);

  return (
    <main className="max-w-7xl mx-auto p-8">
      <Link href={`/types/${typeId}/models/${modelId}/submodels/${submodelId}`} className="text-blue-600 hover:underline mb-6 inline-block">← Back to Model Years</Link>
      <h1 className="text-3xl font-bold mb-8">Versions</h1>
      {isLoading ? (
        <div>Loading versions...</div>
      ) : isError ? (
        <div>Error loading versions.</div>
      ) : (
        <VersionsList
          modelYearId={yearId}
          onSelect={(version) => {
            router.push(`/types/${typeId}/models/${modelId}/submodels/${submodelId}/years/${yearId}/versions/${version.id}/parts`);
          }}
        />
      )}
    </main>
  );
} 