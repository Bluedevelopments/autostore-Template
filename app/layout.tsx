"use client";
import './globals.css'
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { search as searchApi } from '../lib/api';
import { useRouter } from 'next/navigation';

const headerLogo = process.env.NEXT_PUBLIC_HEADER_LOGO;
const headerIcon = process.env.NEXT_PUBLIC_HEADER_ICON || '🚗';
const headerName = process.env.NEXT_PUBLIC_HEADER_NAME || 'CNC Parts Browser';
const Description = process.env.NEXT_PUBLIC_Description || 'CNC Parts Browser';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!value) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await searchApi(value);
        // Flatten if response is a nested array
        const flatRes = Array.isArray(res) && Array.isArray(res[0]) ? res[0] : res;
        setResults(flatRes);
        setShowDropdown(true);
      } catch {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);
  };

  return (
    <html lang="en">
      <body>
        <header className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm relative">
          <Link href="/" className="flex items-center gap-4">
            {headerLogo ? (
              <img src={headerLogo} alt="Logo" className="h-10 w-10 object-contain" />
            ) : (
              <span className="text-3xl">{headerIcon}</span>
            )}
            <span className="text-xl font-bold tracking-tight">{headerName}</span>
          </Link>
          <div className="flex-1 flex justify-end">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={query}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-base bg-white dark:bg-gray-800"
                onFocus={() => query && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              />
              {showDropdown && results.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
                  {results.map((item, idx) => (
                    <a
                      key={item.id || item._id || idx}
                      href={getResultLink(item)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 cursor-pointer"
                      onMouseDown={e => {
                        e.preventDefault();
                        setShowDropdown(false);
                        router.push(getResultLink(item));
                      }}
                    >
                      <span className="font-semibold mr-2">
                        [{[item.type, item.subtype, item.submodel, item.year].filter(Boolean).join(' - ')}]
                      </span>
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

// Helper to get the link for a search result
function getResultLink(item: any): string {
  return `/parts/${item.id || item._id}`;
}


