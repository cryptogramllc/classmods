export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  maxStudents: number;
  maxSubjects: number;
  maxModules: number;
  includesExams: boolean;
  includesProgressTracking: boolean;
  includesParentDashboard: boolean;
  includesOfflineAccess: boolean;
  includesCustomContent: boolean;
  popular?: boolean;
  discount?: number; // percentage discount for yearly plans
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentMethodId?: string;
  lastBillingDate?: Date;
  nextBillingDate?: Date;
  trialEndDate?: Date;
  cancelAtPeriodEnd?: boolean;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  createdAt: Date;
}

export interface BillingHistory {
  id: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'success' | 'failed' | 'pending' | 'refunded';
  description: string;
  invoiceUrl?: string;
  createdAt: Date;
}

export interface SubscriptionUsage {
  userId: string;
  planId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  studentsCount: number;
  subjectsAccessed: number;
  modulesCompleted: number;
  examsTaken: number;
  storageUsed: number; // in MB
  lastUpdated: Date;
}

