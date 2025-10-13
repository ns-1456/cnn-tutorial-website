import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, Users, Target } from 'lucide-react';
import WarningBox from '@/components/WarningBox';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Build and Visualize CNNs from Scratch
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn how to create, train, and understand Convolutional Neural Networks 
            using TensorFlow.js and MNIST dataset with interactive visualizations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/getting-started"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Learning
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/step5-visualize"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              See Demo
            </Link>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Introduction</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              This tutorial will teach you how to build a Convolutional Neural Network (CNN) 
              that can classify handwritten digits from the MNIST dataset. You'll learn not 
              just how to create the model, but also how to visualize and understand what 
              the network learns at each layer.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>CNN architecture design principles</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>TensorFlow.js model implementation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Training process and optimization</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Layer visualization and analysis</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Feature map interpretation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Mathematical foundations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Interactive demonstrations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Real-time training visualization</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scope Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Scope</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                What We'll Cover
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Building CNN architecture from scratch</li>
                <li>• Training process with MNIST dataset</li>
                <li>• Layer-by-layer visualization</li>
                <li>• Feature map analysis</li>
                <li>• Mathematical foundations</li>
                <li>• Interactive demonstrations</li>
                <li>• Real-time training monitoring</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                What We Won't Cover
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Advanced architectures (ResNet, Transformer)</li>
                <li>• Production deployment strategies</li>
                <li>• Hyperparameter optimization algorithms</li>
                <li>• Model compression techniques</li>
                <li>• Multi-GPU training</li>
                <li>• Custom dataset creation</li>
                <li>• Model serving and APIs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Target Audience</h2>
          
          <div className="flex items-start mb-6">
            <Users className="w-6 h-6 text-blue-600 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Who This Tutorial Is For</h3>
              <p className="text-gray-700 mb-4">
                This tutorial is designed for computer science students, data science beginners, 
                and anyone interested in understanding how CNNs work internally. No prior 
                experience with neural networks is required, but basic programming knowledge 
                is helpful.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Beginners</h4>
              <p className="text-sm text-blue-700">
                New to neural networks? Start here for a solid foundation.
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Students</h4>
              <p className="text-sm text-green-700">
                Perfect for computer science and data science courses.
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Enthusiasts</h4>
              <p className="text-sm text-purple-700">
                Want to understand CNN internals? This is for you.
              </p>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prerequisites</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Knowledge</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">Basic JavaScript/TypeScript</span>
                    <p className="text-sm text-gray-600">Understanding of variables, functions, and arrays</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">Linear Algebra Basics</span>
                    <p className="text-sm text-gray-600">Matrices, vectors, and basic operations</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">Web Browser</span>
                    <p className="text-sm text-gray-600">Modern browser with JavaScript enabled</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <span className="font-medium">Total Time: 2-3 hours</span>
                    <p className="text-sm text-gray-600">Complete tutorial with hands-on practice</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <span className="font-medium">Per Step: 20-30 minutes</span>
                    <p className="text-sm text-gray-600">Each step includes theory and practice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="text-center">
          <Link 
            href="/getting-started"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Let's Get Started
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}