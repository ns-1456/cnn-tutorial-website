'use client';

import React, { useState, useEffect } from 'react';
import StepLayout from '@/components/StepLayout';
import WarningBox from '@/components/WarningBox';
import CodeBlock from '@/components/CodeBlock';
import { Database, Eye, Download, BarChart3 } from 'lucide-react';

export default function Step2DatasetPage() {
  const [mnistData, setMnistData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [imageData, setImageData] = useState<number[]>([]);

  const loadMNISTData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://storage.googleapis.com/tfjs-tutorials/mnist_data.json');
      const data = await response.json();
      setMnistData(data);
      
      // Set first image as default
      if (data.train_images && data.train_images.length > 0) {
        setImageData(data.train_images[0]);
      }
    } catch (error) {
      console.error('Error loading MNIST data:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectRandomImage = () => {
    if (mnistData && mnistData.train_images) {
      const randomIndex = Math.floor(Math.random() * mnistData.train_images.length);
      setSelectedImage(randomIndex);
      setImageData(mnistData.train_images[randomIndex]);
    }
  };

  const renderImage = (pixels: number[]) => {
    const canvas = document.createElement('canvas');
    canvas.width = 28;
    canvas.height = 28;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const imageData = ctx.createImageData(28, 28);
      for (let i = 0; i < pixels.length; i++) {
        const pixelValue = Math.floor(pixels[i] * 255);
        imageData.data[i * 4] = pixelValue;     // R
        imageData.data[i * 4 + 1] = pixelValue; // G
        imageData.data[i * 4 + 2] = pixelValue; // B
        imageData.data[i * 4 + 3] = 255;        // A
      }
      ctx.putImageData(imageData, 0, 0);
    }
    
    return canvas.toDataURL();
  };

  const dataLoadingCode = `// Loading MNIST Dataset
async function loadMNISTData() {
  try {
    // Fetch MNIST data from Google's TensorFlow.js repository
    const response = await fetch(
      'https://storage.googleapis.com/tfjs-tutorials/mnist_data.json'
    );
    const data = await response.json();
    
    // Convert to TensorFlow.js tensors
    const trainImages = tf.tensor4d(
      data.train_images, 
      [data.train_images.length, 28, 28, 1]
    );
    const trainLabels = tf.oneHot(
      tf.tensor1d(data.train_labels, 'int32'), 
      10
    );
    const testImages = tf.tensor4d(
      data.test_images, 
      [data.test_images.length, 28, 28, 1]
    );
    const testLabels = tf.oneHot(
      tf.tensor1d(data.test_labels, 'int32'), 
      10
    );
    
    return {
      trainImages,
      trainLabels,
      testImages,
      testLabels
    };
  } catch (error) {
    console.error('Error loading MNIST data:', error);
    throw error;
  }
}`;

  const preprocessingCode = `// Data Preprocessing
function preprocessData(images, labels) {
  // Normalize pixel values to [0, 1] range
  const normalizedImages = images.div(255.0);
  
  // Convert labels to one-hot encoding
  const oneHotLabels = tf.oneHot(labels, 10);
  
  // Shuffle data for better training
  const shuffledIndices = tf.randomUniform([images.shape[0]], 0, images.shape[0], 'int32');
  const shuffledImages = tf.gather(normalizedImages, shuffledIndices);
  const shuffledLabels = tf.gather(oneHotLabels, shuffledIndices);
  
  return {
    images: shuffledImages,
    labels: shuffledLabels
  };
}`;

  useEffect(() => {
    loadMNISTData();
  }, []);

  return (
    <StepLayout
      stepNumber={2}
      totalSteps={5}
      title="Prepare MNIST Dataset"
      prevStep="/step1-architecture"
      prevTitle="Step 1: Architecture"
      nextStep="/step3-build-model"
      nextTitle="Step 3: Build Model"
    >
      <div className="space-y-8">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Database className="w-6 h-6 text-blue-600 mr-3" />
            MNIST Dataset Overview
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            The MNIST dataset contains 70,000 handwritten digit images (0-9) collected 
            from high school students and Census Bureau employees. It's the "Hello World" 
            of computer vision and perfect for learning CNNs.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 mb-2">60,000 Training Images</h3>
              <p className="text-sm text-blue-700">
                Used to train the model and learn patterns
              </p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900 mb-2">10,000 Test Images</h3>
              <p className="text-sm text-green-700">
                Used to evaluate model performance
              </p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900 mb-2">28×28 Grayscale</h3>
              <p className="text-sm text-purple-700">
                Each image is 28×28 pixels, single channel
              </p>
            </div>
          </div>
        </div>

        {/* Dataset Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Dataset Statistics
          </h2>
          
          {mnistData ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Set</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Total Images:</span>
                    <span className="text-blue-600 font-semibold">{mnistData.train_images.length.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Image Size:</span>
                    <span className="text-green-600 font-semibold">28 × 28 pixels</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Channels:</span>
                    <span className="text-purple-600 font-semibold">1 (grayscale)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Classes:</span>
                    <span className="text-orange-600 font-semibold">10 (digits 0-9)</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Set</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Total Images:</span>
                    <span className="text-blue-600 font-semibold">{mnistData.test_images.length.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Image Size:</span>
                    <span className="text-green-600 font-semibold">28 × 28 pixels</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Channels:</span>
                    <span className="text-purple-600 font-semibold">1 (grayscale)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Classes:</span>
                    <span className="text-orange-600 font-semibold">10 (digits 0-9)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading MNIST dataset...</p>
            </div>
          )}
        </div>

        {/* Interactive Image Viewer */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Eye className="w-6 h-6 text-green-600 mr-3" />
            Interactive Image Viewer
          </h2>
          
          <p className="text-gray-700 mb-6">
            Explore the MNIST dataset interactively. Click "Load Random Image" to see 
            different handwritten digits and their labels.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Sample Images</h3>
                <button
                  onClick={selectRandomImage}
                  disabled={loading || !mnistData}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Load Random Image
                </button>
              </div>
              
              {imageData.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <img 
                      src={renderImage(imageData)} 
                      alt="MNIST digit"
                      className="mx-auto border-2 border-gray-300 rounded-lg"
                      style={{ width: '140px', height: '140px', imageRendering: 'pixelated' }}
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Image Index: {selectedImage}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      Label: {mnistData?.train_labels[selectedImage]}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No image loaded
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pixel Values</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  Each pixel value ranges from 0 (black) to 1 (white)
                </p>
                {imageData.length > 0 && (
                  <div className="grid grid-cols-14 gap-1 text-xs">
                    {imageData.slice(0, 196).map((pixel, index) => (
                      <div
                        key={index}
                        className="w-2 h-2 rounded"
                        style={{ 
                          backgroundColor: `rgba(0, 0, 0, ${1 - pixel})`,
                          border: '1px solid #e5e7eb'
                        }}
                        title={`Pixel ${index}: ${pixel.toFixed(3)}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Data Loading Code */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Loading MNIST Data
          </h2>
          
          <p className="text-gray-700 mb-6">
            Here's how we load and preprocess the MNIST dataset for our CNN training.
          </p>

          <CodeBlock 
            code={dataLoadingCode}
            language="javascript"
            title="MNIST Data Loading Function"
          />

          <WarningBox type="note">
            <strong>Data Source:</strong> We're using Google's TensorFlow.js repository 
            which hosts the MNIST dataset in JSON format. The data is automatically 
            downloaded when you run the code.
          </WarningBox>

          <CodeBlock 
            code={preprocessingCode}
            language="javascript"
            title="Data Preprocessing Function"
          />

          <WarningBox type="why">
            <strong>Why Preprocessing Matters:</strong> Normalizing pixel values to [0,1] 
            range helps the neural network converge faster. One-hot encoding converts 
            categorical labels to vectors that work better with softmax output.
          </WarningBox>

          <WarningBox type="what">
            <strong>What We Get:</strong> After preprocessing, we have normalized images 
            and one-hot encoded labels ready for training. The data is shuffled to 
            prevent any ordering bias during training.
          </WarningBox>
        </div>

        {/* Data Visualization */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Data Visualization
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Distribution</h3>
              <div className="space-y-2">
                {mnistData && Array.from({length: 10}, (_, i) => {
                  const trainCount = mnistData.train_labels.filter((label: number) => label === i).length;
                  const testCount = mnistData.test_labels.filter((label: number) => label === i).length;
                  return (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-medium">Digit {i}:</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-blue-600">{trainCount} train</span>
                        <span className="text-green-600">{testCount} test</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dataset Size</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Training Images:</span>
                  <span className="text-blue-600 font-semibold">
                    {mnistData?.train_images.length.toLocaleString() || 'Loading...'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Test Images:</span>
                  <span className="text-green-600 font-semibold">
                    {mnistData?.test_images.length.toLocaleString() || 'Loading...'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Total Size:</span>
                  <span className="text-purple-600 font-semibold">
                    {mnistData ? ((mnistData.train_images.length + mnistData.test_images.length) * 28 * 28 / 1024 / 1024).toFixed(1) + ' MB' : 'Loading...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Dataset Ready!</h2>
          <p className="text-lg mb-6 opacity-90">
            Now that we understand our data, let's build the CNN model architecture 
            and start training!
          </p>
        </div>
      </div>
    </StepLayout>
  );
}
