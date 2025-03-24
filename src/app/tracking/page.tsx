'use client';

import { useEffect, useState } from 'react';

interface TrackingData {
    ip: string;
    userAgent: string;
    browser: string;
    os: string;
    deviceModel: string;
    locationData: {
        status: string;
        city: string;
        country: string;
        region: string;
        regionName: string;
        countryCode: string;
        lat: number;
        lon: number;
        timezone: string;
        query: string;
    };
}

export default function TrackingPage() {
    const [data, setData] = useState<TrackingData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/tracking');
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-600">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Device & Location Tracking
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Real-time information about your device and location
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Location Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Location Information</h2>
                        <div className="space-y-2">
                            <p className="text-gray-600">
                                <span className="font-medium">City:</span> {data?.locationData.city}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Country:</span> {data?.locationData.country}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Region:</span> {data?.locationData.regionName}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Timezone:</span> {data?.locationData.timezone}
                            </p>
                        </div>
                    </div>

                    {/* Device Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Device Information</h2>
                        <div className="space-y-2">
                            <p className="text-gray-600">
                                <span className="font-medium">Device:</span> {data?.deviceModel}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Browser:</span> {data?.browser}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Operating System:</span> {data?.os}
                            </p>
                        </div>
                    </div>

                    {/* Network Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Network Information</h2>
                        <div className="space-y-2">
                            <p className="text-gray-600">
                                <span className="font-medium">IP Address:</span> {data?.ip}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Coordinates:</span>{' '}
                                {data?.locationData.lat}, {data?.locationData.lon}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 