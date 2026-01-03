'use client';

import { useState } from 'react';
import { Search, Calendar, FileText, Award, Clock } from 'lucide-react';

// Dummy exam data for student
const studentExams = [
    {
        id: '1',
        name: 'First Term Examination 2025-26',
        type: 'Term Exam',
        startDate: '2025-12-15',
        endDate: '2025-12-28',
        status: 'Completed',
        resultsPublished: true,
        score: '85%',
    },
    {
        id: '2',
        name: 'Second Term Examination 2025-26',
        type: 'Term Exam',
        startDate: '2026-03-15',
        endDate: '2026-03-28',
        status: 'Upcoming',
        resultsPublished: false,
        score: '-',
    },
    {
        id: '3',
        name: 'Unit Test 1 - January 2026',
        type: 'Unit Test',
        startDate: '2026-01-20',
        endDate: '2026-01-25',
        status: 'Scheduled',
        resultsPublished: false,
        score: '-',
    },
];

const examSchedule = [
    { id: '1', examId: '2', date: '2026-03-15', day: 'Monday', subject: 'Mathematics', time: '09:00 AM - 12:00 PM', duration: '3 hours', maxMarks: 100 },
    { id: '2', examId: '2', date: '2026-03-17', day: 'Wednesday', subject: 'Physics', time: '09:00 AM - 12:00 PM', duration: '3 hours', maxMarks: 100 },
    { id: '3', examId: '2', date: '2026-03-19', day: 'Friday', subject: 'Chemistry', time: '09:00 AM - 12:00 PM', duration: '3 hours', maxMarks: 100 },
    { id: '4', examId: '3', date: '2026-01-20', day: 'Tuesday', subject: 'Mathematics', time: '10:00 AM - 11:30 AM', duration: '1.5 hours', maxMarks: 50 },
];

export default function StudentExaminationsPage() {
    const [activeTab, setActiveTab] = useState<'exams' | 'schedule'>('exams');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Upcoming':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Scheduled':
                return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">My Examinations</h1>
                <p className="text-muted-foreground mt-1">View your exam schedule and history</p>
            </div>

            <div className="bg-card rounded-xl border overflow-hidden">
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab('exams')}
                        className={`flex-1 px-6 py-4 font-medium transition-colors ${activeTab === 'exams'
                                ? 'bg-primary text-white'
                                : 'hover:bg-muted'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <FileText className="w-5 h-5" />
                            My Exams
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('schedule')}
                        className={`flex-1 px-6 py-4 font-medium transition-colors ${activeTab === 'schedule'
                                ? 'bg-primary text-white'
                                : 'hover:bg-muted'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Exam Schedule
                        </div>
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'exams' && (
                        <div className="grid gap-4">
                            {studentExams.map((exam) => (
                                <div key={exam.id} className="bg-muted/30 rounded-xl p-6 border hover:shadow-sm transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-bold">{exam.name}</h3>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(exam.status)}`}>
                                                    {exam.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(exam.startDate).toLocaleDateString()} - {new Date(exam.endDate).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Award className="w-4 h-4" />
                                                    {exam.type}
                                                </div>
                                            </div>
                                        </div>
                                        {exam.resultsPublished ? (
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">Score</p>
                                                <p className="text-2xl font-bold text-green-600">{exam.score}</p>
                                            </div>
                                        ) : (
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">Results</p>
                                                <p className="text-sm font-semibold text-orange-600">Pending</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'schedule' && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="text-left px-4 py-3 text-sm font-semibold">Date</th>
                                        <th className="text-left px-4 py-3 text-sm font-semibold">Subject</th>
                                        <th className="text-left px-4 py-3 text-sm font-semibold">Time</th>
                                        <th className="text-left px-4 py-3 text-sm font-semibold">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {examSchedule.map((schedule) => (
                                        <tr key={schedule.id} className="hover:bg-muted/30">
                                            <td className="px-4 py-3">
                                                <div className="font-medium">{new Date(schedule.date).toLocaleDateString()}</div>
                                                <div className="text-xs text-muted-foreground">{schedule.day}</div>
                                            </td>
                                            <td className="px-4 py-3 font-semibold">{schedule.subject}</td>
                                            <td className="px-4 py-3 text-sm">{schedule.time}</td>
                                            <td className="px-4 py-3 text-sm">{schedule.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
