import React from 'react';
import { useParts } from '../hooks/useParts';
import type { Part } from '../lib/types';

interface PartsListProps {
  modelYearId: string;
  versionId?: string;
}

export const PartsList: React.FC<PartsListProps> = ({ modelYearId, versionId }) => {
  const { parts, isLoading, isError } = useParts(modelYearId, versionId);

  if (isLoading) return <div>Loading parts...</div>;
  if (isError) return <div>Error loading parts.</div>;
  if (!parts || parts.length === 0) return <div>No parts found.</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {parts.map((part) => (
        <div
          key={part.id}
          className="bg-white dark:bg-gray-900 border rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center p-4"
        >
          {part.image ? (
            <img
              src={part.image}
              alt={part.name}
              className="w-16 h-16 object-contain mb-2 rounded"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-2 rounded">
              <span className="text-gray-400 text-2xl">🔩</span>
            </div>
          )}
          <span className="font-medium text-center text-sm mt-1">{part.name}</span>
          {part.dimensions && (
            <span className="text-xs text-gray-500 mt-1">{part.dimensions}</span>
          )}
          {typeof part.points === 'number' && (
            <span className="text-xs text-gray-500 mt-1">Points: {part.points}</span>
          )}
        </div>
      ))}
    </div>
  );
}; 