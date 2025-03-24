'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigation = [ 
    { name: 'Email Finder', href: '/email-finder' },
    { name: 'Mail', href: '/mail' },
    { name: 'Maps by India', href: '/maps-by-india' }, 
    { name: 'Profile Picture', href: '/profile-picture' },
    { name: 'Tracking', href: '/tracking' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href={'/'} className="text-2xl font-bold text-blue-600">FreeAPI</Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((feature) => (
                  <Link
                    key={feature.name}
                    href={feature.href}
                    className={` inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-500`}
                  >
                    {feature.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <Link
                href="http://craftfosslabs.com/"
                target='blank'
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Craftfosslabs
              </Link>
              <button
                className="sm:hidden ml-4"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((feature) => (
                <Link
                  key={feature.name}
                  href={feature.href}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                >
                  {feature.name}
                </Link>
              ))}
            </div>
          </div>
        )}
       </nav>
    );
} 