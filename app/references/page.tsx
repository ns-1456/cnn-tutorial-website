import React from 'react';
import { BookOpen, ExternalLink, FileText, Users, Calendar } from 'lucide-react';

export default function ReferencesPage() {
  const references = [
    {
      id: 1,
      authors: "Y. LeCun, L. Bottou, Y. Bengio, and P. Haffner",
      title: "Gradient-based learning applied to document recognition",
      journal: "Proceedings of the IEEE",
      volume: "86",
      number: "11",
      pages: "2278-2324",
      year: "1998",
      doi: "10.1109/5.726791",
      type: "journal"
    },
    {
      id: 2,
      authors: "A. Krizhevsky, I. Sutskever, and G. E. Hinton",
      title: "ImageNet classification with deep convolutional neural networks",
      journal: "Communications of the ACM",
      volume: "60",
      number: "6",
      pages: "84-90",
      year: "2017",
      doi: "10.1145/3065386",
      type: "journal"
    },
    {
      id: 3,
      authors: "TensorFlow.js Team",
      title: "TensorFlow.js: Machine Learning for the Web and Beyond",
      journal: "arXiv preprint",
      year: "2023",
      url: "https://www.tensorflow.org/js",
      type: "web"
    },
    {
      id: 4,
      authors: "F. Chollet",
      title: "Deep Learning with Python",
      publisher: "Manning Publications",
      year: "2021",
      edition: "2nd",
      type: "book"
    },
    {
      id: 5,
      authors: "C. Olah and A. Mordvintsev",
      title: "Feature Visualization",
      journal: "Distill",
      year: "2017",
      url: "https://distill.pub/2017/feature-visualization/",
      type: "web"
    },
    {
      id: 6,
      authors: "M. T. Ribeiro, S. Singh, and C. Guestrin",
      title: "Why should I trust you? Explaining the predictions of any classifier",
      journal: "Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining",
      pages: "1135-1144",
      year: "2016",
      doi: "10.1145/2939672.2939778",
      type: "conference"
    }
  ];

  const formatReference = (ref: any) => {
    const authors = ref.authors;
    const title = `"${ref.title},"`;
    
    if (ref.type === 'journal') {
      return `${authors}, ${title} ${ref.journal}, vol. ${ref.volume}, no. ${ref.number}, pp. ${ref.pages}, ${ref.year}.`;
    } else if (ref.type === 'conference') {
      return `${authors}, ${title} ${ref.journal}, pp. ${ref.pages}, ${ref.year}.`;
    } else if (ref.type === 'book') {
      return `${authors}, ${title} ${ref.publisher}, ${ref.year}.`;
    } else if (ref.type === 'web') {
      return `${authors}, ${title} ${ref.journal}, ${ref.year}. [Online]. Available: ${ref.url}`;
    }
    return `${authors}, ${title}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            References & Resources
          </h1>
          <p className="text-lg text-gray-600">
            Academic references, learning resources, and additional materials for 
            understanding CNNs and deep learning.
          </p>
        </div>

        {/* Academic References */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
            Academic References (IEEE Format)
          </h2>
          
          <div className="space-y-6">
            {references.map((ref) => (
              <div key={ref.id} className="border-l-4 border-blue-200 pl-4 py-2">
                <div className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-medium text-gray-900">[{ref.id}]</span> {formatReference(ref)}
                  {ref.doi && (
                    <span className="text-blue-600 ml-2">
                      DOI: {ref.doi}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Resources */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="w-6 h-6 text-green-600 mr-3" />
            Additional Learning Resources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Online Courses</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ExternalLink className="w-4 h-4 text-blue-600 mr-2 mt-1" />
                  <div>
                    <a href="https://www.coursera.org/learn/neural-networks-deep-learning" 
                       className="text-blue-600 hover:text-blue-800 font-medium">
                      Deep Learning Specialization - Coursera
                    </a>
                    <p className="text-sm text-gray-600">Andrew Ng's comprehensive deep learning course</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ExternalLink className="w-4 h-4 text-blue-600 mr-2 mt-1" />
                  <div>
                    <a href="https://cs231n.stanford.edu/" 
                       className="text-blue-600 hover:text-blue-800 font-medium">
                      CS231n: Convolutional Neural Networks - Stanford
                    </a>
                    <p className="text-sm text-gray-600">In-depth CNN course with excellent visualizations</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ExternalLink className="w-4 h-4 text-blue-600 mr-2 mt-1" />
                  <div>
                    <a href="https://www.fast.ai/" 
                       className="text-blue-600 hover:text-blue-800 font-medium">
                      Practical Deep Learning for Coders - Fast.ai
                    </a>
                    <p className="text-sm text-gray-600">Practical approach to deep learning</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interactive Tools</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ExternalLink className="w-4 h-4 text-green-600 mr-2 mt-1" />
                  <div>
                    <a href="https://playground.tensorflow.org/" 
                       className="text-green-600 hover:text-green-800 font-medium">
                      TensorFlow Playground
                    </a>
                    <p className="text-sm text-gray-600">Interactive neural network visualization</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ExternalLink className="w-4 h-4 text-green-600 mr-2 mt-1" />
                  <div>
                    <a href="https://distill.pub/" 
                       className="text-green-600 hover:text-green-800 font-medium">
                      Distill.pub
                    </a>
                    <p className="text-sm text-gray-600">Interactive articles on machine learning</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ExternalLink className="w-4 h-4 text-green-600 mr-2 mt-1" />
                  <div>
                    <a href="https://www.tensorflow.org/js" 
                       className="text-green-600 hover:text-green-800 font-medium">
                      TensorFlow.js Documentation
                    </a>
                    <p className="text-sm text-gray-600">Official documentation and tutorials</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Books */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="w-6 h-6 text-purple-600 mr-3" />
            Recommended Books
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Deep Learning</h3>
              <p className="text-sm text-gray-600 mb-2">Ian Goodfellow, Yoshua Bengio, Aaron Courville</p>
              <p className="text-xs text-gray-500">MIT Press, 2016 - Comprehensive textbook covering theory and practice</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Pattern Recognition and Machine Learning</h3>
              <p className="text-sm text-gray-600 mb-2">Christopher Bishop</p>
              <p className="text-xs text-gray-500">Springer, 2006 - Mathematical foundations of machine learning</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Hands-On Machine Learning</h3>
              <p className="text-sm text-gray-600 mb-2">Aurélien Géron</p>
              <p className="text-xs text-gray-500">O'Reilly, 2019 - Practical implementation guide</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Computer Vision: Algorithms and Applications</h3>
              <p className="text-sm text-gray-600 mb-2">Richard Szeliski</p>
              <p className="text-xs text-gray-500">Springer, 2010 - Comprehensive computer vision textbook</p>
            </div>
          </div>
        </div>

        {/* Datasets */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-6 h-6 text-orange-600 mr-3" />
            Popular Datasets
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">MNIST</h3>
              <p className="text-sm text-blue-700 mb-2">Handwritten digits (0-9)</p>
              <p className="text-xs text-blue-600">60K training, 10K test images</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">CIFAR-10</h3>
              <p className="text-sm text-green-700 mb-2">10 object classes</p>
              <p className="text-xs text-green-600">50K training, 10K test images</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">ImageNet</h3>
              <p className="text-sm text-purple-700 mb-2">1000 object classes</p>
              <p className="text-xs text-purple-600">1.2M training images</p>
            </div>
          </div>
        </div>

        {/* Glossary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Key Terms Glossary
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Convolution</h3>
                <p className="text-sm text-gray-600">Mathematical operation that applies filters to detect features in images</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Feature Map</h3>
                <p className="text-sm text-gray-600">Output of a convolutional layer showing detected features</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Pooling</h3>
                <p className="text-sm text-gray-600">Downsampling operation that reduces spatial dimensions</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">ReLU</h3>
                <p className="text-sm text-gray-600">Rectified Linear Unit activation function: f(x) = max(0, x)</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Backpropagation</h3>
                <p className="text-sm text-gray-600">Algorithm for training neural networks by propagating errors backward</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Dropout</h3>
                <p className="text-sm text-gray-600">Regularization technique that randomly sets neurons to zero</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Softmax</h3>
                <p className="text-sm text-gray-600">Activation function that converts logits to probabilities</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Cross-entropy</h3>
                <p className="text-sm text-gray-600">Loss function for classification tasks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tutorial Completion */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Tutorial Complete!</h2>
          <p className="text-lg mb-6 opacity-90">
            You've successfully completed the CNN tutorial. You now have a solid understanding 
            of how to build, train, and visualize Convolutional Neural Networks.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <div className="font-semibold mb-2">What You Learned</div>
              <div>CNN architecture, training process, visualization techniques</div>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <div className="font-semibold mb-2">Skills Gained</div>
              <div>TensorFlow.js, model building, feature analysis</div>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <div className="font-semibold mb-2">Next Steps</div>
              <div>Try different architectures, explore other datasets</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
