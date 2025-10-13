'use client';

import React, { useState } from 'react';

interface TrainingProgress {
  epoch: number;
  loss: number;
  accuracy: number;
  valLoss: number;
  valAccuracy: number;
}

interface LiveTrainingProps {
  onTrainingComplete?: (history: any) => void;
  onProgressUpdate?: (progress: TrainingProgress) => void;
}

const LiveTraining: React.FC<LiveTrainingProps> = ({ 
  onTrainingComplete, 
  onProgressUpdate 
}) => {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState<TrainingProgress | null>(null);
  const [history, setHistory] = useState<TrainingProgress[]>([]);

  const startTraining = async () => {
    setIsTraining(true);
    setHistory([]);
    setProgress(null);

    try {
      // Simulate training progress
      for (let epoch = 1; epoch <= 5; epoch++) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay per epoch
        
        const epochProgress: TrainingProgress = {
          epoch,
          loss: Math.max(0.1, 2.5 - epoch * 0.4 + Math.random() * 0.2),
          accuracy: Math.min(0.95, 0.1 + epoch * 0.15 + Math.random() * 0.1),
          valLoss: Math.max(0.1, 2.3 - epoch * 0.35 + Math.random() * 0.2),
          valAccuracy: Math.min(0.93, 0.12 + epoch * 0.14 + Math.random() * 0.1)
        };
        
        setProgress(epochProgress);
        setHistory(prev => [...prev, epochProgress]);
        
        if (onProgressUpdate) {
          onProgressUpdate(epochProgress);
        }
      }

      if (onTrainingComplete) {
        onTrainingComplete({ epochs: 5 });
      }

    } catch (error) {
      console.error('Training error:', error);
    } finally {
      setIsTraining(false);
    }
  };

  const stopTraining = () => {
    setIsTraining(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Live Training</h3>
      
      {/* Training Controls */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={startTraining}
          disabled={isTraining}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            isTraining
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isTraining ? 'Training...' : 'Start Training'}
        </button>
        
        {isTraining && (
          <button
            onClick={stopTraining}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Stop Training
          </button>
        )}
      </div>

      {/* Progress Display */}
      {progress && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Epoch {progress.epoch}/5
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress.accuracy * 100)}% Accuracy
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(progress.epoch / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Metrics Display */}
      {progress && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {progress.loss.toFixed(3)}
            </div>
            <div className="text-sm text-blue-700">Training Loss</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {(progress.accuracy * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-green-700">Training Accuracy</div>
          </div>
          
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {progress.valLoss.toFixed(3)}
            </div>
            <div className="text-sm text-orange-700">Validation Loss</div>
          </div>
          
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {(progress.valAccuracy * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-purple-700">Validation Accuracy</div>
          </div>
        </div>
      )}

      {/* Training History Chart */}
      {history.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Training Progress</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              {history.map((epoch, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="font-medium">Epoch {epoch.epoch}:</span>
                  <div className="flex gap-4">
                    <span className="text-blue-600">Loss: {epoch.loss.toFixed(3)}</span>
                    <span className="text-green-600">Acc: {(epoch.accuracy * 100).toFixed(1)}%</span>
                    <span className="text-orange-600">Val Loss: {epoch.valLoss.toFixed(3)}</span>
                    <span className="text-purple-600">Val Acc: {(epoch.valAccuracy * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTraining;