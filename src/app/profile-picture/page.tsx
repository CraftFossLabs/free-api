'use client';

import { useState } from 'react';

interface ProfilePictureData {
    type: 'name' | 'gender';
    name?: string;
    background?: string;
    gender?: 'male' | 'female';
}

export default function ProfilePicturePage() {
    const [formData, setFormData] = useState<ProfilePictureData>({
        type: 'name',
        name: '',
        background: '#4F46E5',
        gender: 'male'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setImageUrl(null);

        try {
            const queryParams = new URLSearchParams();
            if (formData.type === 'name') {
                queryParams.append('name', formData.name || '');
                queryParams.append('color', formData.background || '#4F46E5');
                const response = await fetch(`/api/profile-picture?${queryParams.toString()}`);
                if (!response.ok) {
                    throw new Error('Failed to generate profile picture');
                } 
                const data = await response.json();
                setImageUrl(data.imageUrl);
            } else {
                queryParams.append('gender', formData.gender || 'male');
                const response = await fetch(`/api/profile-picture/based-on-gender?${queryParams.toString()}`);
                if (!response.ok) {
                    throw new Error('Failed to generate profile picture');
                }

                const data = await response.json();
                setImageUrl(data.imageurl);
            }


        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!imageUrl) return;

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `profile-picture-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            setError('Failed to download image');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Profile Picture Generator
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Generate beautiful profile pictures based on name or gender
                    </p>
                </div>

                <div className="mt-12 max-w-3xl mx-auto text-black">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Generation Type
                            </label>
                            <div className="mt-2 space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="name"
                                        checked={formData.type === 'name'}
                                        onChange={(e) => setFormData({ ...formData, type: 'name' })}
                                        className="form-radio text-blue-600"
                                    />
                                    <span className="ml-2">Name Based</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="gender"
                                        checked={formData.type === 'gender'}
                                        onChange={(e) => setFormData({ ...formData, type: 'gender' })}
                                        className="form-radio text-blue-600"
                                    />
                                    <span className="ml-2">Gender Based</span>
                                </label>
                            </div>
                        </div>

                        {formData.type === 'name' ? (
                            <>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="background" className="block text-sm font-medium text-gray-700">
                                        Background Color
                                    </label>
                                    <input
                                        type="color"
                                        id="background"
                                        value={formData.background}
                                        onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                                        className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                            </>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Gender
                                </label>
                                <div className="mt-2 space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="male"
                                            checked={formData.gender === 'male'}
                                            onChange={(e) => setFormData({ ...formData, gender: 'male' })}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2">Male</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="female"
                                            checked={formData.gender === 'female'}
                                            onChange={(e) => setFormData({ ...formData, gender: 'female' })}
                                            className="form-radio text-blue-600"
                                        />
                                        <span className="ml-2">Female</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                    }`}
                            >
                                {loading ? 'Generating...' : 'Generate Profile Picture'}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div className="mt-6 bg-red-50 p-4 rounded-md">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {imageUrl && (
                        <div className="mt-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Generated Profile Picture</h2>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={imageUrl}
                                        alt="Generated profile picture"
                                        className="rounded-lg shadow-md"
                                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                                    />
                                    <div className="mt-6 flex space-x-4">
                                        <button
                                            onClick={handleDownload}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download
                                        </button>
                                        <a
                                            href={imageUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Open in new tab
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 