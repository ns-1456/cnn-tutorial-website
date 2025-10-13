import React from 'react';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, Monitor, Cpu, HardDrive, Wifi } from 'lucide-react';
import WarningBox from '@/components/WarningBox';

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Getting Started
          </h1>
          <p className="text-lg text-gray-600">
            Before we begin building your CNN, let's ensure you have everything you need 
            and understand the important safety considerations.
          </p>
        </div>

        {/* Warnings Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 text-orange-500 mr-3" />
            Important Warnings & Cautions
          </h2>
          
          <div className="space-y-4">
            <WarningBox type="danger" title="Critical Warning">
              <strong>Do not close your browser tab during training!</strong> The training process 
              cannot be paused and resumed. If you close the tab, you'll lose all progress and 
              need to start over from the beginning.
            </WarningBox>

            <WarningBox type="warning" title="Performance Warning">
              <strong>Training may take 5-10 minutes</strong> depending on your hardware. 
              The process is computationally intensive and may slow down your browser temporarily. 
              Close other tabs to free up memory.
            </WarningBox>

            <WarningBox type="caution" title="Browser Compatibility">
              <strong>Use Chrome or Edge for best performance.</strong> These browsers have 
              better GPU acceleration support for TensorFlow.js. Firefox and Safari may work 
              but could be significantly slower.
            </WarningBox>

            <WarningBox type="note" title="Data Usage">
              The MNIST dataset will be automatically downloaded (~11MB). Ensure you have 
              a stable internet connection for the initial setup.
            </WarningBox>
          </div>
        </div>

        {/* Equipment & Supplies */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Equipment & Supplies
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tools */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Monitor className="w-5 h-5 mr-2 text-blue-600" />
                Required Tools
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <span className="font-medium">Modern Web Browser</span>
                    <p className="text-sm text-gray-600">Chrome 90+, Edge 90+, Firefox 88+, Safari 14+</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <span className="font-medium">Text Editor (Optional)</span>
                    <p className="text-sm text-gray-600">VS Code, Sublime Text, or any editor for code examples</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <span className="font-medium">Internet Connection</span>
                    <p className="text-sm text-gray-600">Stable connection for downloading libraries and datasets</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Materials */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <HardDrive className="w-5 h-5 mr-2 text-green-600" />
                Materials & Libraries
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <span className="font-medium">TensorFlow.js</span>
                    <p className="text-sm text-gray-600">Loaded automatically via CDN</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <span className="font-medium">MNIST Dataset</span>
                    <p className="text-sm text-gray-600">60,000 training images, 10,000 test images</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <span className="font-medium">Pre-trained Weights</span>
                    <p className="text-sm text-gray-600">Optional: For comparison and analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hardware Requirements */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Cpu className="w-6 h-6 text-purple-600 mr-3" />
            Hardware Requirements
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-900 mb-2">Minimum</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>4GB RAM</li>
                <li>Any modern CPU</li>
                <li>Stable internet</li>
              </ul>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Recommended</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>8GB+ RAM</li>
                <li>Multi-core CPU</li>
                <li>GPU acceleration</li>
              </ul>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-purple-900 mb-2">Optimal</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>16GB+ RAM</li>
                <li>Modern GPU</li>
                <li>Fast SSD storage</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Environment Setup */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Environment Setup
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 1: Browser Check</h3>
              <p className="text-gray-700 mb-4">
                Ensure you're using a modern browser with JavaScript enabled. Open your browser's 
                developer console (F12) to check for any errors.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Quick Test:</strong> Open browser console and type: <code className="bg-gray-200 px-2 py-1 rounded">console.log("Hello World")</code>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 2: Internet Connection</h3>
              <p className="text-gray-700 mb-4">
                Verify you have a stable internet connection. The tutorial will download 
                TensorFlow.js (~2MB) and MNIST dataset (~11MB) automatically.
              </p>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <Wifi className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-sm text-blue-700">
                  <strong>Required:</strong> Minimum 1 Mbps download speed for smooth experience
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 3: Close Unnecessary Tabs</h3>
              <p className="text-gray-700 mb-4">
                Close other browser tabs and applications to free up memory. Training 
                neural networks is memory-intensive and requires available RAM.
              </p>
              <WarningBox type="tip">
                <strong>Pro Tip:</strong> Keep only this tutorial tab open during training. 
                You can bookmark other tabs and reopen them later.
              </WarningBox>
            </div>
          </div>
        </div>

        {/* Ready to Start */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your First CNN?</h2>
          <p className="text-lg mb-6 opacity-90">
            You now have everything you need to start building and visualizing CNNs!
          </p>
          <Link 
            href="/step1-architecture"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Step 1: Understanding CNN Architecture
            <CheckCircle className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
