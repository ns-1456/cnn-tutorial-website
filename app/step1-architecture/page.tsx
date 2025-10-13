import React from 'react';
import StepLayout from '@/components/StepLayout';
import WarningBox from '@/components/WarningBox';
import CodeBlock from '@/components/CodeBlock';
import { Brain, Layers, Zap, Target } from 'lucide-react';

export default function Step1ArchitecturePage() {
  const architectureCode = `// CNN Architecture Overview
const model = tf.sequential({
  layers: [
    // Input: 28x28x1 (grayscale image)
    tf.layers.conv2d({
      inputShape: [28, 28, 1],
      filters: 32,        // 32 feature maps
      kernelSize: 3,      // 3x3 convolution kernel
      activation: 'relu' // ReLU activation
    }),
    
    // Max Pooling: Reduces spatial dimensions
    tf.layers.maxPooling2d({
      poolSize: 2         // 2x2 pooling window
    }),
    
    // Second Convolutional Layer
    tf.layers.conv2d({
      filters: 64,        // 64 feature maps
      kernelSize: 3,      // 3x3 convolution kernel
      activation: 'relu'
    }),
    
    // Second Pooling Layer
    tf.layers.maxPooling2d({
      poolSize: 2
    }),
    
    // Flatten: Convert 2D to 1D
    tf.layers.flatten(),
    
    // Dense Layer: Fully connected
    tf.layers.dense({
      units: 128,         // 128 neurons
      activation: 'relu'
    }),
    
    // Dropout: Prevent overfitting
    tf.layers.dropout({
      rate: 0.5           // 50% dropout
    }),
    
    // Output Layer: 10 classes (digits 0-9)
    tf.layers.dense({
      units: 10,          // 10 output neurons
      activation: 'softmax' // Probability distribution
    })
  ]
});`;

  return (
    <StepLayout
      stepNumber={1}
      totalSteps={5}
      title="Understanding CNN Architecture"
      nextStep="/step2-dataset"
      nextTitle="Step 2: Prepare Dataset"
    >
      <div className="space-y-8">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Brain className="w-6 h-6 text-blue-600 mr-3" />
            What is a Convolutional Neural Network?
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            A Convolutional Neural Network (CNN) is a specialized type of neural network 
            designed for processing grid-like data such as images. Unlike traditional neural 
            networks that treat each pixel independently, CNNs use convolutional layers 
            to detect local patterns and features in images.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Layers className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 mb-2">Hierarchical Features</h3>
              <p className="text-sm text-blue-700">
                Learns simple features (edges) first, then complex patterns (shapes, objects)
              </p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900 mb-2">Translation Invariant</h3>
              <p className="text-sm text-green-700">
                Recognizes patterns regardless of their position in the image
              </p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900 mb-2">Parameter Sharing</h3>
              <p className="text-sm text-purple-700">
                Same filters used across entire image, reducing parameters
              </p>
            </div>
          </div>
        </div>

        {/* Architecture Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Our CNN Architecture
          </h2>
          
          <p className="text-gray-700 mb-6">
            We'll build a CNN with two convolutional layers, two pooling layers, 
            and two dense layers. This architecture is perfect for MNIST digit classification.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Architecture Flow</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <span className="text-gray-700">Input: 28×28×1 grayscale image</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold text-sm">2</span>
                </div>
                <span className="text-gray-700">Conv1: 32 filters, 3×3 kernel → 26×26×32</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-bold text-sm">3</span>
                </div>
                <span className="text-gray-700">Pool1: 2×2 max pooling → 13×13×32</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-orange-600 font-bold text-sm">4</span>
                </div>
                <span className="text-gray-700">Conv2: 64 filters, 3×3 kernel → 11×11×64</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-600 font-bold text-sm">5</span>
                </div>
                <span className="text-gray-700">Pool2: 2×2 max pooling → 5×5×64</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold text-sm">6</span>
                </div>
                <span className="text-gray-700">Flatten: 5×5×64 → 1600 neurons</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-pink-600 font-bold text-sm">7</span>
                </div>
                <span className="text-gray-700">Dense: 128 neurons with ReLU</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-yellow-600 font-bold text-sm">8</span>
                </div>
                <span className="text-gray-700">Output: 10 neurons (digits 0-9)</span>
              </div>
            </div>
          </div>

          <CodeBlock 
            code={architectureCode}
            language="javascript"
            title="Complete CNN Architecture Code"
          />
        </div>

        {/* Layer Explanations */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Understanding Each Layer
          </h2>
          
          <div className="space-y-6">
            {/* Convolutional Layer */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Convolutional Layers</h3>
              <p className="text-gray-700 mb-4">
                Convolutional layers apply filters (kernels) to detect features like edges, 
                corners, and textures. Each filter slides across the image, computing dot 
                products to create feature maps.
              </p>
              
              <WarningBox type="formula">
                <strong>Convolution Formula:</strong><br/>
                Y[i,j,k] = ReLU(Σ(X[i+m,j+n] * W[m,n,k]) + b[k])<br/>
                Where X is input, W is filter weights, b is bias, and ReLU is activation function.
              </WarningBox>
              
              <WarningBox type="why">
                <strong>Why Convolution Works:</strong> Convolutional layers are inspired by 
                the visual cortex in animals. They detect local patterns that are translation-invariant, 
                meaning the same feature detector can recognize an edge anywhere in the image.
              </WarningBox>
              
              <WarningBox type="what">
                <strong>What It Learns:</strong> First layer typically learns edge detectors 
                (horizontal, vertical, diagonal), corner detectors, and simple textures. 
                Second layer combines these to detect more complex patterns like curves and shapes.
              </WarningBox>
            </div>

            {/* Pooling Layer */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pooling Layers</h3>
              <p className="text-gray-700 mb-4">
                Pooling layers reduce spatial dimensions while preserving important information. 
                Max pooling takes the maximum value in each region, making the network more robust 
                to small translations.
              </p>
              
              <WarningBox type="formula">
                <strong>Max Pooling Formula:</strong><br/>
                Y[i,j] = max(X[2i:2i+2, 2j:2j+2])<br/>
                Takes maximum value in each 2×2 region.
              </WarningBox>
              
              <WarningBox type="why">
                <strong>Why Pooling Works:</strong> Pooling reduces computational load and 
                prevents overfitting by providing translation invariance. It also helps the 
                network focus on the most important features in each region.
              </WarningBox>
              
              <WarningBox type="what">
                <strong>What It Learns:</strong> Pooling doesn't learn parameters but helps 
                the network become more robust to small shifts in input and reduces sensitivity 
                to exact pixel locations.
              </WarningBox>
            </div>

            {/* Dense Layer */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Dense (Fully Connected) Layers</h3>
              <p className="text-gray-700 mb-4">
                Dense layers connect every neuron from the previous layer to every neuron 
                in the current layer. They combine all learned features to make final predictions.
              </p>
              
              <WarningBox type="formula">
                <strong>Dense Layer Formula:</strong><br/>
                Y = ReLU(XW + b)<br/>
                Where X is input vector, W is weight matrix, b is bias vector.
              </WarningBox>
              
              <WarningBox type="why">
                <strong>Why Dense Layers Work:</strong> After convolutional layers extract 
                features, dense layers learn complex combinations of these features to make 
                high-level decisions about classification.
              </WarningBox>
              
              <WarningBox type="what">
                <strong>What It Learns:</strong> The dense layer learns which combinations 
                of features correspond to each digit class. For example, it might learn that 
                certain edge patterns combined with specific shapes indicate the digit "8".
              </WarningBox>
            </div>
          </div>
        </div>

        {/* Mathematical Foundations */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Mathematical Foundations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Concepts</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Convolution:</strong> Mathematical operation combining two functions</li>
                <li>• <strong>ReLU:</strong> f(x) = max(0, x) - introduces non-linearity</li>
                <li>• <strong>Softmax:</strong> Converts logits to probabilities</li>
                <li>• <strong>Cross-entropy:</strong> Loss function for classification</li>
                <li>• <strong>Adam:</strong> Adaptive learning rate optimizer</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Parameter Count</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Conv1:</span>
                    <span>896 parameters</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conv2:</span>
                    <span>18,496 parameters</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dense1:</span>
                    <span>204,928 parameters</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Output:</span>
                    <span>1,290 parameters</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-1 mt-2">
                    <span>Total:</span>
                    <span>225,610 parameters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-lg mb-6 opacity-90">
            Now that you understand the architecture, let's prepare the MNIST dataset 
            and start building our CNN!
          </p>
        </div>
      </div>
    </StepLayout>
  );
}
