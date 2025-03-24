'use client';

import { useState } from 'react';
interface EmailFormData {
    name: string;
    emails: string;
    subject: string;
    message: string;
    service: 'gmail' | 'zoho';
    EMAIL_ID: string;
    EMAIL_PASS: string;
}

export default function MailPage() {
    const [formData, setFormData] = useState<EmailFormData>({
        name: '',
        emails: '',
        subject: '',
        message: '',
        service: 'gmail',
        EMAIL_ID: '',
        EMAIL_PASS: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const emails = formData.emails.split(',').map(email => email.trim());
            const response = await fetch(`/api/mail/via-${formData.service}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    emails,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to send email');
            }

            const data = await response.json();
            setSuccess(data.success);
            setFormData({
                name: '',
                emails: '',
                subject: '',
                message: '',
                service: formData.service,
                EMAIL_ID: '',
                EMAIL_PASS: '',
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Send Emails
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Send emails using Gmail or Zoho SMTP
                    </p>
                </div>

                <div className="mt-12 max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                                Email Service
                            </label>
                            <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white text-black border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                                <option value="gmail">Gmail</option>
                                <option value="zoho">Zoho</option>
                            </select>
                        </div>
                          <div className="flex gap-4">
                        <div className='w-1/2'>
                            <label htmlFor="EMAIL_ID" className="block text-sm font-medium text-gray-700">
                                Your Email ID
                            </label>
                            <input
                                type="email"
                                id="EMAIL_ID"
                                name="EMAIL_ID" 
                                required
                                value={formData.EMAIL_ID}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                className="mt-1 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>

                        <div className='w-1/2'>
                            <label htmlFor="EMAIL_PASS" className="block text-sm font-medium text-gray-700">
                                {formData.service === 'gmail' ? 'App Password' : 'Email Password'}
                            </label>
                            <input
                                type="password"
                                id="EMAIL_PASS"
                                name="EMAIL_PASS"
                                required
                                value={formData.EMAIL_PASS}
                                onChange={handleChange}
                                placeholder={formData.service === 'gmail' ? 'Enter your Gmail app password' : 'Enter your email password'}
                                className="mt-1 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label htmlFor="emails" className="block text-sm font-medium text-gray-700">
                                Recipient Emails (comma-separated)
                            </label>
                            <input
                                type="text"
                                id="emails"
                                name="emails"
                                required
                                value={formData.emails}
                                onChange={handleChange}
                                placeholder="example1@email.com, example2@email.com"
                                className="mt-1 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="mt-1 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className="mt-1 p-2 text-black focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                    }`}
                            >
                                {loading ? 'Sending...' : 'Send Email'}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div className="mt-6 bg-red-50 p-4 rounded-md">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mt-6 bg-green-50 p-4 rounded-md">
                            <p className="text-green-700">{success}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 