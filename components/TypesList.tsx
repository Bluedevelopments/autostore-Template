import React from 'react';
import type { Type } from '../lib/types';
import { PaginationLink } from '../hooks/useTypes';
import Pagination from './ui/pagination';

interface TypesListProps {
  types: Type[];
  links: PaginationLink[];
  onSelect: (type: Type) => void;
  onPageChange: (page: number) => void;
  renderItem?: (type: Type, children: React.ReactNode) => React.ReactNode;
}

export const TypesList: React.FC<TypesListProps> = ({ types, links, onSelect, onPageChange, renderItem }) => {
  if (!types || types.length === 0) return <div>No types found.</div>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {types.map((type) => {
          const card = (
            <button
              key={type.id}
              className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 border rounded-2xl shadow hover:shadow-2xl transition-shadow p-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary aspect-[4/3] w-full h-full min-h-[240px] min-w-0 overflow-hidden"
              onClick={() => onSelect(type)}
              style={{ minHeight: 0 }}
            >
              {type.image ? (
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-20 h-20 object-contain mb-6 rounded flex-shrink-0"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-6 rounded flex-shrink-0">
                  <span className="text-gray-400 text-4xl">🚗</span>
                </div>
              )}
              <span
                className="font-medium text-center text-base mt-4 w-full flex items-center justify-center overflow-hidden text-ellipsis px-4 min-h-[1.5rem] line-clamp-1 whitespace-nowrap"
                title={type.name}
                aria-label={type.name}
              >
                {type.name}
              </span>
            </button>
          );
          return renderItem ? renderItem(type, card) : card;
        })}
      </div>
      <Pagination links={links} onPageChange={onPageChange} />
    </>
  );
};
