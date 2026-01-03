'use client';

import { Users, MoreVertical, Plus, ClipboardList } from 'lucide-react';

export default function SectionsPage() {
    const sections = [
        { id: 'SEC001', name: 'Section A', class: 'Class 1', teacher: 'Sarah Wilson', room: '101', students: 28 },
        { id: 'SEC002', name: 'Section B', class: 'Class 1', teacher: 'John Doe', room: '102', students: 29 },
        { id: 'SEC003', name: 'Section C', class: 'Class 1', teacher: 'Jane Smith', room: '103', students: 28 },
        { id: 'SEC004', name: 'Section A', class: 'Class 10', teacher: 'William Clark', room: '301', students: 32 },
        { id: 'SEC005', name: 'Section B', class: 'Class 10', teacher: 'Robert Brown', room: '302', students: 31 },
        { id: 'SEC006', name: 'Section C', class: 'Class 10', teacher: 'Patricia Miller', room: '303', students: 32 },
        { id: 'SEC007', name: 'Science A', class: 'Class 11 Science', teacher: 'Richard Rodriguez', room: 'LAB-1', students: 22 },
        { id: 'SEC008', name: 'Science B', class: 'Class 11 Science', teacher: 'David Wilson', room: 'LAB-2', students: 23 },
        { id: 'SEC009', name: 'Commerce A', class: 'Class 12 Commerce', teacher: 'Charles Walker', room: '401', students: 23 },
        { id: 'SEC010', name: 'Commerce B', class: 'Class 12 Commerce', teacher: 'Susan Hall', room: '402', students: 23 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sections</h1>
                    <p className="text-muted-foreground mt-1">Manage class sections and divisions.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Section</span>
                </button>
            </div>

            <div className="bg-card rounded-xl border shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-4 text-left">Section Name</th>
                                <th className="px-6 py-4 text-left">Class</th>
                                <th className="px-6 py-4 text-left">Class Teacher</th>
                                <th className="px-6 py-4 text-left">Room No.</th>
                                <th className="px-6 py-4 text-left">Strength</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {sections.map((sec) => (
                                <tr key={sec.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-primary/10 rounded text-primary">
                                                <ClipboardList className="w-4 h-4" />
                                            </div>
                                            {sec.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{sec.class}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{sec.teacher}</td>
                                    <td className="px-6 py-4 font-mono text-xs">{sec.room}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            <Users className="w-3 h-3" />
                                            {sec.students}
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
