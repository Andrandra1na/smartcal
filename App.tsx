import React, { useEffect } from 'react';
import { useThemeStore, useToastStore } from './store';
import { Hero, Features, DemoSection, Pricing, Testimonials, Footer } from './components/Sections';
import { Button } from './components/UI';
import { Sun, Moon, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// --- Navbar ---
const Navbar = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <nav className="fixed top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          SmartCal
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">Features</a>
          <a href="#demo" className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">Demo</a>
          <a href="#pricing" className="text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Button size="sm" className="hidden sm:inline-flex">Sign In</Button>
        </div>
      </div>
    </nav>
  );
};

// --- Toast Notification System ---
const ToastContainer = () => {
    const { toasts, removeToast } = useToastStore();
    
    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="pointer-events-auto flex items-center gap-3 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10"
                    >
                        {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
                        {toast.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{toast.message}</p>
                        <button onClick={() => removeToast(toast.id)} className="ml-2 text-slate-400 hover:text-slate-500">
                             <span className="sr-only">Close</span>
                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                             </svg>
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

const App = () => {
  const { isDark } = useThemeStore();

  // Apply dark mode class to body/html
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-dark-bg dark:text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DemoSection />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
