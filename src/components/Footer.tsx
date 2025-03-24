import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Free API Collection. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer