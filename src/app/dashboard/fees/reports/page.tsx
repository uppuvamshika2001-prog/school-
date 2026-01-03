'use client';

import { BarChart3, TrendingUp, TrendingDown, AlertCircle, Download, Calendar, Filter, IndianRupee } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function FeeReportsPage() {
    const stats = [
        { label: 'Total Expected', value: 25000000, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        { label: 'Total Collected', value: 18500000, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
        { label: 'Pending Dues', value: 6500000, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' },
        { label: 'Scholarships', value: 500000, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    ];

    const defaulters = [
        { id: 'STU005', name: 'Rohan Gupta', class: '11-B', amount: 35000, months: 3, lastPayment: '2023-09-15', parent: 'Sanjay Gupta', phone: '+91 98765 43210' },
        { id: 'STU012', name: 'Kavya Singh', class: '8-A', amount: 12500, months: 2, lastPayment: '2023-10-10', parent: 'Vikram Singh', phone: '+91 98765 43211' },
        { id: 'STU023', name: 'Kabir Das', class: '10-C', amount: 8500, months: 1, lastPayment: '2023-11-05', parent: 'Amit Das', phone: '+91 98765 43212' },
        { id: 'STU045', name: 'Meera Iyer', class: '5-B', amount: 4500, months: 1, lastPayment: '2023-11-15', parent: 'Rahul Iyer', phone: '+91 98765 43213' },
        { id: 'STU056', name: 'Aryan Khan', class: '9-A', amount: 15500, months: 2, lastPayment: '2023-10-20', parent: 'Sameer Khan', phone: '+91 98765 43214' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
                    <p className="text-muted-foreground mt-1">Analyze fee collection and outstanding dues.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-2 border rounded-lg hover:bg-muted text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>This Academic Year</span>
                    </button>
                    <button className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>Download Report</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-card p-6 rounded-xl border shadow-sm">
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <div className="flex items-center gap-3 mt-2">
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <IndianRupee className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold">{formatCurrency(stat.value)}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card rounded-xl border shadow-sm">
                    <div className="p-6 border-b flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-lg">Fee Collection Trend</h3>
                            <p className="text-sm text-muted-foreground">Monthly collection overview</p>
                        </div>
                        <select className="text-sm border rounded-md p-1 bg-background">
                            <option>Last 6 Months</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div className="p-6 flex items-center justify-center h-[300px] text-muted-foreground bg-muted/20">
                        <BarChart3 className="w-12 h-12 mb-2 text-muted-foreground/50" />
                        <p>Chart visualization placeholder</p>
                    </div>
                </div>

                <div className="bg-card rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                        <h3 className="font-semibold text-lg">Collection by Mode</h3>
                        <p className="text-sm text-muted-foreground">Payment method distribution</p>
                    </div>
                    <div className="p-6 space-y-4">
                        {[
                            { mode: 'Online Transfer', percentage: 45, color: 'bg-blue-500' },
                            { mode: 'Cheque', percentage: 25, color: 'bg-purple-500' },
                            { mode: 'Cash', percentage: 20, color: 'bg-green-500' },
                            { mode: 'UPI', percentage: 10, color: 'bg-orange-500' },
                        ].map((item) => (
                            <div key={item.mode}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{item.mode}</span>
                                    <span className="font-medium">{item.percentage}%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-xl border shadow-sm">
                <div className="p-6 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <h3 className="font-semibold text-lg text-red-600">Top Defaulters</h3>
                    </div>
                    <button className="text-sm text-primary hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-4 text-left">Student Info</th>
                                <th className="px-6 py-4 text-left">Parent Details</th>
                                <th className="px-6 py-4 text-left">Pending Amount</th>
                                <th className="px-6 py-4 text-left">Due Since</th>
                                <th className="px-6 py-4 text-left">Last Payment</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {defaulters.map((stu) => (
                                <tr key={stu.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium">{stu.name}</p>
                                            <p className="text-xs text-muted-foreground">{stu.class} • {stu.id}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium">{stu.parent}</p>
                                            <p className="text-xs text-muted-foreground">{stu.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-red-600">{formatCurrency(stu.amount)}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                            {stu.months} Months
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{stu.lastPayment}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90">
                                            Send Reminder
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
