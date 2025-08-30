import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Star, ChevronDown, Zap, CheckCircle } from 'lucide-react';
import { useSubscription } from '../contexts/SubscriptionContext';
import UpgradePrompt from './UpgradePrompt';

const SubscriptionStatus: React.FC = () => {
  const navigate = useNavigate();
  const { currentPlan, isSubscribed, isTrialActive } = useSubscription();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  const handleUpgrade = () => {
    setShowDropdown(false);
    navigate('/pricing');
  };

  const handleManageSubscription = () => {
    setShowDropdown(false);
    navigate('/account');
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'free':
        return 'from-gray-400 to-gray-500';
      case 'basic':
        return 'from-blue-400 to-cyan-500';
      case 'premium':
        return 'from-purple-400 to-violet-500';
      case 'family':
        return 'from-orange-400 to-red-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free':
        return '🌟';
      case 'basic':
        return '📚';
      case 'premium':
        return '👑';
      case 'family':
        return '👨‍👩‍👧‍👦';
      default:
        return '🌟';
    }
  };

  if (!currentPlan) return null;

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="group flex items-center space-x-3 bg-white/80 backdrop-blur-md border border-white/20 shadow-xl px-4 py-2 rounded-full hover:bg-white hover:shadow-2xl transition-all duration-300"
        >
          {/* Plan Icon */}
          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getPlanColor(currentPlan.id)} flex items-center justify-center text-white text-sm font-bold`}>
            {getPlanIcon(currentPlan.id)}
          </div>

          {/* Plan Info */}
          <div className="text-left">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {currentPlan.name}
              </span>
              {isTrialActive && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Trial
                </span>
              )}
              {isSubscribed && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {currentPlan.price === 0 ? 'Free' : `$${currentPlan.price}/${currentPlan.billingCycle}`}
            </div>
          </div>

          {/* Dropdown Arrow */}
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            showDropdown ? 'rotate-180' : ''
          }`} />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-fade-in">
            <div className="p-6">
              {/* Current Plan Status */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Plan</h3>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getPlanColor(currentPlan.id)} flex items-center justify-center text-white text-lg font-bold`}>
                        {getPlanIcon(currentPlan.id)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{currentPlan.name}</div>
                        <div className="text-sm text-gray-600">
                          {currentPlan.price === 0 ? 'Free Plan' : `$${currentPlan.price}/${currentPlan.billingCycle}`}
                        </div>
                      </div>
                    </div>
                    {isSubscribed && (
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Active
                      </div>
                    )}
                  </div>

                  {/* Plan Limits */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-indigo-600">
                        {currentPlan.maxStudents === -1 ? '∞' : currentPlan.maxStudents}
                      </div>
                      <div className="text-xs text-gray-500">Students</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-indigo-600">
                        {currentPlan.maxSubjects === -1 ? '∞' : currentPlan.maxSubjects}
                      </div>
                      <div className="text-xs text-gray-500">Subjects</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-indigo-600">
                        {currentPlan.maxModules === -1 ? '∞' : currentPlan.maxModules}
                      </div>
                      <div className="text-xs text-gray-500">Modules</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                {currentPlan.id === 'free' && (
                  <button
                    onClick={handleUpgrade}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Crown className="h-4 w-4" />
                    <span>Upgrade Plan</span>
                    <Zap className="h-4 w-4" />
                  </button>
                )}

                {isSubscribed && (
                  <button
                    onClick={handleManageSubscription}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Manage Subscription
                  </button>
                )}

                <button
                  onClick={() => navigate('/pricing')}
                  className="w-full border border-indigo-200 text-indigo-600 py-3 px-4 rounded-xl font-medium hover:bg-indigo-50 transition-colors"
                >
                  View All Plans
                </button>
              </div>

              {/* Special Offer */}
              {currentPlan.id === 'free' && (
                <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-center justify-center space-x-2 text-green-700">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">Save 20% with yearly billing!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Upgrade Prompt */}
      <UpgradePrompt
        isOpen={showUpgradePrompt}
        onClose={() => setShowUpgradePrompt(false)}
        feature="Premium Features"
        message="Upgrade your plan to unlock unlimited access to all subjects, modules, and premium features."
      />
    </>
  );
};

export default SubscriptionStatus;

