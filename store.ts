import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CalendarEvent, ViewMode, Toast } from './types';
import { addDays, startOfToday, setHours, setMinutes } from 'date-fns';

// --- Toast Store ---
interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type = 'info') => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

// --- Theme Store ---
interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    { name: 'smartcal-theme' }
  )
);

// --- Calendar Store ---
interface CalendarStore {
  events: CalendarEvent[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  addEvent: (event: CalendarEvent) => void;
  moveEvent: (id: string, newDate: Date) => void;
  deleteEvent: (id: string) => void;
}

const today = startOfToday();

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Product Strategy',
    date: today,
    startTime: '10:00',
    duration: 60,
    priority: 'high',
    type: 'meeting',
  },
  {
    id: '2',
    title: 'Deep Work: Coding',
    date: addDays(today, 1),
    startTime: '13:00',
    duration: 120,
    priority: 'medium',
    type: 'work',
  },
  {
    id: '3',
    title: 'Team Sync',
    date: addDays(today, -2),
    startTime: '09:30',
    duration: 30,
    priority: 'low',
    type: 'meeting',
  },
  {
    id: '4',
    title: 'Lunch with Client',
    date: addDays(today, 3),
    startTime: '12:00',
    duration: 90,
    priority: 'high',
    type: 'personal',
  },
];

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set) => ({
      events: mockEvents,
      viewMode: 'month',
      setViewMode: (mode) => set({ viewMode: mode }),
      addEvent: (event) =>
        set((state) => ({ events: [...state.events, event] })),
      moveEvent: (id, newDate) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, date: newDate } : e
          ),
        })),
      deleteEvent: (id) =>
        set((state) => ({ events: state.events.filter((e) => e.id !== id) })),
    }),
    { name: 'smartcal-events' }
  )
);
