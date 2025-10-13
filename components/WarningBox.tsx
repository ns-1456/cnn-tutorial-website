import React from 'react';

interface WarningBoxProps {
  type: 'warning' | 'caution' | 'danger' | 'note' | 'tip' | 'formula' | 'why' | 'what';
  children: React.ReactNode;
  title?: string;
}

const WarningBox: React.FC<WarningBoxProps> = ({ type, children, title }) => {
  const getStyles = () => {
    switch (type) {
      case 'warning':
        return 'border-orange-300 bg-orange-50 text-orange-800';
      case 'caution':
        return 'border-yellow-300 bg-yellow-50 text-yellow-800';
      case 'danger':
        return 'border-red-300 bg-red-50 text-red-800';
      case 'note':
        return 'border-blue-300 bg-blue-50 text-blue-800';
      case 'tip':
        return 'border-green-300 bg-green-50 text-green-800';
      case 'formula':
        return 'border-yellow-400 bg-yellow-100 text-yellow-900';
      case 'why':
        return 'border-blue-400 bg-blue-100 text-blue-900';
      case 'what':
        return 'border-green-400 bg-green-100 text-green-900';
      default:
        return 'border-gray-300 bg-gray-50 text-gray-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'caution':
        return '⚠️';
      case 'danger':
        return '🚨';
      case 'note':
        return 'ℹ️';
      case 'tip':
        return '💡';
      case 'formula':
        return '📐';
      case 'why':
        return '🤔';
      case 'what':
        return '🎯';
      default:
        return 'ℹ️';
    }
  };

  const getTitle = () => {
    if (title) return title;
    switch (type) {
      case 'warning':
        return 'Warning';
      case 'caution':
        return 'Caution';
      case 'danger':
        return 'Danger';
      case 'note':
        return 'Note';
      case 'tip':
        return 'Tip';
      case 'formula':
        return 'Mathematical Formula';
      case 'why':
        return 'Why It Works';
      case 'what':
        return 'What It Learns';
      default:
        return 'Information';
    }
  };

  return (
    <div className={`border-l-4 p-4 my-4 rounded-r-lg ${getStyles()}`}>
      <div className="flex items-center mb-2">
        <span className="text-lg mr-2">{getIcon()}</span>
        <h4 className="font-semibold text-sm uppercase tracking-wide">
          {getTitle()}
        </h4>
      </div>
      <div className="text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default WarningBox;
