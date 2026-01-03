'use client';

import { Clock, BookOpen, MapPin } from 'lucide-react';

const mockTeacherTimetable = {
    Monday: [
        { time: '09:00 - 10:00', class: '10-A', subject: 'Maths', room: '201' },
        { time: '10:00 - 11:00', class: '10-B', subject: 'Science', room: '202' },
        { time: '11:00 - 11:15', class: 'Break', subject: '-', room: '-' },
        { time: '11:15 - 12:15', class: '9-A', subject: 'Telugu', room: '101' },
    ],
    Tuesday: [
        { time: '09:00 - 10:00', class: '9-B', subject: 'Hindi', room: '102' },
        { time: '10:00 - 11:00', class: 'Free', subject: '-', room: '-' },
        { time: '11:00 - 11:15', class: 'Break', subject: '-', room: '-' },
        { time: '11:15 - 12:15', class: '10-A', subject: 'English', room: '201' },
    ],
    Wednesday: [
        { time: '09:00 - 10:00', class: '10-B', subject: 'Social', room: '202' },
        { time: '10:00 - 11:00', class: '9-A', subject: 'Maths', room: '101' },
        { time: '11:00 - 11:15', class: 'Break', subject: '-', room: '-' },
        { time: '11:15 - 12:15', class: 'Free', subject: '-', room: '-' },
    ],
    Thursday: [
        { time: '09:00 - 10:00', class: '10-A', subject: 'Science', room: '201' },
        { time: '10:00 - 11:00', class: 'Free', subject: '-', room: '-' },
        { time: '11:00 - 11:15', class: 'Break', subject: '-', room: '-' },
        { time: '11:15 - 12:15', class: '9-B', subject: 'Telugu', room: '102' },
    ],
    Friday: [
        { time: '09:00 - 10:00', class: '9-A', subject: 'Hindi', room: '101' },
        { time: '10:00 - 11:00', class: '10-B', subject: 'English', room: '202' },
        { time: '11:00 - 11:15', class: 'Break', subject: '-', room: '-' },
        { time: '11:15 - 12:15', class: 'Free', subject: '-', room: '-' },
    ],
    Saturday: [
        { time: '09:00 - 10:00', class: '10-A', subject: 'Social', room: '201' },
        { time: '10:00 - 11:00', class: 'Free', subject: '-', room: '-' },
        { time: '11:00 - 11:15', class: 'Break', subject: '-', room: '-' },
        { time: '11:15 - 12:15', class: 'Extra', subject: 'Activity', room: 'Field' },
    ]
};

export default function TeacherTimetablePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">My Timetable</h1>
                <p className="text-muted-foreground mt-1">Weekly teaching schedule</p>
            </div>

            <div className="grid gap-6">
                {Object.entries(mockTeacherTimetable).map(([day, slots]) => (
                    <div key={day} className="bg-card rounded-xl border shadow-sm p-4">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="w-2 h-6 bg-primary rounded-full"></span>
                            {day}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {slots.map((slot, idx) => (
                                <div key={idx} className={`p-4 rounded-lg border ${slot.class === 'Break' ? 'bg-orange-50 border-orange-100 dark:bg-orange-900/10' :
                                    slot.class === 'Free' ? 'bg-gray-50 border-gray-100 dark:bg-gray-900/10' :
                                        'bg-primary/5 border-primary/10'
                                    }`}>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <Clock className="w-3 h-3" />
                                        {slot.time}
                                    </div>
                                    <div className="font-bold text-lg mb-1">{slot.class}</div>
                                    {slot.subject !== '-' && (
                                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                            <BookOpen className="w-3 h-3" />
                                            {slot.subject}
                                        </div>
                                    )}
                                    {slot.room !== '-' && (
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                            <MapPin className="w-3 h-3" />
                                            Room {slot.room}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
