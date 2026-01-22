import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Zap, Layout, Shield, BarChart3, Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from './UI';
import { CalendarDemo } from './Calendar';
import { Feature, PricingPlan, Testimonial } from '../types';

// --- Hero Section ---
export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden lg:pt-40 lg:pb-32">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-white -z-10 dark:bg-dark-bg">
         <div className="absolute rounded-full -top-24 -left-24 h-96 w-96 bg-blue-500/20 blur-3xl filter" />
         <div className="absolute right-0 rounded-full top-1/2 h-96 w-96 bg-purple-500/20 blur-3xl filter" />
      </div>

      <div className="container px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-6">
            🚀 SmartCal 2.0 is live
          </span>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            Schedule smarter, <br className="hidden sm:block" />
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              focus better.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto mb-10 text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
            The intelligent calendar that manages your time so you don't have to. 
            Smart suggestions, drag-and-drop organization, and focus modes built for high achievers.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full gap-2 sm:w-auto">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Live Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-12 text-sm font-medium text-slate-500">
             <div className="flex flex-col items-center">
                 <span className="text-2xl font-bold text-slate-900 dark:text-white">12k+</span>
                 <span>Active Users</span>
             </div>
             <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
             <div className="flex flex-col items-center">
                 <span className="text-2xl font-bold text-slate-900 dark:text-white">99.9%</span>
                 <span>Uptime</span>
             </div>
             <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
             <div className="flex flex-col items-center">
                 <span className="text-2xl font-bold text-slate-900 dark:text-white">2x</span>
                 <span>Productivity</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Features Section ---
const features: Feature[] = [
  {
    title: 'Smart Scheduling',
    description: 'AI-powered suggestions find the perfect time slots for your deep work sessions.',
    icon: Zap,
  },
  {
    title: 'Drag & Drop',
    description: 'Intuitively manage your day. Moving meetings is as easy as moving a card.',
    icon: Layout,
  },
  {
    title: 'Focus Mode',
    description: 'Eliminate distractions with a dedicated day view that highlights what matters now.',
    icon: Shield,
  },
  {
    title: 'Time Analytics',
    description: 'Visualize where your time goes with beautiful, built-in dashboard charts.',
    icon: BarChart3,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Everything you need to master your time
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
            SmartCal isn't just a calendar; it's your personal productivity assistant.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 bg-white shadow-lg rounded-2xl dark:bg-slate-800"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-blue-600 bg-blue-100 rounded-xl dark:bg-blue-900/50 dark:text-blue-400">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Demo Section ---
export const DemoSection = () => {
  return (
    <section id="demo" className="relative py-24">
       <div className="absolute inset-0 origin-top-left transform skew-y-3 bg-indigo-900/5 -z-10" />
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Try it yourself
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
            Drag events, switch views, and experience the fluidity of SmartCal right here. 
            <span className="block mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">*Data is saved locally to your browser.</span>
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
            <CalendarDemo />
        </div>
      </div>
    </section>
  );
};

// --- Pricing Section ---
const plans: PricingPlan[] = [
    {
      name: 'Free',
      price: '$0',
      period: '/mo',
      features: ['Basic Calendar', 'Google Sync', '1 Week History', 'Mobile App'],
      cta: 'Start for Free',
    },
    {
      name: 'Pro',
      price: '$12',
      period: '/mo',
      features: ['Smart Suggestions', 'Unlimited History', 'Priority Support', 'Focus Mode', 'Analytics'],
      cta: 'Get Pro',
      popular: true,
    },
    {
      name: 'Team',
      price: '$29',
      period: '/mo',
      features: ['All Pro Features', 'Team Scheduling', 'Admin Dashboard', 'SSO', 'API Access'],
      cta: 'Contact Sales',
    },
  ];
  
  export const Pricing = () => {
    return (
      <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Simple, transparent pricing
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800 ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105 z-10' : ''
                }`}
              >
                {plan.popular && (
                  <span className="absolute px-3 py-1 text-xs font-semibold text-white -translate-x-1/2 rounded-full -top-3 left-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                <div className="flex items-baseline my-4 text-slate-900 dark:text-white">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-slate-500 dark:text-slate-400">{plan.period}</span>
                </div>
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <Check className="w-5 h-5 text-blue-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    className="w-full"
                >
                    {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
// --- Testimonials Section ---
const testimonials: Testimonial[] = [
    {
        id: 1,
        content: "SmartCal completely changed how I manage my agency. The smart suggestions save me hours every week.",
        author: "Sarah Jenkins",
        role: "CEO, CreativeFlow",
        avatar: "https://picsum.photos/100/100?random=1"
    },
    {
        id: 2,
        content: "The interface is gorgeous and the drag-and-drop functionality is silky smooth. Best calendar app hands down.",
        author: "David Chen",
        role: "Product Designer",
        avatar: "https://picsum.photos/100/100?random=2"
    },
    {
        id: 3,
        content: "Focus mode is a game changer for ADHD. It helps me stay on track without getting overwhelmed.",
        author: "Emily Watson",
        role: "Software Engineer",
        avatar: "https://picsum.photos/100/100?random=3"
    }
];

export const Testimonials = () => {
    return (
        <section className="py-24 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Loved by thousands</h2>
                </div>
                <div className="flex flex-col justify-center gap-6 md:flex-row">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="flex-1 max-w-md p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl"
                        >
                            <div className="flex gap-1 mb-4">
                                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400"/>)}
                            </div>
                            <p className="mb-6 italic text-slate-700 dark:text-slate-300">"{t.content}"</p>
                            <div className="flex items-center gap-4">
                                <img src={t.avatar} alt={t.author} className="object-cover w-12 h-12 rounded-full" />
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{t.author}</h4>
                                    <p className="text-sm text-slate-500">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- Footer ---
export const Footer = () => {
    return (
        <footer className="py-12 bg-white border-t border-slate-200 dark:bg-slate-900 dark:border-slate-800">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center justify-between md:flex-row">
                    <div className="mb-4 md:mb-0">
                        <span className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">SmartCal</span>
                        <p className="mt-2 text-sm text-slate-500">
                          © {new Date().getFullYear()} SmartCal Inc. All rights reserved.
                        </p>

                    </div>
                    <div className="flex gap-8 mb-4 md:mb-0">
                        <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">About</a>
                        <a href="#features" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">Features</a>
                        <a href="#pricing" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">Pricing</a>
                        <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">Contact</a>
                    </div>
                    <div className="flex gap-4">
                        <Twitter className="w-5 h-5 cursor-pointer text-slate-400 hover:text-blue-500" />
                        <Github className="w-5 h-5 cursor-pointer text-slate-400 hover:text-slate-900 dark:hover:text-white" />
                        <Linkedin className="w-5 h-5 cursor-pointer text-slate-400 hover:text-blue-700" />
                    </div>
                </div>
            </div>
        </footer>
    );
};
