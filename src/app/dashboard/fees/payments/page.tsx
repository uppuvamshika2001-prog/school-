'use client';

import { CheckCircle2, Clock, XCircle, Search, Filter, Download, MoreVertical, IndianRupee } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function FeePaymentsPage() {
    const payments = [
        { id: 'RCP-2024-001', student: 'Aarav Patel', class: '10-A', type: 'Tuition Fee (Jan)', amount: 5500, date: '2024-01-02', mode: 'Online', status: 'Success' },
        { id: 'RCP-2024-002', student: 'Diya Sharma', class: '9-B', type: 'Tuition Fee (Jan)', amount: 5500, date: '2024-01-02', mode: 'Cash', status: 'Success' },
        { id: 'RCP-2024-003', student: 'Vihaan Kumar', class: '12-A', type: 'Science Lab Fee', amount: 12000, date: '2024-01-01', mode: 'Online', status: 'Pending' },
        { id: 'RCP-2024-004', student: 'Ananya Singh', class: '8-C', type: 'Transport Fee (Q4)', amount: 4500, date: '2023-12-31', mode: 'Cheque', status: 'Success' },
        { id: 'RCP-2024-005', student: 'Rohan Gupta', class: '11-B', type: 'Tuition Fee (Jan)', amount: 6500, date: '2023-12-30', mode: 'Online', status: 'Failed' },
        { id: 'RCP-2024-006', student: 'Myra Reddy', class: '5-A', type: 'Annual Fee', amount: 25000, date: '2023-12-28', mode: 'Bank Transfer', status: 'Success' },
        { id: 'RCP-2024-007', student: 'Arjun Nair', class: '7-B', type: 'Tuition Fee (Jan)', amount: 4500, date: '2023-12-28', mode: 'Online', status: 'Success' },
        { id: 'RCP-2024-008', student: 'Ishaan Verma', class: '10-C', type: 'Library Fine', amount: 150, date: '2023-12-27', mode: 'Cash', status: 'Success' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Success': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Fee Payments</h1>
                    <p className="text-muted-foreground mt-1">Track and manage student fee transactions.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        <span>Collect Fee</span>
                    </button>
                </div>
            </div>

            <div className="bg-card rounded-xl border shadow-sm">
                <div className="p-4 border-b flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by student, ID..."
                            className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <button className="p-2 border rounded-lg hover:bg-muted">
                        <Filter className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-4 text-left">Receipt ID</th>
                                <th className="px-6 py-4 text-left">Student Info</th>
                                <th className="px-6 py-4 text-left">Fee Type</th>
                                <th className="px-6 py-4 text-left">Amount</th>
                                <th className="px-6 py-4 text-left">Mode</th>
                                <th className="px-6 py-4 text-left">Date</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs">{payment.id}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium">{payment.student}</p>
                                            <p className="text-xs text-muted-foreground">{payment.class}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{payment.type}</td>
                                    <td className="px-6 py-4 font-medium">{formatCurrency(payment.amount)}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{payment.mode}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{formatDate(payment.date)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                                            {payment.status === 'Success' && <CheckCircle2 className="w-3 h-3" />}
                                            {payment.status === 'Pending' && <Clock className="w-3 h-3" />}
                                            {payment.status === 'Failed' && <XCircle className="w-3 h-3" />}
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
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
