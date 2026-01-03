'use client';

import { useState } from 'react';
import { Search, Calendar, Users, CheckCircle, XCircle, Clock, Download, Filter } from 'lucide-react';
import { toast } from 'sonner';

// Dummy attendance data
const dummyAttendanceData = [
    {
        id: '1',
        class: '10-A',
        date: '2026-01-02',
        totalStudents: 35,
        present: 32,
        absent: 3,
        late: 0,
        percentage: 91.4,
        students: [
            { id: 'S1', name: 'Arjun Sharma', rollNo: '01', status: 'Present', time: '08:45 AM' },
            { id: 'S2', name: 'Priya Patel', rollNo: '02', status: 'Present', time: '08:42 AM' },
            { id: 'S3', name: 'Rahul Kumar', rollNo: '03', status: 'Absent', time: '-' },
            { id: 'S4', name: 'Sneha Singh', rollNo: '04', status: 'Present', time: '08:50 AM' },
            { id: 'S5', name: 'Amit Verma', rollNo: '05', status: 'Present', time: '08:38 AM' },
        ]
    },
    {
        id: '2',
        class: '10-B',
        date: '2026-01-02',
        totalStudents: 33,
        present: 31,
        absent: 2,
        late: 0,
        percentage: 93.9,
        students: [
            { id: 'S6', name: 'Neha Gupta', rollNo: '01', status: 'Present', time: '08:40 AM' },
            { id: 'S7', name: 'Vikram Reddy', rollNo: '02', status: 'Present', time: '08:43 AM' },
            { id: 'S8', name: 'Anjali Mehta', rollNo: '03', status: 'Absent', time: '-' },
            { id: 'S9', name: 'Rohan Das', rollNo: '04', status: 'Present', time: '08:47 AM' },
            { id: 'S10', name: 'Kavya Iyer', rollNo: '05', status: 'Present', time: '08:35 AM' },
        ]
    },
    {
        id: '3',
        class: '9-A',
        date: '2026-01-02',
        totalStudents: 32,
        present: 30,
        absent: 1,
        late: 1,
        percentage: 93.8,
        students: [
            { id: 'S11', name: 'Aditya Sharma', rollNo: '01', status: 'Present', time: '08:44 AM' },
            { id: 'S12', name: 'Divya Singh', rollNo: '02', status: 'Present', time: '08:39 AM' },
            { id: 'S13', name: 'Karan Patel', rollNo: '03', status: 'Late', time: '09:15 AM' },
            { id: 'S14', name: 'Meera Reddy', rollNo: '04', status: 'Present', time: '08:41 AM' },
            { id: 'S15', name: 'Sanjay Kumar', rollNo: '05', status: 'Absent', time: '-' },
        ]
    },
    {
        id: '4',
        class: '11-A',
        date: '2026-01-02',
        totalStudents: 30,
        present: 28,
        absent: 2,
        late: 0,
        percentage: 93.3,
        students: [
            { id: 'S16', name: 'Riya Gupta', rollNo: '01', status: 'Present', time: '08:36 AM' },
            { id: 'S17', name: 'Harsh Verma', rollNo: '02', status: 'Absent', time: '-' },
            { id: 'S18', name: 'Pooja Mehta', rollNo: '03', status: 'Present', time: '08:48 AM' },
            { id: 'S19', name: 'Varun Das', rollNo: '04', status: 'Present', time: '08:42 AM' },
            { id: 'S20', name: 'Simran Iyer', rollNo: '05', status: 'Absent', time: '-' },
        ]
    },
    {
        id: '5',
        class: '12-A',
        date: '2026-01-02',
        totalStudents: 28,
        present: 27,
        absent: 1,
        late: 0,
        percentage: 96.4,
        students: [
            { id: 'S21', name: 'Akash Sharma', rollNo: '01', status: 'Present', time: '08:37 AM' },
            { id: 'S22', name: 'Nisha Patel', rollNo: '02', status: 'Present', time: '08:40 AM' },
            { id: 'S23', name: 'Rohit Singh', rollNo: '03', status: 'Present', time: '08:45 AM' },
            { id: 'S24', name: 'Tanvi Reddy', rollNo: '04', status: 'Absent', time: '-' },
            { id: 'S25', name: 'Vishal Kumar', rollNo: '05', status: 'Present', time: '08:38 AM' },
        ]
    },
];

