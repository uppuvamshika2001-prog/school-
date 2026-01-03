'use client';

import { Plus, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TeacherLeavesPage() {
    const leaves = [
        {
            id: 1,
            type: 'Sick Leave',
            from: '2024-12-10',
            to: '2024-12-12',
            days: 3,
            reason: 'Fever and cold',
            status: 'APPROVED',
            appliedOn: '2024-12-08',
        },
        {
            id: 2,
            type: 'Casual Leave',
            from: '2024-11-20',
            to: '2024-11-20',
            days: 1,
            reason: 'Personal work',
            status: 'REJECTED',
            appliedOn: '2024-11-15',
        },
        {
            id: 3,
            type: 'Personal Leave',
            from: '2025-01-05',
            to: '2025-01-07',
            days: 3,
            reason: 'Family function',
            status: 'PENDING',
            appliedOn: '2024-12-28',
        },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Approved
                    </span>
                );
            case 'PENDING':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <Clock className="w-3.5 h-3.5" />
                        Pending
                    </span>
                );
            case 'REJECTED':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        <XCircle className="w-3.5 h-3.5" />
                        Rejected
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">My Leaves</h1>
                    <p className="text-muted-foreground">Track your leave applications and balance</p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                    <Plus className="w-4 h-4" />
                    Apply New Leave
                </button>
            </div>

            {/* Balance Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center">
                    <span className="text-sm text-muted-foreground mb-1">Total Leaves</span>
                    <span className="text-2xl font-bold">12</span>
                    <span className="text-xs text-muted-foreground mt-1">Per Year</span>
                </div>
                <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center">
                    <span className="text-sm text-muted-foreground mb-1">Sick Leaves</span>
                    <span className="text-2xl font-bold">4/7</span>
                    <span className="text-xs text-green-600 font-medium mt-1">3 Remaining</span>
                </div>
                <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center">
                    <span className="text-sm text-muted-foreground mb-1">Casual Leaves</span>
                    <span className="text-2xl font-bold">2/5</span>
                    <span className="text-xs text-green-600 font-medium mt-1">3 Remaining</span>
                </div>
                <div className="bg-card p-4 rounded-xl border shadow-sm flex flex-col items-center text-center">
                    <span className="text-sm text-muted-foreground mb-1">Pending Requests</span>
                    <span className="text-2xl font-bold text-yellow-600">1</span>
                    <span className="text-xs text-muted-foreground mt-1">Awaiting Approval</span>
                </div>
            </div>

            {/* History List */}
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                    <h3 className="font-semibold">Leave History</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-4 text-left">Applied On</th>
                                <th className="px-6 py-4 text-left">Type</th>
                                <th className="px-6 py-4 text-left">Duration</th>
                                <th className="px-6 py-4 text-left">Reason</th>
                                <th className="px-6 py-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {leaves.map((leave) => (
                                <tr key={leave.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 text-muted-foreground">{leave.appliedOn}</td>
                                    <td className="px-6 py-4 font-medium">{leave.type}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{leave.from} - {leave.to}</span>
                                            <span className="text-xs text-muted-foreground">{leave.days} Days</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate" title={leave.reason}>
                                        {leave.reason}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(leave.status)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
