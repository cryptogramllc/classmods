import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Star, Zap, ArrowRight, X } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';

interface UpgradePromptProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
  message?: string;
  showUpgradeButton?: boolean;
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  isOpen,
  onClose,
  feature = 'premium feature',
  message = 'Upgrade your plan to unlock this feature and get unlimited access to all content.',
  showUpgradeButton = true
}) => {
  const navigate = useNavigate();
  const { currentPlan } = useSubscription();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    onClose();
    navigate('/pricing');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full animate-fade-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="h-10 w-10 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Unlock {feature}
          </h3>

          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {message}
          </p>

          {/* Current Plan Info */}
          {currentPlan && currentPlan.id !== 'free' && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Current Plan:</p>
              <p className="font-semibold text-gray-900">{currentPlan.name}</p>
            </div>
          )}

          {/* Features List */}
          <div className="space-y-3 mb-8 text-left">
            {[
              'Unlimited access to all subjects',
              'Advanced progress tracking',
              'Parent dashboard',
              'Offline content access',
              'Custom learning paths',
              'Priority support'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          {showUpgradeButton && (
            <div className="space-y-3">
              <button
                onClick={handleUpgrade}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <Crown className="h-5 w-5 inline mr-2" />
                Upgrade Now
                <ArrowRight className="h-5 w-5 inline ml-2" />
              </button>
              
              <button
                onClick={handleClose}
                className="w-full text-gray-500 hover:text-gray-700 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          )}

          {/* Special Offer */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Save 20% with yearly billing!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePrompt;

