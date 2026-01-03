'use client';

import { FileText, Plus, MoreVertical, IndianRupee, Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function FeeStructurePage() {
    const feeStructures = [
        { id: 'FEE001', name: 'Annual Admission Fee', classRange: 'All Classes', frequency: 'One Time', amount: 25000, type: 'Admission' },
        { id: 'FEE002', name: 'Monthly Tuition Fee (Primary)', classRange: 'Class 1 - 5', frequency: 'Monthly', amount: 3500, type: 'Tuition' },
        { id: 'FEE003', name: 'Monthly Tuition Fee (Middle)', classRange: 'Class 6 - 8', frequency: 'Monthly', amount: 4500, type: 'Tuition' },
        { id: 'FEE004', name: 'Monthly Tuition Fee (Secondary)', classRange: 'Class 9 - 10', frequency: 'Monthly', amount: 5500, type: 'Tuition' },
        { id: 'FEE005', name: 'Monthly Tuition Fee (Senior)', classRange: 'Class 11 - 12', frequency: 'Monthly', amount: 6500, type: 'Tuition' },
        { id: 'FEE006', name: 'Science Lab Charges', classRange: 'Class 11 - 12 (Science)', frequency: 'Yearly', amount: 12000, type: 'Laboratory' },
        { id: 'FEE007', name: 'Computer Lab Charges', classRange: 'Class 1 - 10', frequency: 'Yearly', amount: 5000, type: 'Laboratory' },
        { id: 'FEE008', name: 'Library Fee', classRange: 'All Classes', frequency: 'Yearly', amount: 2000, type: 'Miscellaneous' },
        { id: 'FEE009', name: 'Sports Fee', classRange: 'All Classes', frequency: 'Yearly', amount: 3000, type: 'Miscellaneous' },
        { id: 'FEE010', name: 'Transport Fee (Zone A)', classRange: 'All Classes', frequency: 'Quarterly', amount: 4500, type: 'Transport' },
        { id: 'FEE011', name: 'Transport Fee (Zone B)', classRange: 'All Classes', frequency: 'Quarterly', amount: 5500, type: 'Transport' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Fee Structure</h1>
                    <p className="text-muted-foreground mt-1">Define and manage fee categories.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Fee Category</span>
                </button>
            </div>

            <div className="bg-card rounded-xl border shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-4 text-left">Fee Name</th>
                                <th className="px-6 py-4 text-left">Class Range</th>
                                <th className="px-6 py-4 text-left">Type</th>
                                <th className="px-6 py-4 text-left">Frequency</th>
                                <th className="px-6 py-4 text-left">Amount</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {feeStructures.map((fee) => (
                                <tr key={fee.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-primary/10 rounded text-primary">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            {fee.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{fee.classRange}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                            {fee.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{fee.frequency}</td>
                                    <td className="px-6 py-4 font-semibold font-mono">
                                        {formatCurrency(fee.amount)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-destructive">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
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
