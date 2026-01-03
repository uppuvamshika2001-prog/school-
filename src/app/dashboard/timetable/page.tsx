'use client';

import { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { cn } from '@/lib/utils';
import {
  Plus,
  Edit,
  Trash2,
  Clock,
  BookOpen,
  User,
  Calendar,
  Save,
  X
} from 'lucide-react';
import { toast } from 'sonner';

// Dummy Timetable Data Generator
const initialTimetables = [
  { id: '1', dayOfWeek: 'MONDAY', periodNumber: 1, subject: 'Maths', teacher: 'Sarah Wilson', class: '10-A', room: '201' },
  { id: '2', dayOfWeek: 'MONDAY', periodNumber: 2, subject: 'Science', teacher: 'Rajesh Kumar', class: '10-A', room: '201' },
  { id: '3', dayOfWeek: 'MONDAY', periodNumber: 3, subject: 'Telugu', teacher: 'Amit Patel', class: '10-A', room: '101' },
  { id: '4', dayOfWeek: 'TUESDAY', periodNumber: 1, subject: 'English', teacher: 'Priya Sharma', class: '10-A', room: '201' },
  { id: '5', dayOfWeek: 'TUESDAY', periodNumber: 2, subject: 'Hindi', teacher: 'Neha Singh', class: '10-A', room: '201' },
  { id: '6', dayOfWeek: 'WEDNESDAY', periodNumber: 1, subject: 'Maths', teacher: 'Sarah Wilson', class: '10-A', room: '201' },
  { id: '7', dayOfWeek: 'WEDNESDAY', periodNumber: 4, subject: 'Social', teacher: 'Anjali Mehta', class: '10-A', room: 'Lab 2' },
  { id: '8', dayOfWeek: 'THURSDAY', periodNumber: 2, subject: 'Telugu', teacher: 'Vikram Reddy', class: '10-A', room: 'Comp Lab' },
  { id: '9', dayOfWeek: 'FRIDAY', periodNumber: 1, subject: 'Science', teacher: 'Rajesh Kumar', class: '10-A', room: '201' },
  { id: '10', dayOfWeek: 'FRIDAY', periodNumber: 3, subject: 'Social', teacher: 'Rohan Das', class: '10-A', room: '201' },
  { id: '11', dayOfWeek: 'SATURDAY', periodNumber: 1, subject: 'Hindi', teacher: 'Coach Singh', class: '10-A', room: '201' },
];

export default function TimetablePage() {
  const { user } = useAuthStore();
  const [timetables, setTimetables] = useState(initialTimetables);
  const [editMode, setEditMode] = useState<string | null>(null); // ID of period being edited
  const [selectedClass, setSelectedClass] = useState('10-A');

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const periods = [1, 2, 3, 4, 5, 6, 7];

  const handleEdit = (id: string) => {
    setEditMode(id);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this period?')) {
      setTimetables(prev => prev.filter(t => t.id !== id));
      toast.success('Period removed successfully');
    }
  };

  const handleSave = (id: string, newSubject: string) => {
    setTimetables(prev => prev.map(t => t.id === id ? { ...t, subject: newSubject } : t));
    setEditMode(null);
    toast.success('Timetable updated successfully');
  };

  const handleAddPeriod = (day: string, periodNumber: number) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newPeriod = {
      id: newId,
      dayOfWeek: day,
      periodNumber,
      subject: 'New Subject',
      teacher: 'Select Teacher',
      class: selectedClass,
      room: 'TBD'
    };
    setTimetables([...timetables, newPeriod]);
    setEditMode(newId); // Immediately enter edit mode
  };

  const getTimetableEntry = (day: string, period: number) => {
    return timetables.find(
      (t) => t.dayOfWeek === day && t.periodNumber === period
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Master Timetable</h1>
          <p className="text-muted-foreground mt-1">
            Manage class schedules (Class {selectedClass})
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-background"
          >
            <option value="10-A">Class 10-A</option>
            <option value="10-B">Class 10-B</option>
            <option value="9-A">Class 9-A</option>
          </select>
          <button
            onClick={() => toast.info('Auto-generate feature coming soon!')}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
          >
            <Clock className="w-5 h-5" />
            Auto-Generate
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Periods</p>
              <p className="text-2xl font-bold mt-1">{timetables.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Class Load</p>
              <p className="text-2xl font-bold mt-1">{(timetables.length / 35 * 100).toFixed(0)}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold border-r w-32 sticky left-0 bg-muted/50 z-10">
                  Period
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="px-4 py-3 text-center text-sm font-semibold border-r last:border-r-0 min-w-[200px]"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map((period) => (
                <tr key={period} className="border-b last:border-b-0">
                  <td className="px-4 py-3 border-r bg-muted/30 sticky left-0 z-10">
                    <div className="text-center">
                      <p className="font-semibold">Period {period}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {period === 1 && '08:00 - 08:45'}
                        {period === 2 && '08:45 - 09:30'}
                        {period === 3 && '09:30 - 10:15'}
                        {period === 4 && '10:30 - 11:15'}
                        {period === 5 && '11:15 - 12:00'}
                        {period === 6 && '12:00 - 12:45'}
                        {period === 7 && '13:30 - 14:15'}
                      </p>
                    </div>
                  </td>
                  {days.map((day) => {
                    const entry = getTimetableEntry(day, period);
                    const isEditing = editMode === entry?.id;

                    return (
                      <td
                        key={`${day}-${period}`}
                        className="px-2 py-2 border-r last:border-r-0 hover:bg-muted/10 transition-colors align-top h-32"
                      >
                        {entry ? (
                          <div className="group relative h-full">
                            <div className={`
                                h-full rounded-lg p-3 border shadow-sm transition-all
                                ${isEditing ? 'bg-background ring-2 ring-primary border-primary' : 'bg-card border-border hover:border-primary/50'}
                            `}>
                              {isEditing ? (
                                <div className="space-y-2">
                                  <input
                                    type="text"
                                    defaultValue={entry.subject}
                                    className="w-full px-2 py-1 text-sm font-bold border rounded"
                                    autoFocus
                                    onBlur={(e) => handleSave(entry.id, e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') handleSave(entry.id, e.currentTarget.value);
                                    }}
                                  />
                                  <p className="text-xs text-muted-foreground">Teacher: {entry.teacher}</p>
                                  <div className="flex justify-end gap-1 mt-1">
                                    <button onClick={() => setEditMode(null)} className="p-1 hover:bg-muted rounded"><X className="w-3 h-3" /></button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-start justify-between gap-1 mb-1">
                                    <div className="flex items-center gap-1.5 overflow-hidden">
                                      <BookOpen className="w-3 h-3 text-primary flex-shrink-0" />
                                      <p className="font-bold text-sm text-primary truncate" title={entry.subject}>
                                        {entry.subject}
                                      </p>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-0.5 bg-background/80 rounded backdrop-blur-sm">
                                      <button onClick={() => handleEdit(entry.id)} className="p-1.5 hover:bg-primary/10 text-primary rounded" title="Edit">
                                        <Edit className="w-3 h-3" />
                                      </button>
                                      <button onClick={() => handleDelete(entry.id)} className="p-1.5 hover:bg-destructive/10 text-destructive rounded" title="Delete">
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="space-y-1 mt-2">
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                      <User className="w-3 h-3" />
                                      <span className="truncate">{entry.teacher}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                      <Clock className="w-3 h-3" />
                                      <span>Room {entry.room}</span>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddPeriod(day, period)}
                            className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg hover:border-primary hover:bg-primary/5 transition-colors group opacity-50 hover:opacity-100"
                          >
                            <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-xs text-muted-foreground font-medium mt-1">Add</span>
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
