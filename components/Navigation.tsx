import React from 'react';
import Link from 'next/link';
import { BookOpen, Play, Settings, BarChart3, Eye, FileText } from 'lucide-react';

const Navigation: React.FC = () => {
  const navItems = [
    { href: '/', label: 'Introduction', icon: BookOpen },
    { href: '/getting-started', label: 'Getting Started', icon: Settings },
    { href: '/step1-architecture', label: 'Step 1: Architecture', icon: Play },
    { href: '/step2-dataset', label: 'Step 2: Dataset', icon: Play },
    { href: '/step3-build-model', label: 'Step 3: Build Model', icon: Play },
    { href: '/step4-train', label: 'Step 4: Train', icon: BarChart3 },
    { href: '/step5-visualize', label: 'Step 5: Visualize', icon: Eye },
    { href: '/references', label: 'References', icon: FileText },
  ];

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CNN</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              CNN Tutorial
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t">
          <div className="py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
