'use client';

import { useState } from 'react';
import { Search, Calendar, BookOpen, FileText, Award, TrendingUp, Download, Plus, Eye } from 'lucide-react';
import { toast } from 'sonner';

// Dummy examination data
const dummyExaminations = [
    {
        id: '1',
        name: 'First Term Examination 2025-26',
        type: 'Term Exam',
        startDate: '2025-12-15',
        endDate: '2025-12-28',
        status: 'Completed',
        classes: ['9-A', '9-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'],
        totalSubjects: 8,
        totalStudents: 158,
        resultsPublished: true,
        averagePercentage: 78.5,
    },
    {
        id: '2',
        name: 'Mid-Term Examination 2025-26',
        type: 'Mid-Term',
        startDate: '2025-09-10',
        endDate: '2025-09-20',
        status: 'Completed',
        classes: ['9-A', '9-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'],
        totalSubjects: 8,
        totalStudents: 158,
        resultsPublished: true,
        averagePercentage: 75.2,
    },
    {
        id: '3',
        name: 'Second Term Examination 2025-26',
        type: 'Term Exam',
        startDate: '2026-03-15',
        endDate: '2026-03-28',
        status: 'Upcoming',
        classes: ['9-A', '9-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'],
        totalSubjects: 8,
        totalStudents: 158,
        resultsPublished: false,
        averagePercentage: 0,
    },
    {
        id: '4',
        name: 'Unit Test 1 - January 2026',
        type: 'Unit Test',
        startDate: '2026-01-20',
        endDate: '2026-01-25',
        status: 'Scheduled',
        classes: ['9-A', '9-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'],
        totalSubjects: 5,
        totalStudents: 158,
        resultsPublished: false,
        averagePercentage: 0,
    },
];

// Dummy exam schedule
const dummyExamSchedule = [
    { id: '1', examId: '1', date: '2025-12-15', day: 'Monday', subject: 'Mathematics', time: '09:00 AM - 12:00 PM', duration: '3 hours', maxMarks: 100, class: '10-A' },
    { id: '2', examId: '1', date: '2025-12-16', day: 'Tuesday', subject: 'Science', time: '09:00 AM - 12:00 PM', duration: '3 hours', maxMarks: 100, class: '10-A' },
    { id: '3', examId: '1', date: '2025-12-17', day: 'Wednesday', subject: 'English', time: '09:00 AM - 12:00 PM', duration: '3 hours', maxMarks: 100, class: '10-A' },
    { id: '4', examId: '1', date: '2025-12-18', day: 'Thursday', subject: 'Social Science', time: '09:00 AM - 12:00 PM', duration: '3 hours', maxMarks: 100, class: '10-A' },
    { id: '5', examId: '1', date: '2025-12-19', day: 'Friday', subject: 'Hindi', time: '09:00 AM - 12:00 PM', duration: '3 hours', maxMarks: 100, class: '10-A' },
];

// Dummy results
const dummyResults = [
    { id: '1', examId: '1', class: '10-A', totalStudents: 35, passed: 32, failed: 3, highestMarks: 98, lowestMarks: 42, averageMarks: 78.5, passPercentage: 91.4 },
    { id: '2', examId: '1', class: '10-B', totalStudents: 33, passed: 31, failed: 2, highestMarks: 96, lowestMarks: 38, averageMarks: 76.8, passPercentage: 93.9 },
    { id: '3', examId: '1', class: '9-A', totalStudents: 32, passed: 30, failed: 2, highestMarks: 95, lowestMarks: 35, averageMarks: 75.2, passPercentage: 93.8 },
    { id: '4', examId: '1', class: '11-A', totalStudents: 30, passed: 28, failed: 2, highestMarks: 97, lowestMarks: 40, averageMarks: 79.3, passPercentage: 93.3 },
    { id: '5', examId: '1', class: '12-A', totalStudents: 28, passed: 27, failed: 1, highestMarks: 99, lowestMarks: 45, averageMarks: 82.1, passPercentage: 96.4 },
];

