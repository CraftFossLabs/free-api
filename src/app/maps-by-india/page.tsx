'use client';

import { useState, useEffect, useRef } from 'react';

interface StateData {
    name: string;
    districtCount: number;
    districts: string[];
}

export default function MapsByIndiaPage() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [states, setStates] = useState<StateData[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const searchStates = async () => {
            if (query.length < 2) {
                setStates([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/maps-by-india?query=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch states data');
                }

                const data = await response.json();
                setStates(data.states);
                setShowSuggestions(true);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(searchStates, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    return (
        <div className="min-h-screen bg-gray-50 text-black py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Maps by India
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Search for states and their districts across India
                    </p>
                </div>

                <div className="mt-12 max-w-3xl mx-auto">
                    <div ref={searchRef} className="relative">
                        <div className="relative">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for a state..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {loading && (
                                <div className="absolute right-3 top-2.5">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                                </div>
                            )}
                        </div>

                        {showSuggestions && states.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-96 overflow-y-auto">
                                {states.map((state, index) => (
                                    <div key={index} className="p-4 hover:bg-gray-50 border-b border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-medium text-gray-900">{state.name}</h3>
                                            <span className="text-sm text-gray-500">
                                                {state.districtCount} districts
                                            </span>
                                        </div>
                                        <div className="mt-2">
                                            <h4 className="text-sm font-medium text-gray-700">Districts:</h4>
                                            <div className="mt-1 flex flex-wrap gap-2">
                                                {state.districts.map((district, dIndex) => (
                                                    <span
                                                        key={dIndex}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                    >
                                                        {district}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="mt-6 bg-red-50 p-4 rounded-md">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 