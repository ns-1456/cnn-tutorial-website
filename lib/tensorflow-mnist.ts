import * as tf from '@tensorflow/tfjs';

export interface MNISTData {
  trainImages: tf.Tensor4D;
  trainLabels: tf.Tensor2D;
  testImages: tf.Tensor4D;
  testLabels: tf.Tensor2D;
}

export class MNISTLoader {
  private static instance: MNISTLoader;
  private data: MNISTData | null = null;

  private constructor() {}

  public static getInstance(): MNISTLoader {
    if (!MNISTLoader.instance) {
      MNISTLoader.instance = new MNISTLoader();
    }
    return MNISTLoader.instance;
  }

  public async loadData(): Promise<MNISTData> {
    if (this.data) {
      return this.data;
    }

    try {
      // Load MNIST data from a public dataset
      const dataUrl = 'https://storage.googleapis.com/tfjs-tutorials/mnist_data.json';
      
      const response = await fetch(dataUrl);
      const data = await response.json();

      // Convert to tensors
      const trainImages = tf.tensor4d(data.train_images, [data.train_images.length, 28, 28, 1]);
      const trainLabels = tf.oneHot(tf.tensor1d(data.train_labels, 'int32'), 10);
      const testImages = tf.tensor4d(data.test_images, [data.test_images.length, 28, 28, 1]);
      const testLabels = tf.oneHot(tf.tensor1d(data.test_labels, 'int32'), 10);

      this.data = {
        trainImages,
        trainLabels,
        testImages,
        testLabels
      };

      return this.data;
    } catch (error) {
      console.error('Error loading MNIST data:', error);
      throw new Error('Failed to load MNIST dataset. Please check your internet connection.');
    }
  }

  public getData(): MNISTData | null {
    return this.data;
  }

  public dispose(): void {
    if (this.data) {
      this.data.trainImages.dispose();
      this.data.trainLabels.dispose();
      this.data.testImages.dispose();
      this.data.testLabels.dispose();
      this.data = null;
    }
  }
}

export class CNNModel {
  private model: tf.Sequential | null = null;

  public createModel(): tf.Sequential {
    const model = tf.sequential({
      layers: [
        // First convolutional layer
        tf.layers.conv2d({
          inputShape: [28, 28, 1],
          filters: 32,
          kernelSize: 3,
          activation: 'relu',
          name: 'conv1'
        }),
        
        // First pooling layer
        tf.layers.maxPooling2d({
          poolSize: 2,
          name: 'pool1'
        }),
        
        // Second convolutional layer
        tf.layers.conv2d({
          filters: 64,
          kernelSize: 3,
          activation: 'relu',
          name: 'conv2'
        }),
        
        // Second pooling layer
        tf.layers.maxPooling2d({
          poolSize: 2,
          name: 'pool2'
        }),
        
        // Flatten layer
        tf.layers.flatten({
          name: 'flatten'
        }),
        
        // Dense layer
        tf.layers.dense({
          units: 128,
          activation: 'relu',
          name: 'dense1'
        }),
        
        // Dropout layer
        tf.layers.dropout({
          rate: 0.5,
          name: 'dropout'
        }),
        
        // Output layer
        tf.layers.dense({
          units: 10,
          activation: 'softmax',
          name: 'output'
        })
      ]
    });

    this.model = model;
    return model;
  }

  public compileModel(model: tf.Sequential): void {
    model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
  }

  public async trainModel(
    model: tf.Sequential,
    trainData: MNISTData,
    epochs: number = 5,
    batchSize: number = 32,
    onEpochEnd?: (epoch: number, logs: any) => void
  ): Promise<tf.History> {
    const history = await model.fit(trainData.trainImages, trainData.trainLabels, {
      epochs,
      batchSize,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: onEpochEnd
      }
    });

    return history;
  }

  public async evaluateModel(model: tf.Sequential, testData: MNISTData): Promise<number[]> {
    const result = model.evaluate(testData.testImages, testData.testLabels);
    const loss = await result[0].data();
    const accuracy = await result[1].data();
    
    result[0].dispose();
    result[1].dispose();
    
    return [loss[0], accuracy[0]];
  }

  public getModel(): tf.Sequential | null {
    return this.model;
  }

  public dispose(): void {
    if (this.model) {
      this.model.dispose();
      this.model = null;
    }
  }
}

export const mnistLoader = MNISTLoader.getInstance();
export const cnnModel = new CNNModel();
