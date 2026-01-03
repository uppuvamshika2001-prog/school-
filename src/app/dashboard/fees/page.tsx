'use client';

import {
    IndianRupee,
    TrendingUp,
    TrendingDown,
    CreditCard,
    Users,
    Download,
    Filter,
    MoreVertical,
    CheckCircle2,
    Clock,
    AlertCircle
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function FeeManagementPage() {
    // Mock Data for Admin Dashboard
    const stats = [
        {
            label: 'Total Collection',
            value: 12500000,
            change: '+15%',
            trend: 'up',
            icon: IndianRupee,
            color: 'bg-green-500'
        },
        {
            label: 'Pending Dues',
            value: 450000,
            change: '-8%',
            trend: 'down',
            icon: AlertCircle,
            color: 'bg-red-500'
        },
        {
            label: 'Todays Collection',
            value: 85000,
            change: '+12%',
            trend: 'up',
            icon: TrendingUp,
            color: 'bg-blue-500'
        },
        {
            label: 'scholarships Awarded',
            value: 150000,
            change: '+5%',
            trend: 'up',
            icon: Users,
            color: 'bg-purple-500'
        }
    ];

    const recentTransactions = [
        {
            id: 'TXN-2024-001',
            student: 'Aarav Patel',
            class: '10-A',
            amount: 15000,
            type: 'Tuition Fee',
            status: 'Success',
            date: 'Today, 10:30 AM',
            method: 'UPI'
        },
        {
            id: 'TXN-2024-002',
            student: 'Diya Sharma',
            class: '9-B',
            amount: 12000,
            type: 'Transport Fee',
            status: 'Success',
            date: 'Today, 09:15 AM',
            method: 'Card'
        },
        {
            id: 'TXN-2024-003',
            student: 'Rohan Gupta',
            class: '11-Science',
            amount: 25000,
            type: 'Annual Fee',
            status: 'Pending',
            date: 'Yesterday',
            method: 'Net Banking'
        },
        {
            id: 'TXN-2024-004',
            student: 'Ananya Singh',
            class: '8-C',
            amount: 8500,
            type: 'Exam Fee',
            status: 'Failed',
            date: 'Yesterday',
            method: 'Card'
        },
        {
            id: 'TXN-2024-005',
            student: 'Vihaan Kumar',
            class: '12-Commerce',
            amount: 18000,
            type: 'Tuition Fee',
            status: 'Success',
            date: '2 Jan 2024',
            method: 'Cash'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Fee Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Overview of financial status and fee collections
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>Export Report</span>
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        <span>Collect Fees</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-card p-6 rounded-xl border shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <h3 className="text-2xl font-bold mt-2">{formatCurrency(stat.value)}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-sm">
                            <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                                {stat.change}
                            </span>
                            <span className="text-muted-foreground">from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Transactions */}
            <div className="bg-card rounded-xl border shadow-sm">
                <div className="p-6 border-b flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">Recent Transactions</h2>
                        <p className="text-sm text-muted-foreground">Latest fee collections and payments</p>
                    </div>
                    <button className="p-2 hover:bg-muted rounded-lg">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-4 text-left">Transaction ID</th>
                                <th className="px-6 py-4 text-left">Student</th>
                                <th className="px-6 py-4 text-left">Type</th>
                                <th className="px-6 py-4 text-left">Amount</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {recentTransactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-mono">{txn.id}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium">{txn.student}</p>
                                            <p className="text-xs text-muted-foreground">{txn.class}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{txn.type}</td>
                                    <td className="px-6 py-4 font-medium">{formatCurrency(txn.amount)}</td>
                                    <td className="px-6 py-4">
                                        {txn.status === 'Success' && (
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 w-fit">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Success
                                            </span>
                                        )}
                                        {txn.status === 'Pending' && (
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 w-fit">
                                                <Clock className="w-3.5 h-3.5" /> Pending
                                            </span>
                                        )}
                                        {txn.status === 'Failed' && (
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 w-fit">
                                                <AlertCircle className="w-3.5 h-3.5" /> Failed
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        <div>
                                            <p>{txn.date}</p>
                                            <p className="text-xs">{txn.method}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-muted rounded-lg">
                                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
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