export default function ExaminationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedExam, setSelectedExam] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'exams' | 'schedule' | 'results'>('exams');

    const filteredExams = dummyExaminations.filter(exam =>
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const completedExams = dummyExaminations.filter(e => e.status === 'Completed').length;
    const upcomingExams = dummyExaminations.filter(e => e.status === 'Upcoming' || e.status === 'Scheduled').length;
    const totalStudents = dummyExaminations[0]?.totalStudents || 0;
    const avgPercentage = dummyExaminations.filter(e => e.resultsPublished).reduce((sum, e) => sum + e.averagePercentage, 0) / dummyExaminations.filter(e => e.resultsPublished).length || 0;

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Examinations</h1>
                    <p className="text-muted-foreground mt-1">Manage exams, schedules, and results</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => toast.info('Export feature coming soon!')}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
                    >
                        <Download className="w-5 h-5" />
                        Export
                    </button>
                    <button
                        onClick={() => toast.info('Add Exam feature coming soon!')}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Add Exam
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Exams</p>
                            <p className="text-2xl font-bold mt-1">{dummyExaminations.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Completed</p>
                            <p className="text-2xl font-bold mt-1 text-green-600">{completedExams}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Award className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Upcoming</p>
                            <p className="text-2xl font-bold mt-1 text-blue-600">{upcomingExams}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Avg Performance</p>
                            <p className="text-2xl font-bold mt-1 text-purple-600">{avgPercentage.toFixed(1)}%</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
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
                            All Exams
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
                    <button
                        onClick={() => setActiveTab('results')}
                        className={`flex-1 px-6 py-4 font-medium transition-colors ${activeTab === 'results'
                                ? 'bg-primary text-white'
                                : 'hover:bg-muted'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Award className="w-5 h-5" />
                            Results
                        </div>
                    </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {/* All Exams Tab */}
                    {activeTab === 'exams' && (
                        <div className="space-y-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search exams by name or type..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            {/* Exams List */}
                            <div className="space-y-3">
                                {filteredExams.map((exam) => (
                                    <div key={exam.id} className="bg-muted/30 rounded-xl p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold">{exam.name}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(exam.status)}`}>
                                                        {exam.status}
                                                    </span>
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-bold">
                                                        {exam.type}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Start Date</p>
                                                        <p className="font-semibold">{new Date(exam.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">End Date</p>
                                                        <p className="font-semibold">{new Date(exam.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Total Subjects</p>
                                                        <p className="font-semibold">{exam.totalSubjects}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Total Students</p>
                                                        <p className="font-semibold">{exam.totalStudents}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <p className="text-xs text-muted-foreground mb-2">Classes</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {exam.classes.map((cls, idx) => (
                                                            <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                                                                {cls}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                {exam.resultsPublished && (
                                                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                        <p className="text-sm font-medium text-green-700 dark:text-green-400">
                                                            ✓ Results Published • Average: {exam.averagePercentage}%
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => toast.info('View details feature coming soon!')}
                                                className="ml-4 p-2 hover:bg-muted rounded-lg transition-colors"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Exam Schedule Tab */}
                    {activeTab === 'schedule' && (
                        <div className="space-y-4">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-muted/50">
                                        <tr>
                                            <th className="text-left px-4 py-3 text-sm font-semibold">Date</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold">Day</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold">Subject</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold">Time</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold">Duration</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold">Max Marks</th>
                                            <th className="text-left px-4 py-3 text-sm font-semibold">Class</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {dummyExamSchedule.map((schedule) => (
                                            <tr key={schedule.id} className="hover:bg-muted/30 transition-colors">
                                                <td className="px-4 py-3 font-medium">
                                                    {new Date(schedule.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                                </td>
                                                <td className="px-4 py-3">{schedule.day}</td>
                                                <td className="px-4 py-3 font-semibold">{schedule.subject}</td>
                                                <td className="px-4 py-3 text-sm">{schedule.time}</td>
                                                <td className="px-4 py-3 text-sm">{schedule.duration}</td>
                                                <td className="px-4 py-3 font-medium">{schedule.maxMarks}</td>
                                                <td className="px-4 py-3">
                                                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                                                        {schedule.class}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Results Tab */}
                    {activeTab === 'results' && (
                        <div className="space-y-4">
                            {dummyResults.map((result) => (
                                <div key={result.id} className="bg-muted/30 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold">Class {result.class}</h3>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm font-bold">
                                            {result.passPercentage}% Pass Rate
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Total Students</p>
                                            <p className="text-xl font-bold">{result.totalStudents}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Passed</p>
                                            <p className="text-xl font-bold text-green-600">{result.passed}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Failed</p>
                                            <p className="text-xl font-bold text-red-600">{result.failed}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Average Marks</p>
                                            <p className="text-xl font-bold text-blue-600">{result.averageMarks}%</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <p className="text-xs text-muted-foreground">Highest Marks</p>
                                            <p className="text-lg font-bold text-green-700 dark:text-green-400">{result.highestMarks}/100</p>
                                        </div>
                                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                            <p className="text-xs text-muted-foreground">Lowest Marks</p>
                                            <p className="text-lg font-bold text-red-700 dark:text-red-400">{result.lowestMarks}/100</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {filteredExams.length === 0 && activeTab === 'exams' && (
                <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
                    <p className="text-muted-foreground">No examinations found</p>
                </div>
            )}
        </div>
    );
}
