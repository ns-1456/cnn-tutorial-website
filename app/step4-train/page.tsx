'use client';

import React, { useState } from 'react';
import StepLayout from '@/components/StepLayout';
import WarningBox from '@/components/WarningBox';
import CodeBlock from '@/components/CodeBlock';
import LiveTraining from '@/components/LiveTraining';
import { Play, BarChart3, Clock, Target } from 'lucide-react';

export default function Step4TrainPage() {
  const [trainingHistory, setTrainingHistory] = useState<any[]>([]);
  const [isTrainingComplete, setIsTrainingComplete] = useState(false);

  const trainingCode = `// Training the CNN Model
async function trainModel(model, trainData, epochs = 5) {
  const history = await model.fit(trainData.trainImages, trainData.trainLabels, {
    epochs: epochs,                    // Number of training epochs
    batchSize: 32,                     // Batch size for training
    validationSplit: 0.2,              // 20% of data for validation
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        // Log training progress
        console.log(\`Epoch \${epoch + 1}/\${epochs}\`);
        console.log(\`Loss: \${logs.loss.toFixed(4)}\`);
        console.log(\`Accuracy: \${(logs.acc * 100).toFixed(2)}%\`);
        console.log(\`Val Loss: \${logs.val_loss.toFixed(4)}\`);
        console.log(\`Val Accuracy: \${(logs.val_acc * 100).toFixed(2)}%\`);
      }
    }
  });
  
  return history;
}`;

  const handleTrainingComplete = (history: any) => {
    setIsTrainingComplete(true);
    console.log('Training completed:', history);
  };

  const handleProgressUpdate = (progress: any) => {
    setTrainingHistory(prev => [...prev, progress]);
  };

  return (
    <StepLayout
      stepNumber={4}
      totalSteps={5}
      title="Train the Model"
      prevStep="/step3-build-model"
      prevTitle="Step 3: Build Model"
      nextStep="/step5-visualize"
      nextTitle="Step 5: Visualize Results"
    >
      <div className="space-y-8">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Play className="w-6 h-6 text-blue-600 mr-3" />
            Training the CNN Model
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Now we'll train our CNN model using the MNIST dataset. Training involves 
            feeding the model thousands of images, calculating predictions, measuring 
            errors, and adjusting weights to improve accuracy.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900 mb-2">5 Epochs</h3>
              <p className="text-sm text-blue-700">
                Complete passes through the dataset
              </p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900 mb-2">32 Batch Size</h3>
              <p className="text-sm text-green-700">
                Images processed at once
              </p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900 mb-2">20% Validation</h3>
              <p className="text-sm text-purple-700">
                Data held out for testing
              </p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Play className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-900 mb-2">Real-time</h3>
              <p className="text-sm text-orange-700">
                Live progress monitoring
              </p>
            </div>
          </div>
        </div>

        {/* Training Process */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Training Process Explained
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Forward Pass</h3>
              <p className="text-gray-700 mb-4">
                The model processes input images through all layers, producing predictions 
                for each digit class. Each layer transforms the data according to its learned weights.
              </p>
              
              <WarningBox type="formula">
                <strong>Forward Pass:</strong><br/>
                Input → Conv1 → Pool1 → Conv2 → Pool2 → Flatten → Dense → Dropout → Output<br/>
                Each layer: Y = activation(XW + b)
              </WarningBox>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Loss Calculation</h3>
              <p className="text-gray-700 mb-4">
                The model's predictions are compared to the true labels using categorical 
                crossentropy loss. This measures how far off our predictions are.
              </p>
              
              <WarningBox type="formula">
                <strong>Categorical Crossentropy:</strong><br/>
                Loss = -Σ(y_true * log(y_pred))<br/>
                Where y_true is one-hot encoded true label, y_pred is predicted probabilities
              </WarningBox>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Backpropagation</h3>
              <p className="text-gray-700 mb-4">
                The loss is propagated backward through the network, calculating gradients 
                for each weight. These gradients indicate how to adjust weights to reduce loss.
              </p>
              
              <WarningBox type="why">
                <strong>Why Backpropagation Works:</strong> The chain rule allows us to 
                calculate how much each weight contributed to the final loss, enabling 
                efficient gradient-based optimization.
              </WarningBox>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Weight Updates</h3>
              <p className="text-gray-700 mb-4">
                The Adam optimizer uses the gradients to update weights, moving them in 
                the direction that reduces loss. This process repeats for each batch.
              </p>
              
              <WarningBox type="what">
                <strong>What Adam Learns:</strong> Adam adapts learning rates for each 
                parameter, combining momentum (moving average of gradients) with 
                adaptive learning rates for efficient optimization.
              </WarningBox>
            </div>
          </div>
        </div>

        {/* Training Code */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Training Code
          </h2>
          
          <p className="text-gray-700 mb-6">
            Here's the code that trains our CNN model. The training process includes 
            monitoring progress, validation, and callbacks for real-time updates.
          </p>

          <CodeBlock 
            code={trainingCode}
            language="javascript"
            title="Model Training Function"
          />

          <WarningBox type="note">
            <strong>Training Parameters:</strong> We use 5 epochs (enough to see learning 
            without overfitting), batch size of 32 (good balance of speed and stability), 
            and 20% validation split to monitor generalization.
          </WarningBox>

          <WarningBox type="caution">
            <strong>Training Time:</strong> Training will take 5-10 minutes depending on 
            your hardware. The process is computationally intensive but runs entirely 
            in your browser using TensorFlow.js.
          </WarningBox>
        </div>

        {/* Live Training Component */}
        <LiveTraining 
          onTrainingComplete={handleTrainingComplete}
          onProgressUpdate={handleProgressUpdate}
        />

        {/* Training Metrics */}
        {trainingHistory.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Training Progress
            </h2>
            
            <div className="space-y-4">
              {trainingHistory.map((epoch, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">Epoch {epoch.epoch}</h3>
                    <span className="text-sm text-gray-500">
                      {Math.round(epoch.accuracy * 100)}% accuracy
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-2 bg-blue-100 rounded">
                      <div className="font-semibold text-blue-800">Loss</div>
                      <div className="text-blue-600">{epoch.loss.toFixed(4)}</div>
                    </div>
                    <div className="text-center p-2 bg-green-100 rounded">
                      <div className="font-semibold text-green-800">Accuracy</div>
                      <div className="text-green-600">{(epoch.accuracy * 100).toFixed(2)}%</div>
                    </div>
                    <div className="text-center p-2 bg-orange-100 rounded">
                      <div className="font-semibold text-orange-800">Val Loss</div>
                      <div className="text-orange-600">{epoch.valLoss.toFixed(4)}</div>
                    </div>
                    <div className="text-center p-2 bg-purple-100 rounded">
                      <div className="font-semibold text-purple-800">Val Accuracy</div>
                      <div className="text-purple-600">{(epoch.valAccuracy * 100).toFixed(2)}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training Results */}
        {isTrainingComplete && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Training Results
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Training Complete!</h3>
                <p className="text-sm text-green-700 mb-4">
                  Your CNN model has been successfully trained on the MNIST dataset. 
                  The model has learned to recognize handwritten digits with high accuracy.
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Final Training Accuracy:</span>
                    <span className="font-semibold text-green-600">
                      {trainingHistory.length > 0 ? 
                        (trainingHistory[trainingHistory.length - 1].accuracy * 100).toFixed(2) + '%' 
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Final Validation Accuracy:</span>
                    <span className="font-semibold text-green-600">
                      {trainingHistory.length > 0 ? 
                        (trainingHistory[trainingHistory.length - 1].valAccuracy * 100).toFixed(2) + '%' 
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Now that your model is trained, we can visualize what it has learned. 
                  We'll examine feature maps, activation patterns, and see how the 
                  model makes decisions.
                </p>
                
                <div className="text-sm text-blue-600">
                  <div>• Feature map visualization</div>
                  <div>• Layer activation analysis</div>
                  <div>• Decision boundary exploration</div>
                  <div>• Model interpretability</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Training Tips */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Training Tips & Troubleshooting
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What to Expect</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Epoch 1:</strong> Accuracy starts low (~10-20%)</li>
                <li>• <strong>Epoch 2-3:</strong> Rapid improvement (50-80%)</li>
                <li>• <strong>Epoch 4-5:</strong> Fine-tuning (85-95%)</li>
                <li>• <strong>Validation:</strong> Should track training closely</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Issues</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Slow Training:</strong> Close other browser tabs</li>
                <li>• <strong>Memory Issues:</strong> Reduce batch size</li>
                <li>• <strong>Poor Accuracy:</strong> Check data preprocessing</li>
                <li>• <strong>Overfitting:</strong> Increase dropout rate</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Training Complete!</h2>
          <p className="text-lg mb-6 opacity-90">
            Your CNN model is now trained and ready for visualization. 
            Let's explore what it has learned and how it makes decisions!
          </p>
        </div>
      </div>
    </StepLayout>
  );
}
