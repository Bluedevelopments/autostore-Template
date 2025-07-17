import React from 'react';
import { useModels } from '../hooks/useModels';
import type { Model } from '../lib/types';

interface ModelsListProps {
  typeId: string;
  onSelect: (model: Model) => void;
  renderItem?: (model: Model, children: React.ReactNode) => React.ReactNode;
}

export const ModelsList: React.FC<ModelsListProps> = ({ typeId, onSelect, renderItem }) => {
  const { models, isLoading, isError } = useModels(typeId);

  if (isLoading) return <div>Loading models...</div>;
  if (isError) return <div>Error loading models.</div>;
  if (!models || models.length === 0) return <div>No models found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
      {models.map((model) => {
        const card = (
          <button
            key={model.id}
            className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 border rounded-2xl shadow hover:shadow-2xl transition-shadow p-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary aspect-[4/3] w-full h-full min-h-[240px] min-w-0 overflow-hidden"
            onClick={() => onSelect(model)}
            style={{ minHeight: 0 }}
          >
            {model.image ? (
              <img
                src={model.image}
                alt={model.name}
                className="w-32 h-32 object-contain mb-6 rounded flex-shrink-0"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-6 rounded flex-shrink-0">
                <span className="text-gray-400 text-5xl">🚗</span>
              </div>
            )}
            <span
              className="font-semibold text-center text-lg mt-4 break-words w-full flex items-center justify-center overflow-hidden text-ellipsis px-4 min-h-[2.5rem] line-clamp-2 whitespace-pre-line"
              title={model.name.length > 24 ? model.name : undefined}
              aria-label={model.name}
            >
              {model.name}
            </span>
          </button>
        );
        return renderItem ? renderItem(model, card) : card;
      })}
    </div>
  );
}; 