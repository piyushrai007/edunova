import React from 'react';
import Header from '../Header';
export default function Loading() {
  return (
    <div className="`bg-white border-gray-100 dark:bg-gray-900 p-4">
    <header className="bg-white border-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto px-4">
        <div className="animate-pulse flex items-center space-x-4">
          <div className="h-12 w-12 bg-blue-500 rounded-full"></div>
          <div>
            <div className="h-4 w-20 bg-green-500 rounded"></div>
            <div className="h-4 w-16 bg-red-500 rounded mt-2"></div>
          </div>
        </div>
      </div>
    </header>
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-yellow-500 rounded w-2/3"></div>
        <div className="h-4 bg-purple-500 rounded"></div>
        <div className="h-4 bg-pink-500 rounded"></div>
        <div className="h-4 bg-orange-500 rounded w-1/2"></div>
        <div className="h-4 bg-teal-500 rounded"></div>
        <div className="h-4 bg-indigo-500 rounded"></div>
        <div className="h-4 bg-lime-500 rounded w-3/4"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-yellow-500 rounded w-2/3"></div>
        <div className="h-4 bg-purple-500 rounded"></div>
        <div className="h-4 bg-pink-500 rounded"></div>
        <div className="h-4 bg-orange-500 rounded w-1/2"></div>
        <div className="h-4 bg-teal-500 rounded"></div>
        <div className="h-4 bg-indigo-500 rounded"></div>
        <div className="h-4 bg-lime-500 rounded w-3/4"></div>
      </div>
  
  
      <div className="animate-pulse space-y-4 mt-12">
        <div className="h-4 bg-yellow-500 rounded w-2/3"></div>
        <div className="h-4 bg-purple-500 rounded"></div>
        <div className="h-4 bg-pink-500 rounded"></div>
        <div className="h-4 bg-orange-500 rounded w-1/2"></div>
        <div className="h-4 bg-teal-500 rounded"></div>
        <div className="h-4 bg-indigo-500 rounded"></div>
      </div>
    </div>
  </div>
  </div>
  );
}