'use client';

import React, { useState, useEffect } from 'react';
import StepLayout from '@/components/StepLayout';
import WarningBox from '@/components/WarningBox';
import CodeBlock from '@/components/CodeBlock';
import { Layers, Settings, Play, Eye } from 'lucide-react';

export default function Step3BuildModelPage() {
  const [model, setModel] = useState<any>(null);
  const [modelSummary, setModelSummary] = useState<string>('');
  const [isModelBuilt, setIsModelBuilt] = useState(false);

  const buildModelCode = `// Building CNN Model with TensorFlow.js
import * as tf from '@tensorflow/tfjs';

function createCNNModel() {
  const model = tf.sequential({
    layers: [
      // First Convolutional Layer
      tf.layers.conv2d({
        inputShape: [28, 28, 1],    // Input: 28x28 grayscale images
        filters: 32,                 // 32 feature maps
        kernelSize: 3,               // 3x3 convolution kernel
        activation: 'relu',          // ReLU activation function
        name: 'conv1'                // Layer name for debugging
      }),
      
      // First Pooling Layer
      tf.layers.maxPooling2d({
        poolSize: 2,                 // 2x2 pooling window
        name: 'pool1'
      }),
      
      // Second Convolutional Layer
      tf.layers.conv2d({
        filters: 64,                 // 64 feature maps
        kernelSize: 3,               // 3x3 convolution kernel
        activation: 'relu',
        name: 'conv2'
      }),
      
      // Second Pooling Layer
      tf.layers.maxPooling2d({
        poolSize: 2,
        name: 'pool2'
      }),
      
      // Flatten Layer
      tf.layers.flatten({
        name: 'flatten'
      }),
      
      // Dense Layer
      tf.layers.dense({
        units: 128,                  // 128 neurons
        activation: 'relu',
        name: 'dense1'
      }),
      
      // Dropout Layer
      tf.layers.dropout({
        rate: 0.5,                   // 50% dropout rate
        name: 'dropout'
      }),
      
      // Output Layer
      tf.layers.dense({
        units: 10,                   // 10 classes (digits 0-9)
        activation: 'softmax',       // Probability distribution
        name: 'output'
      })
    ]
  });
  
  return model;
}`;

  const compileModelCode = `// Compiling the Model
function compileModel(model) {
  model.compile({
    optimizer: 'adam',                    // Adam optimizer
    loss: 'categoricalCrossentropy',      // Loss function for classification
    metrics: ['accuracy']                 // Track accuracy during training
  });
  
  console.log('Model compiled successfully!');
  return model;
}`;

  const buildModel = async () => {
    try {
      // Dynamically import TensorFlow.js
      const tf = await import('@tensorflow/tfjs');
      
      // Create the model
      const newModel = tf.sequential({
        layers: [
          tf.layers.conv2d({
            inputShape: [28, 28, 1],
            filters: 32,
            kernelSize: 3,
            activation: 'relu',
            name: 'conv1'
          }),
          tf.layers.maxPooling2d({
            poolSize: 2,
            name: 'pool1'
          }),
          tf.layers.conv2d({
            filters: 64,
            kernelSize: 3,
            activation: 'relu',
            name: 'conv2'
          }),
          tf.layers.maxPooling2d({
            poolSize: 2,
            name: 'pool2'
          }),
          tf.layers.flatten({
            name: 'flatten'
          }),
          tf.layers.dense({
            units: 128,
            activation: 'relu',
            name: 'dense1'
          }),
          tf.layers.dropout({
            rate: 0.5,
            name: 'dropout'
          }),
          tf.layers.dense({
            units: 10,
            activation: 'softmax',
            name: 'output'
          })
        ]
      });

      // Compile the model
      newModel.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      });

      setModel(newModel);
      setIsModelBuilt(true);
      
      // Generate model summary
      const summary = newModel.summary();
      setModelSummary(summary.toString());
      
    } catch (error) {
      console.error('Error building model:', error);
    }
  };

  return (
    <StepLayout
      stepNumber={3}
      totalSteps={5}
      title="Build CNN Model"
      prevStep="/step2-dataset"
      prevTitle="Step 2: Dataset"
      nextStep="/step4-train"
      nextTitle="Step 4: Train Model"
    >
      <div className="space-y-8">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Layers className="w-6 h-6 text-blue-600 mr-3" />
            Building the CNN Model
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Now we'll create our CNN model using TensorFlow.js. This involves defining 
            the architecture, compiling the model with an optimizer and loss function, 
            and preparing it for training.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Layers className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 mb-2">8 Layers</h3>
              <p className="text-sm text-blue-700">
                2 Conv + 2 Pool + Flatten + Dense + Dropout + Output
              </p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Settings className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900 mb-2">225K Parameters</h3>
              <p className="text-sm text-green-700">
                Trainable weights and biases
              </p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Play className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900 mb-2">Adam Optimizer</h3>
              <p className="text-sm text-purple-700">
                Adaptive learning rate optimization
              </p>
            </div>
          </div>
        </div>

        {/* Model Architecture Code */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Model Architecture Code
          </h2>
          
          <p className="text-gray-700 mb-6">
            Here's the complete code to build our CNN model. Each layer is carefully 
            designed to extract features and make predictions.
          </p>

          <CodeBlock 
            code={buildModelCode}
            language="javascript"
            title="CNN Model Creation"
          />

          <WarningBox type="formula">
            <strong>Layer Output Size Calculation:</strong><br/>
            Conv2D: (input_size - kernel_size + 2*padding) / stride + 1<br/>
            MaxPool: input_size / pool_size<br/>
            Dense: units parameter determines output size
          </WarningBox>

          <WarningBox type="why">
            <strong>Why This Architecture:</strong> Two convolutional layers allow the 
            network to learn hierarchical features - simple edges in the first layer, 
            complex patterns in the second. Pooling reduces spatial dimensions while 
            preserving important information.
          </WarningBox>

          <WarningBox type="what">
            <strong>What Each Layer Learns:</strong> Conv1 learns edge detectors, 
            Conv2 learns shape detectors, Dense layers learn digit-specific patterns, 
            and Dropout prevents overfitting by randomly setting neurons to zero.
          </WarningBox>
        </div>

        {/* Model Compilation */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Compiling the Model
          </h2>
          
          <p className="text-gray-700 mb-6">
            After creating the model, we need to compile it with an optimizer, 
            loss function, and metrics. This tells TensorFlow.js how to train the model.
          </p>

          <CodeBlock 
            code={compileModelCode}
            language="javascript"
            title="Model Compilation"
          />

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Adam Optimizer</h3>
              <p className="text-sm text-blue-700">
                Adaptive learning rate that adjusts automatically during training. 
                Combines momentum and RMSprop for efficient optimization.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Categorical Crossentropy</h3>
              <p className="text-sm text-green-700">
                Loss function for multi-class classification. Measures difference 
                between predicted probabilities and true labels.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Accuracy Metric</h3>
              <p className="text-sm text-purple-700">
                Tracks percentage of correct predictions during training. 
                Helps monitor model performance in real-time.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Model Builder */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Play className="w-6 h-6 text-green-600 mr-3" />
            Build Your Model
          </h2>
          
          <p className="text-gray-700 mb-6">
            Click the button below to build the CNN model in your browser. 
            This will create the model and show you its architecture summary.
          </p>

          <div className="text-center mb-6">
            <button
              onClick={buildModel}
              disabled={isModelBuilt}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
                isModelBuilt
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isModelBuilt ? 'Model Built Successfully!' : 'Build CNN Model'}
            </button>
          </div>

          {isModelBuilt && (
            <div className="space-y-6">
              <WarningBox type="tip">
                <strong>Success!</strong> Your CNN model has been created and compiled. 
                The model is now ready for training. You can see the architecture summary below.
              </WarningBox>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Summary</h3>
                <div className="bg-white p-4 rounded border overflow-x-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {modelSummary || 'Model summary will appear here...'}
                  </pre>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Model Ready</h3>
                  <p className="text-sm text-blue-700">
                    Your CNN model is compiled and ready for training. 
                    All layers are properly connected and initialized.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Next Step</h3>
                  <p className="text-sm text-green-700">
                    Now we can start training the model with our MNIST dataset. 
                    This will teach the model to recognize handwritten digits.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Layer Visualization */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Eye className="w-6 h-6 text-purple-600 mr-3" />
            Model Architecture Visualization
          </h2>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-4">
              {/* Input Layer */}
              <div className="flex items-center justify-center p-4 bg-blue-100 rounded-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-blue-800 font-bold">28×28×1</span>
                  </div>
                  <span className="text-sm font-medium text-blue-800">Input Image</span>
                </div>
              </div>

              {/* Conv1 */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-0.5 bg-gray-400"></div>
              </div>
              <div className="flex items-center justify-center p-4 bg-green-100 rounded-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-green-800 font-bold">26×26×32</span>
                  </div>
                  <span className="text-sm font-medium text-green-800">Conv2D (32 filters)</span>
                </div>
              </div>

              {/* Pool1 */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-0.5 bg-gray-400"></div>
              </div>
              <div className="flex items-center justify-center p-4 bg-purple-100 rounded-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-purple-800 font-bold">13×13×32</span>
                  </div>
                  <span className="text-sm font-medium text-purple-800">MaxPool2D</span>
                </div>
              </div>

              {/* Conv2 */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-0.5 bg-gray-400"></div>
              </div>
              <div className="flex items-center justify-center p-4 bg-orange-100 rounded-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-orange-800 font-bold">11×11×64</span>
                  </div>
                  <span className="text-sm font-medium text-orange-800">Conv2D (64 filters)</span>
                </div>
              </div>

              {/* Pool2 */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-0.5 bg-gray-400"></div>
              </div>
              <div className="flex items-center justify-center p-4 bg-red-100 rounded-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-red-800 font-bold">5×5×64</span>
                  </div>
                  <span className="text-sm font-medium text-red-800">MaxPool2D</span>
                </div>
              </div>

              {/* Flatten */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-0.5 bg-gray-400"></div>
              </div>
              <div className="flex items-center justify-center p-4 bg-indigo-100 rounded-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-indigo-800 font-bold">1600</span>
                  </div>
                  <span className="text-sm font-medium text-indigo-800">Flatten</span>
                </div>
              </div>

              {/* Dense */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-0.5 bg-gray-400"></div>
              </div>
              <div className="flex items-center justify-center p-4 bg-pink-100 rounded-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-pink-800 font-bold">128</span>
                  </div>
                  <span className="text-sm font-medium text-pink-800">Dense + Dropout</span>
                </div>
              </div>

              {/* Output */}
              <div className="flex items-center justify-center">
                <div className="w-8 h-0.5 bg-gray-400"></div>
              </div>
              <div className="flex items-center justify-center p-4 bg-yellow-100 rounded-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-yellow-800 font-bold">10</span>
                  </div>
                  <span className="text-sm font-medium text-yellow-800">Output (Softmax)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Model Built Successfully!</h2>
          <p className="text-lg mb-6 opacity-90">
            Your CNN model is ready for training. Let's feed it the MNIST data 
            and watch it learn to recognize handwritten digits!
          </p>
        </div>
      </div>
    </StepLayout>
  );
}
