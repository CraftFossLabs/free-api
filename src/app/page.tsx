'use client';
import Link from 'next/link';
import { useState } from 'react';

const features = [
  {
    name: 'Email Finder',
    description: 'Find email addresses associated with any domain or company.',
    href: '/email-finder',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Mail',
    description: 'Send and receive emails programmatically with our mail API.',
    href: '/mail',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Maps by India',
    description: 'Access detailed maps and location data for Indian regions.',
    href: '/maps-by-india',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  }, 
  {
    name: 'Profile Picture',
    description: 'Generate and manage profile pictures for users.',
    href: '/profile-picture',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    name: 'Tracking',
    description: 'Track device and location information in real-time.',
    href: '/tracking',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const stats = [
  { name: 'Total APIs', value: '6+' },
  { name: 'Monthly Requests', value: '1M+' },
  { name: 'Active Users', value: '10K+' },
  { name: 'Success Rate', value: '99.9%' },
];

const testimonials = [
  {
    content: "This API collection has significantly improved our development workflow. The email finder and mail APIs are particularly useful.",
    author: "John Doe",
    role: "Senior Developer at TechCorp",
  },
  {
    content: "The Maps by India API is incredibly accurate and easy to integrate. It's been a game-changer for our location-based services.",
    author: "Jane Smith",
    role: "Product Manager at GeoApp",
  },
  {
    content: "The profile picture generation API is exactly what we needed for our user management system. Highly recommended!",
    author: "Mike Johnson",
    role: "CTO at UserFlow",
  },
];

export default function Home() {
 
  return (
    <div className="min-h-screen bg-gray-50">
 
  
      <div className="relative bg-white overflow-hidden pt-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-1.5 border border-transparent text-xs font-medium rounded-full text-blue-700 bg-blue-100 mb-8">
                  New: Enhanced API Documentation
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Free API Collection</span>
                  <span className="block text-blue-600">for Developers</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  A comprehensive collection of free APIs for email finding, mail services, maps, profile pictures, and device tracking.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/docs"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/features"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section with Gradient Cards */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Explore our collection of powerful APIs designed to help you build better applications.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Link
                  key={feature.name}
                  href={feature.href}
                  className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-blue-200"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white ring-4 ring-white">
                      {feature.icon}
                    </span>
                    <h3 className="mt-8 text-lg font-medium text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with Animated Numbers */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-blue-600">{stat.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section with Timeline */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple Integration
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  title: 'Sign Up',
                  description: 'Create your account and get your API key in minutes.',
                  icon: '1',
                },
                {
                  title: 'Choose API',
                  description: 'Select the API that best fits your needs from our collection.',
                  icon: '2',
                },
                {
                  title: 'Integrate',
                  description: 'Copy the code snippet and integrate it into your application.',
                  icon: '3',
                },
                {
                  title: 'Go Live',
                  description: 'Deploy your application and start using the API.',
                  icon: '4',
                },
              ].map((step) => (
                <div key={step.title} className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white group-hover:scale-110 transition-transform duration-200">
                    {step.icon}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{step.title}</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section with Modern Cards */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What Our Users Say
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section with Accordion */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">FAQ</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-8">
              {[
                {
                  question: 'How do I get started?',
                  answer: 'Simply sign up for a free account, get your API key, and start making requests to our APIs.',
                },
                {
                  question: "What's the rate limit?",
                  answer: 'Free tier includes 1,000 requests per month. Pro tier includes 50,000 requests per month. Enterprise tier offers unlimited requests.',
                },
                {
                  question: 'Do you offer support?',
                  answer: 'Yes, we offer support through email and documentation. Pro and Enterprise tiers include priority support.',
                },
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-500">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  );
}
