import React, { useState } from 'react';
import { useCalendarStore, useToastStore } from '../store';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isToday, 
  startOfWeek, 
  endOfWeek, 
  addMonths, 
  subMonths 
} from 'date-fns';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalIcon, Clock, Sparkles } from 'lucide-react';
import { Button, Modal, Input, Select, Badge } from './UI';
import { CalendarEvent } from '../types';

// --- Types for DnD ---
const ItemTypes = {
  EVENT: 'event',
};

// --- Draggable Event Component ---
const DraggableEvent = ({ event, onClick }: { event: CalendarEvent; onClick: () => void }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EVENT,
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const priorityColors = {
    low: 'border-l-blue-400 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
    medium: 'border-l-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300',
    high: 'border-l-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300',
  };

  return (
    <div
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`mb-1 cursor-grab active:cursor-grabbing rounded p-1.5 text-xs shadow-sm border-l-2 transition-all hover:scale-[1.02] ${
        priorityColors[event.priority]
      } ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="font-semibold truncate">{event.title}</div>
      <div className="text-[10px] opacity-80">{event.startTime}</div>
    </div>
  );
};

// --- Droppable Day Cell ---
const DayCell = ({ date, children, isCurrentMonth }: { date: Date; children: React.ReactNode; isCurrentMonth: boolean }) => {
  const { moveEvent } = useCalendarStore();
  const { addToast } = useToastStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.EVENT,
    drop: (item: { id: string }) => {
      moveEvent(item.id, date);
      addToast(`Event moved to ${format(date, 'MMM d')}`, 'success');
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as unknown as React.LegacyRef<HTMLDivElement>}
      className={`min-h-[100px] border-b border-r border-slate-100 dark:border-slate-800 p-2 transition-colors ${
        !isCurrentMonth ? 'bg-slate-50/50 dark:bg-slate-900/50 text-slate-400' : 'bg-white dark:bg-slate-900'
      } ${isOver ? 'bg-blue-50 dark:bg-blue-900/30' : ''} ${
        isToday(date) ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
      }`}
    >
      <div className={`mb-2 text-right text-sm font-medium ${isToday(date) ? 'text-blue-600 dark:text-blue-400' : ''}`}>
        {format(date, 'd')}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

// --- Main Calendar Demo Component ---
export const CalendarDemo = () => {
  const { events, addEvent, viewMode, setViewMode } = useCalendarStore();
  const { addToast } = useToastStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Modal Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventPriority, setNewEventPriority] = useState<'low'|'medium'|'high'>('medium');
  const [newEventTime, setNewEventTime] = useState('09:00');

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleCreateEvent = () => {
    if (!newEventTitle) return;
    
    const newEvent: CalendarEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEventTitle,
      date: currentDate, // Default to current view date
      startTime: newEventTime,
      duration: 60,
      priority: newEventPriority,
      type: 'work',
    };
    
    addEvent(newEvent);
    addToast('Event created successfully', 'success');
    setIsModalOpen(false);
    setNewEventTitle('');
  };

  const handleSmartSuggest = () => {
    // Mock "Smart Suggestion" logic
    addToast('Analyzing your schedule...', 'info');
    setTimeout(() => {
        const suggestedTime = '14:00';
        setNewEventTime(suggestedTime);
        setNewEventTitle('Deep Work Session');
        setNewEventPriority('high');
        setIsModalOpen(true);
        addToast(`Suggestion found: Deep Work at ${suggestedTime}`, 'success');
    }, 800);
  };

  // Filter events for "Focus Mode" (Day View)
  const todaysEvents = events.filter(e => isSameDay(e.date, currentDate)).sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
        
        {/* Header Controls */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {viewMode === 'month' ? format(currentDate, 'MMMM yyyy') : 'Focus Mode'}
            </h2>
            <div className="flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-700">
              <button 
                onClick={handlePrevMonth}
                className="rounded p-1 hover:bg-white dark:hover:bg-slate-600"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={handleNextMonth}
                className="rounded p-1 hover:bg-white dark:hover:bg-slate-600"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setViewMode(viewMode === 'month' ? 'day' : 'month')}
                className="gap-2"
            >
               {viewMode === 'month' ? <CalIcon size={16}/> : <Clock size={16}/>}
               {viewMode === 'month' ? 'Switch to Focus Mode' : 'Switch to Month View'}
            </Button>
            
            <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleSmartSuggest}
                className="gap-2 text-indigo-600 dark:text-indigo-400"
            >
              <Sparkles size={16} />
              Smart Suggest
            </Button>

            <Button onClick={() => setIsModalOpen(true)} size="sm" className="gap-2">
              <Plus size={16} /> New Event
            </Button>
          </div>
        </div>

        {/* Calendar Grid (Month View) */}
        {viewMode === 'month' && (
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-7 bg-slate-50 text-center text-xs font-semibold uppercase text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="py-3">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {daysInMonth.map((day) => (
                <DayCell 
                  key={day.toISOString()} 
                  date={day} 
                  isCurrentMonth={day.getMonth() === currentDate.getMonth()}
                >
                  {events
                    .filter((e) => isSameDay(e.date, day))
                    .map((event) => (
                      <DraggableEvent 
                        key={event.id} 
                        event={event} 
                        onClick={() => setSelectedEvent(event)} 
                      />
                    ))}
                </DayCell>
              ))}
            </div>
          </div>
        )}

        {/* Focus Mode (Day View) */}
        {viewMode === 'day' && (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="min-h-[400px] flex flex-col gap-4"
           >
              <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                  <div>
                      <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200">Today's Focus</h3>
                      <p className="text-sm text-indigo-700 dark:text-indigo-400">You have {todaysEvents.length} events scheduled.</p>
                  </div>
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      {format(currentDate, 'd')}
                  </div>
              </div>

              <div className="flex-1 space-y-3">
                  {todaysEvents.length === 0 ? (
                      <div className="flex h-full items-center justify-center text-slate-400">
                          No events for today. Enjoy your free time!
                      </div>
                  ) : (
                      todaysEvents.map((event, idx) => (
                          <motion.div 
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm dark:bg-slate-800 dark:border-slate-700"
                          >
                              <div className="w-16 text-center font-mono text-sm font-semibold text-slate-500">
                                  {event.startTime}
                              </div>
                              <div className={`w-1 h-12 rounded-full ${
                                  event.priority === 'high' ? 'bg-red-500' : event.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`} />
                              <div className="flex-1">
                                  <h4 className="font-semibold">{event.title}</h4>
                                  <span className="text-xs text-slate-500 capitalize">{event.type} • {event.duration}m</span>
                              </div>
                              <Badge variant={event.priority === 'high' ? 'danger' : event.priority === 'medium' ? 'warning' : 'info'}>
                                  {event.priority}
                              </Badge>
                          </motion.div>
                      ))
                  )}
              </div>
           </motion.div>
        )}

        {/* Create Event Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Event"
        >
          <div className="space-y-4">
            <Input 
                label="Event Title" 
                value={newEventTitle} 
                onChange={(e) => setNewEventTitle(e.target.value)} 
                placeholder="e.g. Weekly Sync"
            />
            <div className="grid grid-cols-2 gap-4">
                <Input 
                    type="time" 
                    label="Start Time" 
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                />
                <Select 
                    label="Priority"
                    value={newEventPriority}
                    onChange={(e) => setNewEventPriority(e.target.value as any)}
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </Select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateEvent}>Create Event</Button>
            </div>
          </div>
        </Modal>

        {/* View Details Modal (Simplistic for demo) */}
         <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title="Event Details"
        >
          {selectedEvent && (
              <div className="space-y-4">
                  <div>
                      <h4 className="text-sm font-medium text-slate-500">Title</h4>
                      <p className="text-lg font-semibold">{selectedEvent.title}</p>
                  </div>
                  <div className="flex gap-4">
                     <div>
                        <h4 className="text-sm font-medium text-slate-500">Time</h4>
                        <p>{format(selectedEvent.date, 'MMM d, yyyy')} at {selectedEvent.startTime}</p>
                     </div>
                     <div>
                        <h4 className="text-sm font-medium text-slate-500">Priority</h4>
                        <Badge variant={selectedEvent.priority === 'high' ? 'danger' : selectedEvent.priority === 'medium' ? 'warning' : 'info'}>
                            {selectedEvent.priority}
                        </Badge>
                     </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                      <Button variant="outline" onClick={() => setSelectedEvent(null)}>Close</Button>
                  </div>
              </div>
          )}
        </Modal>

      </div>
    </DndProvider>
  );
};
