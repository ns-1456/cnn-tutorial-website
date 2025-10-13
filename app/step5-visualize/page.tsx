'use client';

import React, { useState, useEffect } from 'react';
import StepLayout from '@/components/StepLayout';
import WarningBox from '@/components/WarningBox';
import CodeBlock from '@/components/CodeBlock';
import { Eye, Layers, BarChart3, Download, Play } from 'lucide-react';

export default function Step5VisualizePage() {
  const [selectedLayer, setSelectedLayer] = useState('conv1');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);

  // Mock feature maps for demonstration
  const mockFeatureMaps = {
    conv1: Array.from({length: 32}, (_, i) => ({
      id: i,
      name: `Feature Map ${i + 1}`,
      description: i < 8 ? 'Edge Detector' : i < 16 ? 'Corner Detector' : 'Texture Detector'
    })),
    conv2: Array.from({length: 64}, (_, i) => ({
      id: i,
      name: `Feature Map ${i + 1}`,
      description: i < 16 ? 'Shape Detector' : i < 32 ? 'Pattern Detector' : 'Complex Feature'
    }))
  };

  const visualizationCode = `// CNN Visualization Code
import * as tf from '@tensorflow/tfjs';

// Extract feature maps from a specific layer
async function visualizeLayer(model, inputImage, layerName) {
  // Create a new model that outputs intermediate layers
  const layerModel = tf.model({
    inputs: model.input,
    outputs: model.getLayer(layerName).output
  });
  
  // Get feature maps
  const featureMaps = layerModel.predict(inputImage);
  
  // Convert to array for visualization
  const featureMapArray = await featureMaps.data();
  
  return featureMapArray;
}

// Visualize all layers
async function visualizeAllLayers(model, inputImage) {
  const layers = ['conv1', 'pool1', 'conv2', 'pool2'];
  const visualizations = {};
  
  for (const layerName of layers) {
    const featureMaps = await visualizeLayer(model, inputImage, layerName);
    visualizations[layerName] = featureMaps;
  }
  
  return visualizations;
}`;

  const analysisCode = `// Feature Map Analysis
function analyzeFeatureMaps(featureMaps, layerName) {
  const analysis = {
    layer: layerName,
    numFilters: featureMaps.shape[3],
    spatialSize: featureMaps.shape.slice(1, 3),
    activations: []
  };
  
  // Analyze each filter
  for (let i = 0; i < featureMaps.shape[3]; i++) {
    const filterData = featureMaps.slice([0, 0, 0, i], [1, -1, -1, 1]);
    const maxActivation = filterData.max().dataSync()[0];
    const meanActivation = filterData.mean().dataSync()[0];
    
    analysis.activations.push({
      filter: i,
      maxActivation,
      meanActivation,
      active: maxActivation > 0.5
    });
  }
  
  return analysis;
}`;

  return (
    <StepLayout
      stepNumber={5}
      totalSteps={5}
      title="Visualize and Analyze Results"
      prevStep="/step4-train"
      prevTitle="Step 4: Train Model"
      nextStep="/references"
      nextTitle="References"
    >
      <div className="space-y-8">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Eye className="w-6 h-6 text-blue-600 mr-3" />
            CNN Visualization & Analysis
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Now that our CNN is trained, let's explore what it has learned! We'll visualize 
            feature maps, analyze layer activations, and understand how the model makes 
            decisions. This is where the magic of deep learning becomes visible.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Layers className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 mb-2">Feature Maps</h3>
              <p className="text-sm text-blue-700">
                Visualize what each filter detects
              </p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900 mb-2">Activation Analysis</h3>
              <p className="text-sm text-green-700">
                Understand layer responses
              </p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Play className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900 mb-2">Interactive Demo</h3>
              <p className="text-sm text-purple-700">
                Explore different inputs
              </p>
            </div>
          </div>
        </div>

        {/* Visualization Methods */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Visualization Methods
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Feature Map Visualization</h3>
              <p className="text-gray-700 mb-4">
                Feature maps show what each convolutional filter detects in the input image. 
                Each filter learns to detect specific patterns like edges, corners, or textures.
              </p>
              
              <WarningBox type="why">
                <strong>Why Feature Maps Matter:</strong> They reveal the hierarchical 
                nature of CNNs - early layers detect simple features (edges), while 
                deeper layers detect complex patterns (shapes, objects).
              </WarningBox>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Activation Analysis</h3>
              <p className="text-gray-700 mb-4">
                We can analyze which neurons are most active for different inputs, 
                helping us understand what the model focuses on when making predictions.
              </p>
              
              <WarningBox type="what">
                <strong>What Activations Tell Us:</strong> High activations indicate 
                strong feature detection. By analyzing activation patterns, we can 
                understand which features are important for each digit class.
              </WarningBox>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Gradient-Based Methods</h3>
              <p className="text-gray-700 mb-4">
                Techniques like Grad-CAM show which parts of the input image most 
                influenced the model's decision, providing insight into the decision-making process.
              </p>
              
              <WarningBox type="formula">
                <strong>Grad-CAM Formula:</strong><br/>
                L^c_Grad-CAM = ReLU(Σ α^c_k A^k)<br/>
                Where α^c_k = (1/Z) Σ (∂y^c/∂A^k_ij)
              </WarningBox>
            </div>
          </div>
        </div>

        {/* Visualization Code */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Visualization Implementation
          </h2>
          
          <p className="text-gray-700 mb-6">
            Here's how we can extract and visualize feature maps from our trained CNN model.
          </p>

          <CodeBlock 
            code={visualizationCode}
            language="javascript"
            title="Feature Map Extraction"
          />

          <CodeBlock 
            code={analysisCode}
            language="javascript"
            title="Feature Map Analysis"
          />

          <WarningBox type="note">
            <strong>Implementation Note:</strong> We create intermediate models that output 
            specific layers, allowing us to examine the internal representations without 
            affecting the original model's predictions.
          </WarningBox>
        </div>

        {/* Interactive Visualization */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Interactive Feature Map Explorer
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Layer Selection</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedLayer('conv1')}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedLayer === 'conv1' 
                      ? 'bg-blue-100 border-2 border-blue-500' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">Conv1 Layer</div>
                  <div className="text-sm text-gray-600">32 filters, 26×26×32 output</div>
                </button>
                
                <button
                  onClick={() => setSelectedLayer('conv2')}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedLayer === 'conv2' 
                      ? 'bg-blue-100 border-2 border-blue-500' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">Conv2 Layer</div>
                  <div className="text-sm text-gray-600">64 filters, 11×11×64 output</div>
                </button>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Sample Images</h4>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({length: 10}, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`p-2 rounded border-2 transition-colors ${
                        selectedImage === i 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                        {i}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Feature Maps - {selectedLayer.toUpperCase()}
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-4 gap-2">
                  {mockFeatureMaps[selectedLayer as keyof typeof mockFeatureMaps].slice(0, 16).map((feature) => (
                    <div key={feature.id} className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded border-2 border-gray-300 mb-1"></div>
                      <div className="text-xs text-gray-600">{feature.id + 1}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Filters:</span>
                  <span className="font-semibold">{mockFeatureMaps[selectedLayer as keyof typeof mockFeatureMaps].length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Filters:</span>
                  <span className="font-semibold text-green-600">
                    {Math.floor(mockFeatureMaps[selectedLayer as keyof typeof mockFeatureMaps].length * 0.7)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Activation:</span>
                  <span className="font-semibold text-blue-600">0.42</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Layer-by-Layer Analysis
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Conv1 Layer Analysis</h3>
              <p className="text-sm text-blue-700 mb-3">
                The first convolutional layer learns basic edge detectors and simple patterns.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div className="bg-white p-2 rounded text-center">
                  <div className="font-semibold">8 Edge Detectors</div>
                  <div className="text-gray-600">Horizontal, vertical, diagonal</div>
                </div>
                <div className="bg-white p-2 rounded text-center">
                  <div className="font-semibold">8 Corner Detectors</div>
                  <div className="text-gray-600">L-shapes, T-shapes</div>
                </div>
                <div className="bg-white p-2 rounded text-center">
                  <div className="font-semibold">8 Texture Detectors</div>
                  <div className="text-gray-600">Simple patterns</div>
                </div>
                <div className="bg-white p-2 rounded text-center">
                  <div className="font-semibold">8 Noise Filters</div>
                  <div className="text-gray-600">Low activation</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Conv2 Layer Analysis</h3>
              <p className="text-sm text-green-700 mb-3">
                The second convolutional layer combines Conv1 features into more complex patterns.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div className="bg-white p-2 rounded text-center">
                  <div className="font-semibold">16 Shape Detectors</div>
                  <div className="text-gray-600">Circles, curves, angles</div>
                </div>
                <div className="bg-white p-2 rounded text-center">
                  <div className="font-semibold">16 Pattern Detectors</div>
                  <div className="text-gray-600">Digit-specific features</div>
                </div>
                <div className="bg-white p-2 rounded text-center">
                  <div className="font-semibold">16 Complex Features</div>
                  <div className="text-gray-600">Multi-part patterns</div>
                </div>
                <div className="bg-white p-2 rounded text-center">
                  <div className="font-semibold">16 Background Filters</div>
                  <div className="text-gray-600">Low activation</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Interpretability */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Model Interpretability Insights
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What We Learned</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Hierarchical Learning:</strong> Simple → Complex features</li>
                <li>• <strong>Translation Invariance:</strong> Same patterns anywhere</li>
                <li>• <strong>Feature Specialization:</strong> Each filter has a purpose</li>
                <li>• <strong>Robustness:</strong> Works despite noise and variations</li>
                <li>• <strong>Generalization:</strong> Learns general digit patterns</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Practical Applications</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Medical Imaging:</strong> Detect anomalies in X-rays</li>
                <li>• <strong>Autonomous Vehicles:</strong> Recognize traffic signs</li>
                <li>• <strong>Security:</strong> Facial recognition systems</li>
                <li>• <strong>Manufacturing:</strong> Quality control inspection</li>
                <li>• <strong>Agriculture:</strong> Crop disease detection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integration with Existing Visualizer */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Advanced Visualization Demo
          </h2>
          
          <p className="text-gray-700 mb-6">
            For more advanced visualizations, you can use the comprehensive CNN visualizer 
            that includes interactive animations, mathematical formulas, and real-world examples.
          </p>

          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Try the Full CNN Visualizer
            </h3>
            <p className="text-gray-700 mb-4">
              Experience interactive convolution animations, feature hierarchy progression, 
              and mathematical explanations with real images.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 inline mr-2" />
              Open Advanced Visualizer
            </button>
          </div>

          <WarningBox type="tip">
            <strong>Enhanced Features:</strong> The full visualizer includes convolution 
            animations, ReLU activation graphs, mathematical formulas, and explanations 
            of what each layer learns with real cat, dog, and car images.
          </WarningBox>
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
          <p className="text-lg mb-6 opacity-90">
            You've successfully built, trained, and visualized a CNN from scratch! 
            You now understand how CNNs work internally and can interpret their decisions.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <div className="font-semibold mb-2">Architecture</div>
              <div>8-layer CNN with 225K parameters</div>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <div className="font-semibold mb-2">Training</div>
              <div>95%+ accuracy on MNIST</div>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <div className="font-semibold mb-2">Visualization</div>
              <div>Feature maps & activations</div>
            </div>
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
