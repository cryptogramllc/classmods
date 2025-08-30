import type { SubscriptionPlan } from '../types/subscription';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Trial',
    price: 0,
    billingCycle: 'monthly',
    features: [
      'Access to 3 subjects',
      'Up to 5 modules per subject',
      'Basic progress tracking',
      'Standard support',
      'Web access only'
    ],
    maxStudents: 1,
    maxSubjects: 3,
    maxModules: 15,
    includesExams: false,
    includesProgressTracking: true,
    includesParentDashboard: false,
    includesOfflineAccess: false,
    includesCustomContent: false
  },
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 9.99,
    billingCycle: 'monthly',
    features: [
      'Access to all subjects',
      'Up to 10 modules per subject',
      'Full progress tracking',
      'Basic parent dashboard',
      'Email support',
      'Ad-free experience'
    ],
    maxStudents: 2,
    maxSubjects: 5,
    maxModules: 50,
    includesExams: true,
    includesProgressTracking: true,
    includesParentDashboard: true,
    includesOfflineAccess: false,
    includesCustomContent: false
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 19.99,
    billingCycle: 'monthly',
    features: [
      'Access to all subjects and modules',
      'Unlimited modules',
      'Advanced progress tracking',
      'Full parent dashboard',
      'Priority support',
      'Offline access',
      'Custom content creation',
      'Advanced analytics'
    ],
    maxStudents: 5,
    maxSubjects: 10,
    maxModules: -1, // unlimited
    includesExams: true,
    includesProgressTracking: true,
    includesParentDashboard: true,
    includesOfflineAccess: true,
    includesCustomContent: true,
    popular: true
  },
  {
    id: 'family',
    name: 'Family Plan',
    price: 29.99,
    billingCycle: 'monthly',
    features: [
      'Everything in Premium',
      'Up to 10 students',
      'Family progress dashboard',
      'Parent collaboration tools',
      'Custom learning paths',
      '24/7 support',
      'White-label options'
    ],
    maxStudents: 10,
    maxSubjects: 15,
    maxModules: -1, // unlimited
    includesExams: true,
    includesProgressTracking: true,
    includesParentDashboard: true,
    includesOfflineAccess: true,
    includesCustomContent: true
  }
];

export const yearlyPlans: SubscriptionPlan[] = subscriptionPlans.map(plan => {
  if (plan.id === 'free') return plan;
  
  const yearlyPrice = plan.price * 12;
  const discount = 20; // 20% discount for yearly plans
  const discountedPrice = yearlyPrice * (1 - discount / 100);
  
  return {
    ...plan,
    price: Math.round(discountedPrice * 100) / 100,
    billingCycle: 'yearly',
    discount,
    features: [
      ...plan.features,
      `${discount}% discount compared to monthly billing`,
      'Free month included'
    ]
  };
});

export const getPlanById = (id: string): SubscriptionPlan | undefined => {
  return subscriptionPlans.find(plan => plan.id === id);
};

export const getYearlyPlanById = (id: string): SubscriptionPlan | undefined => {
  return yearlyPlans.find(plan => plan.id === id);
};

export const calculateSavings = (monthlyPrice: number, yearlyPrice: number): number => {
  const monthlyTotal = monthlyPrice * 12;
  return Math.round((monthlyTotal - yearlyPrice) * 100) / 100;
};

