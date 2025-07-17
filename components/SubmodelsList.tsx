import React from 'react';
import { useSubmodels } from '../hooks/useSubmodels';
import type { Submodel } from '../lib/types';

interface SubmodelsListProps {
  modelId: string;
  onSelect: (submodel: Submodel) => void;
  renderItem?: (submodel: Submodel, children: React.ReactNode) => React.ReactNode;
}

export const SubmodelsList: React.FC<SubmodelsListProps> = ({ modelId, onSelect, renderItem }) => {
  const { submodels, isLoading, isError } = useSubmodels(modelId);

  if (isLoading) return <div>Loading submodels...</div>;
  if (isError) return <div>Error loading submodels.</div>;
  if (!submodels || submodels.length === 0) return <div>No submodels found.</div>;

  // Debug: log submodel objects to check their structure
  console.log('Submodels:', submodels);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
      {submodels.map((submodel) => {
        const card = (
          <button
            key={submodel._id ?? submodel.id}
            className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 border rounded-2xl shadow hover:shadow-2xl transition-shadow p-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary aspect-[4/3] w-full h-full min-h-[240px] min-w-0 overflow-hidden"
            onClick={() => onSelect(submodel)}
            style={{ minHeight: 0 }}
          >
            {submodel.image ? (
              <img
                src={submodel.image}
                alt={submodel.name}
                className="w-32 h-32 object-contain mb-6 rounded flex-shrink-0"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-6 rounded flex-shrink-0">
                <span className="text-gray-400 text-5xl">🚙</span>
              </div>
            )}
            <span
              className="font-semibold text-center text-lg mt-4 break-words w-full flex items-center justify-center overflow-hidden text-ellipsis px-4 min-h-[2.5rem] line-clamp-2 whitespace-pre-line"
              title={submodel.name.length > 24 ? submodel.name : undefined}
              aria-label={submodel.name}
            >
              {submodel.name}
            </span>
          </button>
        );
        return renderItem ? renderItem(submodel, card) : card;
      })}
    </div>
  );
}; 