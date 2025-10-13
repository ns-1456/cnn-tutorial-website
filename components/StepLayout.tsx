import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface StepLayoutProps {
  children: React.ReactNode;
  stepNumber: number;
  totalSteps: number;
  title: string;
  prevStep?: string;
  nextStep?: string;
  prevTitle?: string;
  nextTitle?: string;
}

const StepLayout: React.FC<StepLayoutProps> = ({
  children,
  stepNumber,
  totalSteps,
  title,
  prevStep,
  nextStep,
  prevTitle,
  nextTitle
}) => {
  const progressPercentage = (stepNumber / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
            <span className="text-sm text-gray-500">Step {stepNumber} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </div>

      {/* Navigation */}
      <div className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              {prevStep ? (
                <Link 
                  href={prevStep}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {prevTitle || `Step ${stepNumber - 1}`}
                  </span>
                </Link>
              ) : (
                <Link 
                  href="/"
                  className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Home className="w-4 h-4 mr-1" />
                  <span className="text-sm">Home</span>
                </Link>
              )}
            </div>

            <div className="flex-1 text-right">
              {nextStep ? (
                <Link 
                  href={nextStep}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span className="text-sm">
                    {nextTitle || `Step ${stepNumber + 1}`}
                  </span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              ) : (
                <Link 
                  href="/references"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span className="text-sm">References</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepLayout;
