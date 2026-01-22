export type ViewMode = 'month' | 'week' | 'day';

export type EventPriority = 'low' | 'medium' | 'high';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date; // Normalized to start of day for grid placement
  startTime: string; // HH:mm
  duration: number; // minutes
  priority: EventPriority;
  type: 'meeting' | 'work' | 'personal';
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  avatar: string;
}
