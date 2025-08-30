import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { SubscriptionPlan, UserSubscription, PaymentMethod } from '../types/subscription';
import { subscriptionPlans, yearlyPlans } from '../data/subscriptionPlans';

interface SubscriptionContextType {
  currentPlan: SubscriptionPlan | null;
  userSubscription: UserSubscription | null;
  paymentMethods: PaymentMethod[];
  isSubscribed: boolean;
  isTrialActive: boolean;
  canAccessFeature: (feature: keyof SubscriptionPlan) => boolean;
  canAccessSubject: (subjectId: string) => boolean;
  canAccessModule: (moduleId: string) => boolean;
  canTakeExam: () => boolean;
  canCreateCustomContent: () => boolean;
  canAccessOffline: () => boolean;
  maxStudentsAllowed: () => number;
  maxSubjectsAllowed: () => number;
  maxModulesAllowed: () => number;
  upgradePlan: (planId: string) => void;
  cancelSubscription: () => void;
  addPaymentMethod: (method: Omit<PaymentMethod, 'id' | 'createdAt'>) => void;
  removePaymentMethod: (methodId: string) => void;
  setDefaultPaymentMethod: (methodId: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isTrialActive, setIsTrialActive] = useState(false);

  // Initialize with free plan by default
  useEffect(() => {
    const freePlan = subscriptionPlans.find(plan => plan.id === 'free');
    if (freePlan) {
      setCurrentPlan(freePlan);
      setIsSubscribed(false);
      setIsTrialActive(true);
    }
  }, []);

  // Check if user can access a specific feature
  const canAccessFeature = (feature: keyof SubscriptionPlan): boolean => {
    if (!currentPlan) return false;
    
    if (feature === 'includesExams') {
      return currentPlan.includesExams;
    }
    if (feature === 'includesProgressTracking') {
      return currentPlan.includesProgressTracking;
    }
    if (feature === 'includesParentDashboard') {
      return currentPlan.includesParentDashboard;
    }
    if (feature === 'includesOfflineAccess') {
      return currentPlan.includesOfflineAccess;
    }
    if (feature === 'includesCustomContent') {
      return currentPlan.includesCustomContent;
    }
    
    return false;
  };

  // Check if user can access a specific subject
  const canAccessSubject = (subjectId: string): boolean => {
    if (!currentPlan) return false;
    
    // Free plan can access only first 3 subjects
    if (currentPlan.id === 'free') {
      const subjectOrder = ['math', 'science', 'reading'];
      return subjectOrder.includes(subjectId);
    }
    
    return true;
  };

  // Check if user can access a specific module
  const canAccessModule = (moduleId: string): boolean => {
    if (!currentPlan) return false;
    
    // Free plan has limited module access
    if (currentPlan.id === 'free') {
      const moduleNumber = parseInt(moduleId.split('-').pop() || '0');
      return moduleNumber <= 5;
    }
    
    // Basic plan has limited module access
    if (currentPlan.id === 'basic') {
      const moduleNumber = parseInt(moduleId.split('-').pop() || '0');
      return moduleNumber <= 10;
    }
    
    // Premium and Family plans have unlimited access
    return true;
  };

  // Check if user can take exams
  const canTakeExam = (): boolean => {
    return canAccessFeature('includesExams');
  };

  // Check if user can create custom content
  const canCreateCustomContent = (): boolean => {
    return canAccessFeature('includesCustomContent');
  };

  // Check if user can access offline content
  const canAccessOffline = (): boolean => {
    return canAccessFeature('includesOfflineAccess');
  };

  // Get maximum allowed students
  const maxStudentsAllowed = (): number => {
    return currentPlan?.maxStudents || 1;
  };

  // Get maximum allowed subjects
  const maxSubjectsAllowed = (): number => {
    return currentPlan?.maxSubjects || 3;
  };

  // Get maximum allowed modules
  const maxModulesAllowed = (): number => {
    return currentPlan?.maxModules || 15;
  };

  // Upgrade to a new plan
  const upgradePlan = (planId: string): void => {
    const newPlan = subscriptionPlans.find(plan => plan.id === planId) || 
                   yearlyPlans.find(plan => plan.id === planId);
    
    if (newPlan) {
      setCurrentPlan(newPlan);
      setIsSubscribed(newPlan.id !== 'free');
      setIsTrialActive(newPlan.id === 'free');
      
      // In a real app, this would integrate with payment processing
      console.log(`Upgrading to ${newPlan.name} for $${newPlan.price}/${newPlan.billingCycle}`);
    }
  };

  // Cancel subscription
  const cancelSubscription = (): void => {
    if (userSubscription) {
      setUserSubscription({
        ...userSubscription,
        status: 'cancelled',
        cancelAtPeriodEnd: true
      });
      
      // In a real app, this would call the payment processor API
      console.log('Subscription cancelled at period end');
    }
  };

  // Add a new payment method
  const addPaymentMethod = (method: Omit<PaymentMethod, 'id' | 'createdAt'>): void => {
    const newMethod: PaymentMethod = {
      ...method,
      id: `pm_${Date.now()}`,
      createdAt: new Date()
    };
    
    setPaymentMethods(prev => [...prev, newMethod]);
    
    // In a real app, this would integrate with payment processor
    console.log('Payment method added:', newMethod);
  };

  // Remove a payment method
  const removePaymentMethod = (methodId: string): void => {
    setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
    
    // In a real app, this would call the payment processor API
    console.log('Payment method removed:', methodId);
  };

  // Set default payment method
  const setDefaultPaymentMethod = (methodId: string): void => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    );
    
    // In a real app, this would call the payment processor API
    console.log('Default payment method set:', methodId);
  };

  const value: SubscriptionContextType = {
    currentPlan,
    userSubscription,
    paymentMethods,
    isSubscribed,
    isTrialActive,
    canAccessFeature,
    canAccessSubject,
    canAccessModule,
    canTakeExam,
    canCreateCustomContent,
    canAccessOffline,
    maxStudentsAllowed,
    maxSubjectsAllowed,
    maxModulesAllowed,
    upgradePlan,
    cancelSubscription,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

