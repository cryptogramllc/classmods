import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, ArrowRight, Shield, Zap, Users, BookOpen, Award } from 'lucide-react';
import { subscriptionPlans, yearlyPlans, calculateSavings } from '../data/subscriptionPlans';
import { useSubscription } from '../contexts/SubscriptionContext';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentPlan, upgradePlan } = useSubscription();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = billingCycle === 'monthly' ? subscriptionPlans : yearlyPlans;
  const currentPlanId = currentPlan?.id;

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleUpgrade = () => {
    if (selectedPlan) {
      upgradePlan(selectedPlan);
      // In a real app, this would redirect to payment processing
      navigate('/payment');
    }
  };

  const getPopularPlan = () => {
    return plans.find(plan => plan.popular);
  };

  return (
    <div className="min-h-screen gradient-primary">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="group flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105"
              >
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 rotate-180" />
                <span>Back to Home</span>
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Choose Your Plan</h1>
                  <p className="text-sm text-gray-600">Unlock the full potential of ClassMods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Choose the Perfect Plan for Your Family
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start with our free trial and upgrade when you're ready. All plans include our core learning features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-lg font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                billingCycle === 'yearly' ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
              {billingCycle === 'yearly' && (
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Save 20%
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => {
            const isCurrentPlan = plan.id === currentPlanId;
            const isPopular = plan.popular;
            const monthlyPrice = billingCycle === 'yearly' ? plan.price / 12 : plan.price;
            const savings = billingCycle === 'yearly' && plan.id !== 'free' 
              ? calculateSavings(monthlyPrice * 12, plan.price) 
              : 0;

            return (
              <div
                key={plan.id}
                className={`relative group cursor-pointer animate-fade-in ${
                  isPopular ? 'lg:scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      <Star className="h-4 w-4 inline mr-2" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrentPlan && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      <Check className="h-4 w-4 inline mr-2" />
                      Current Plan
                    </div>
                  </div>
                )}

                <div className={`card h-full transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 ${
                  isPopular ? 'ring-2 ring-indigo-500' : ''
                } ${selectedPlan === plan.id ? 'ring-2 ring-green-500' : ''}`}>
                  <div className="p-6">
                    {/* Plan Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-indigo-600">${plan.price}</span>
                        <span className="text-gray-500 ml-2">
                          /{plan.billingCycle === 'yearly' ? 'year' : 'month'}
                        </span>
                      </div>
                      {savings > 0 && (
                        <div className="text-sm text-green-600 font-medium">
                          Save ${savings} per year
                        </div>
                      )}
                    </div>

                    {/* Plan Features */}
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Plan Limits */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-indigo-600">
                            {plan.maxStudents === -1 ? '∞' : plan.maxStudents}
                          </div>
                          <div className="text-xs text-gray-500">Students</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-indigo-600">
                            {plan.maxSubjects === -1 ? '∞' : plan.maxSubjects}
                          </div>
                          <div className="text-xs text-gray-500">Subjects</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlanSelect(plan.id);
                      }}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                        isCurrentPlan
                          ? 'bg-gray-100 text-gray-500 cursor-default'
                          : selectedPlan === plan.id
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                      disabled={isCurrentPlan}
                    >
                      {isCurrentPlan ? 'Current Plan' : 'Select Plan'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upgrade Section */}
        {selectedPlan && selectedPlan !== currentPlanId && (
          <div className="glass rounded-3xl p-8 mb-16 animate-fade-in">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Upgrade?</h3>
              <p className="text-gray-600 mb-6">
                You've selected the {plans.find(p => p.id === selectedPlan)?.name}. 
                Click below to proceed with your upgrade.
              </p>
              <button
                onClick={handleUpgrade}
                className="btn-primary px-8 py-4 text-lg font-semibold"
              >
                Upgrade Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Features Comparison */}
        <div className="glass rounded-3xl p-8 mb-16 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                  {plans.map(plan => (
                    <th key={plan.id} className="text-center py-4 px-4 font-semibold text-gray-900">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Students', key: 'maxStudents' },
                  { name: 'Subjects', key: 'maxSubjects' },
                  { name: 'Modules', key: 'maxModules' },
                  { name: 'Exams', key: 'includesExams' },
                  { name: 'Progress Tracking', key: 'includesProgressTracking' },
                  { name: 'Parent Dashboard', key: 'includesParentDashboard' },
                  { name: 'Offline Access', key: 'includesOfflineAccess' },
                  { name: 'Custom Content', key: 'includesCustomContent' }
                ].map((feature, index) => (
                  <tr key={feature.key} className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-700">{feature.name}</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="text-center py-4 px-4">
                        {feature.key.includes('max') ? (
                          <span className="font-semibold text-indigo-600">
                            {plan[feature.key as keyof typeof plan] === -1 ? '∞' : plan[feature.key as keyof typeof plan]}
                          </span>
                        ) : (
                          <div className="flex justify-center">
                            {plan[feature.key as keyof typeof plan] ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="glass rounded-3xl p-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes! We offer a free trial with access to basic features. You can upgrade anytime to unlock more content."
              },
              {
                question: "Can I change plans?",
                answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span className="text-sm">Instant Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;

