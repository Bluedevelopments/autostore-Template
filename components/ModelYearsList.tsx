import React from 'react';
import { useModelYears } from '../hooks/useModelYears';
import type { ModelYear } from '../lib/types';

interface ModelYearsListProps {
  submodelId: string;
  onSelect: (modelYear: ModelYear) => void;
  renderItem?: (modelYear: ModelYear, children: React.ReactNode) => React.ReactNode;
}

export const ModelYearsList: React.FC<ModelYearsListProps> = ({ submodelId, onSelect, renderItem }) => {
  const { modelYears, isLoading, isError } = useModelYears(submodelId);

  if (isLoading) return <div>Loading model years...</div>;
  if (isError) return <div>Error loading model years.</div>;
  if (!modelYears || modelYears.length === 0) return <div>No model years found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
      {modelYears.map((modelYear) => {
        console.log('ModelYear:', modelYear);
        const card = (
          <button
            key={modelYear.id}
            className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 border rounded-2xl shadow hover:shadow-2xl transition-shadow p-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary aspect-[4/3] w-full h-full min-h-[240px] min-w-0 overflow-hidden"
            onClick={() => onSelect(modelYear)}
            style={{ minHeight: 0 }}
          >
            {modelYear.image ? (
              <img
                src={modelYear.image}
                alt={String(modelYear.name)}
                className="w-20 h-20 object-contain mb-6 rounded flex-shrink-0"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-6 rounded flex-shrink-0">
                <span className="text-gray-400 text-4xl">📅</span>
              </div>
            )}
            <span
              className="font-medium text-center text-base mt-4 w-full flex items-center justify-center overflow-hidden text-ellipsis px-4 min-h-[1.5rem] line-clamp-1 whitespace-nowrap"
              title={String(modelYear.name)}
              aria-label={String(modelYear.name)}
            >
              {String(modelYear.name)}
            </span>
          </button>
        );
        return renderItem ? renderItem(modelYear, card) : card;
      })}
    </div>
  );
}; 