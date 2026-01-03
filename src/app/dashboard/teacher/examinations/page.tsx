'use client';

import { useState } from 'react';
import { Search, Calendar, FileText, Award, Clock, Edit } from 'lucide-react';
import { toast } from 'sonner';

// Dummy exam data for teacher
const teacherExams = [
    {
        id: '1',
        name: 'First Term Examination 2025-26',
        classes: ['10-A', '10-B'],
        subject: 'Mathematics',
        startDate: '2025-12-15',
        status: 'Completed',
        monitoringStatus: 'Marks Submitted',
    },
    {
        id: '2',
        name: 'Second Term Examination 2025-26',
        classes: ['10-A', '10-B'],
        subject: 'Mathematics',
        startDate: '2026-03-15',
        status: 'Upcoming',
        monitoringStatus: 'Pending',
    },
    {
        id: '3',
        name: 'Unit Test 1 - January 2026',
        classes: ['9-A', '9-B'],
        subject: 'Mathematics',
        startDate: '2026-01-20',
        status: 'Scheduled',
        monitoringStatus: 'Pending',
    },
];

export default function TeacherExaminationsPage() {
    const handleEnterMarks = (examName: string) => {
        toast.info(`Marks entry for ${examName} coming soon!`);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Examinations Management</h1>
                <p className="text-muted-foreground mt-1">Manage exams and enter marks for your classes</p>
            </div>

            <div className="grid gap-4">
                {teacherExams.map((exam) => (
                    <div key={exam.id} className="bg-card rounded-xl border p-6 hover:shadow-md transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-bold">{exam.name}</h3>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${exam.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            exam.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                                                'bg-orange-100 text-orange-700'
                                        }`}>
                                        {exam.status}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <FileText className="w-4 h-4" />
                                        Subject: <span className="font-semibold text-foreground">{exam.subject}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        Start Date: {new Date(exam.startDate).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {exam.classes.map(cls => (
                                        <span key={cls} className="px-2 py-1 bg-secondary rounded text-xs font-medium">Class {cls}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="text-right mr-4">
                                    <p className="text-xs text-muted-foreground">Status</p>
                                    <p className="text-sm font-medium">{exam.monitoringStatus}</p>
                                </div>
                                <button
                                    onClick={() => handleEnterMarks(exam.name)}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                                >
                                    <Edit className="w-4 h-4" />
                                    Enter Marks
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
