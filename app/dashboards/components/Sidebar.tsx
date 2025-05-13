"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { name: 'Overview', path: '/dashboards', icon: '📊' },
    { name: 'API Playground', path: '/dashboards/playground', icon: '⚡' },
    { name: 'Use Cases', path: '/dashboards/use-cases', icon: '📋' },
    { name: 'Billing', path: '/dashboards/billing', icon: '💳' },
    { name: 'Settings', path: '/dashboards/settings', icon: '⚙️' },
    { name: 'Documentation', path: '/dashboards/docs', icon: '📚' },
  ];

  return (
    <div className="relative">
      <aside className={`
        h-screen bg-white border-r border-gray-200 
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className={`text-2xl font-bold transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            {!isCollapsed && 'Dandi'}
          </span>
        </div>
        
        <div className="p-4">
          <Link
            href="/"
            className={`
              flex items-center px-3 py-2 text-sm rounded-md mb-6 
              bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors
              ${isCollapsed ? 'justify-center' : ''}
            `}
            title="Page d'accueil"
          >
            <span className={`text-xl ${isCollapsed ? 'mr-0' : 'mr-3'}`}>🏡</span>
            {!isCollapsed && <span>Page d'accueil</span>}
          </Link>

          <div className={`
            flex items-center space-x-2 p-2 bg-blue-50 rounded-md mb-4
            ${isCollapsed ? 'justify-center' : ''}
          `}>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-sm font-medium">P</span>
            </div>
            <span className={`text-sm font-medium text-gray-700 transition-opacity duration-200 ${isCollapsed ? 'hidden' : 'block'}`}>
              Personal
            </span>
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    flex items-center px-3 py-2 text-sm rounded-md transition-colors
                    ${isCollapsed ? 'justify-center' : ''}
                    ${isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                  title={isCollapsed ? item.name : undefined}
                >
                  <span className={`text-xl ${isCollapsed ? 'mr-0' : 'mr-3'}`}>{item.icon}</span>
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-50 transition-colors"
        aria-label={isCollapsed ? "Déplier le menu" : "Replier le menu"}
      >
        {isCollapsed ? (
          <ChevronRightIcon className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
        )}
      </button>
    </div>
  );
};

export default Sidebar; 