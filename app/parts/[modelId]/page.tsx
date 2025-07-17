"use client";
import React from 'react';
import { PartsList } from '../../../components/PartsList';
import Link from 'next/link';

export default function PartsByModelIdPage({ params }: { params: { modelId: string } }) {
  const { modelId } = React.use(params);

  return (
    <main className="max-w-7xl mx-auto p-8">
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">← Back to Home</Link>
      <h1 className="text-3xl font-bold mb-8">Parts</h1>
      <PartsList modelYearId={modelId} />
    </main>
  );
} 