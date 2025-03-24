'use client';
import { useState } from 'react';
interface EmailResult {
    email: string;
    count: number;
}

export default function EmailFinderPage() {
    const [text, setText] = useState('');
    const [results, setResults] = useState<EmailResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/email-finder?text=${encodeURIComponent(text)}`);
            if (!response.ok) {
                throw new Error('Failed to find emails');
            }

            const csvText = await response.text();
            const rows = csvText.split('\n').slice(1); // Skip header row
            const parsedResults = rows
                .filter(row => row.trim())
                .map(row => {
                    const [email, count] = row.split(',');
                    return { email, count: parseInt(count) };
                });

            setResults(parsedResults);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Email Finder
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Extract email addresses from any text
                    </p>
                </div>

                <div className="mt-12 max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                                Enter text to analyze
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="text"
                                    name="text"
                                    rows={6}
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 text-black"
                                    placeholder="Paste your text here..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || !text.trim()}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading || !text.trim()
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                    }`}
                            >
                                {loading ? 'Finding emails...' : 'Find Emails'}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div className="mt-6 bg-red-50 p-4 rounded-md">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Found Emails</h2>
                            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                <ul className="divide-y divide-gray-200">
                                    {results.map((result, index) => (
                                        <li key={index} className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm font-medium text-blue-600 truncate">
                                                    {result.email}
                                                </div>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {result.count} {result.count === 1 ? 'occurrence' : 'occurrences'}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 