export default function AttendancePage() {
    const [selectedDate, setSelectedDate] = useState('2026-01-02');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClass, setSelectedClass] = useState<string | null>(null);

    const filteredData = dummyAttendanceData.filter(record =>
        record.class.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalStudents = dummyAttendanceData.reduce((sum, record) => sum + record.totalStudents, 0);
    const totalPresent = dummyAttendanceData.reduce((sum, record) => sum + record.present, 0);
    const totalAbsent = dummyAttendanceData.reduce((sum, record) => sum + record.absent, 0);
    const totalLate = dummyAttendanceData.reduce((sum, record) => sum + record.late, 0);
    const overallPercentage = ((totalPresent / totalStudents) * 100).toFixed(1);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Attendance Management</h1>
                    <p className="text-muted-foreground mt-1">Track and manage student attendance records</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => toast.info('Export feature coming soon!')}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
                    >
                        <Download className="w-5 h-5" />
                        Export
                    </button>
                </div>
            </div>

            {/* Date Selector */}
            <div className="bg-card rounded-xl border p-4">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <label className="text-sm font-medium">Select Date:</label>
                    </div>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="flex-1" />
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by class..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-card rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Students</p>
                            <p className="text-2xl font-bold mt-1">{totalStudents}</p>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Present</p>
                            <p className="text-2xl font-bold mt-1 text-green-600">{totalPresent}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Absent</p>
                            <p className="text-2xl font-bold mt-1 text-red-600">{totalAbsent}</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Late</p>
                            <p className="text-2xl font-bold mt-1 text-orange-600">{totalLate}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Attendance %</p>
                            <p className="text-2xl font-bold mt-1 text-blue-600">{overallPercentage}%</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Class-wise Attendance */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Class-wise Attendance</h2>

                <div className="grid grid-cols-1 gap-4">
                    {filteredData.map((record) => (
                        <div key={record.id} className="bg-card rounded-xl border overflow-hidden">
                            {/* Class Header */}
                            <div
                                className="p-4 bg-gradient-to-r from-primary/10 to-blue-500/10 cursor-pointer hover:from-primary/20 hover:to-blue-500/20 transition-colors"
                                onClick={() => setSelectedClass(selectedClass === record.class ? null : record.class)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                            {record.class}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Class {record.class}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {record.totalStudents} students • {new Date(record.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-green-600">{record.present}</p>
                                            <p className="text-xs text-muted-foreground">Present</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-red-600">{record.absent}</p>
                                            <p className="text-xs text-muted-foreground">Absent</p>
                                        </div>
                                        {record.late > 0 && (
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-orange-600">{record.late}</p>
                                                <p className="text-xs text-muted-foreground">Late</p>
                                            </div>
                                        )}
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-blue-600">{record.percentage}%</p>
                                            <p className="text-xs text-muted-foreground">Attendance</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Student List (Expandable) */}
                            {selectedClass === record.class && (
                                <div className="p-4 border-t">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-muted/50">
                                                <tr>
                                                    <th className="text-left px-4 py-3 text-sm font-semibold">Roll No.</th>
                                                    <th className="text-left px-4 py-3 text-sm font-semibold">Student Name</th>
                                                    <th className="text-left px-4 py-3 text-sm font-semibold">Status</th>
                                                    <th className="text-left px-4 py-3 text-sm font-semibold">Time</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {record.students.map((student) => (
                                                    <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                                                        <td className="px-4 py-3 font-mono text-sm font-medium">{student.rollNo}</td>
                                                        <td className="px-4 py-3 font-medium">{student.name}</td>
                                                        <td className="px-4 py-3">
                                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${student.status === 'Present' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                                    student.status === 'Absent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                                        'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                                                }`}>
                                                                {student.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-muted-foreground">{student.time}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {filteredData.length === 0 && (
                <div className="text-center py-12">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
                    <p className="text-muted-foreground">No attendance records found</p>
                </div>
            )}
        </div>
    );
}
