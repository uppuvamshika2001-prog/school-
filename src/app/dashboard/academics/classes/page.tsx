'use client';

import { useState } from 'react';
import { Users, BookOpen, MoreVertical, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

export default function ClassesPage() {
    const [classes, setClasses] = useState([
        { id: 'CLS001', name: 'Class 1', grade: 'Grade 1', sections: 3, students: 85, teacher: 'Sarah Wilson' },
        { id: 'CLS002', name: 'Class 2', grade: 'Grade 2', sections: 3, students: 82, teacher: 'Michael Brown' },
        { id: 'CLS003', name: 'Class 3', grade: 'Grade 3', sections: 3, students: 90, teacher: 'Emily Davis' },
        { id: 'CLS004', name: 'Class 4', grade: 'Grade 4', sections: 2, students: 60, teacher: 'James Wilson' },
        { id: 'CLS005', name: 'Class 5', grade: 'Grade 5', sections: 2, students: 62, teacher: 'Jessica Taylor' },
        { id: 'CLS006', name: 'Class 6', grade: 'Grade 6', sections: 2, students: 58, teacher: 'David Anderson' },
        { id: 'CLS007', name: 'Class 7', grade: 'Grade 7', sections: 2, students: 55, teacher: 'Jennifer Thomas' },
        { id: 'CLS008', name: 'Class 8', grade: 'Grade 8', sections: 2, students: 52, teacher: 'Robert Martinez' },
        { id: 'CLS009', name: 'Class 9', grade: 'Grade 9', sections: 3, students: 88, teacher: 'Lisa Robinson' },
        { id: 'CLS010', name: 'Class 10', grade: 'Grade 10', sections: 3, students: 95, teacher: 'William Clark' },
        { id: 'CLS011', name: 'Class 11 Science', grade: 'Grade 11', sections: 2, students: 45, teacher: 'Richard Rodriguez' },
        { id: 'CLS012', name: 'Class 11 Commerce', grade: 'Grade 11', sections: 2, students: 48, teacher: 'Joseph Lewis' },
        { id: 'CLS013', name: 'Class 12 Science', grade: 'Grade 12', sections: 2, students: 42, teacher: 'Thomas Lee' },
        { id: 'CLS014', name: 'Class 12 Commerce', grade: 'Grade 12', sections: 2, students: 46, teacher: 'Charles Walker' },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newClass, setNewClass] = useState({
        name: '',
        grade: '',
        sections: 1,
        teacher: ''
    });

    const handleAddClass = (e: React.FormEvent) => {
        e.preventDefault();
        const cls = {
            id: `CLS0${classes.length + 1}`,
            ...newClass,
            students: 0 // Default 0 students for new class
        };
        setClasses([...classes, cls]);
        setShowAddModal(false);
        setNewClass({ name: '', grade: '', sections: 1, teacher: '' });
        toast.success('Class added successfully!');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
                    <p className="text-muted-foreground mt-1">Manage standard classes and grades.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Class</span>
                </button>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold">Add New Class</h2>
                            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-muted rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddClass} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Class Name</label>
                                <input
                                    required
                                    type="text"
                                    value={newClass.name}
                                    onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                                    placeholder="e.g. Class 12 Science"
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Grade Level</label>
                                <input
                                    required
                                    type="text"
                                    value={newClass.grade}
                                    onChange={(e) => setNewClass({ ...newClass, grade: e.target.value })}
                                    placeholder="e.g. Grade 12"
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Number of Sections</label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    value={newClass.sections}
                                    onChange={(e) => setNewClass({ ...newClass, sections: parseInt(e.target.value) })}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Class Coordinator</label>
                                <input
                                    required
                                    type="text"
                                    value={newClass.teacher}
                                    onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
                                    placeholder="Teacher Name"
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded-lg hover:bg-muted">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Save Class</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-card rounded-xl border shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-4 text-left">Class Name</th>
                                <th className="px-6 py-4 text-left">Grade Level</th>
                                <th className="px-6 py-4 text-left">Sections</th>
                                <th className="px-6 py-4 text-left">Students</th>
                                <th className="px-6 py-4 text-left">Class Coordinator</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {classes.map((cls) => (
                                <tr key={cls.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{cls.name}</td>
                                    <td className="px-6 py-4">{cls.grade}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                            <BookOpen className="w-3 h-3" />
                                            {cls.sections} Sections
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            <Users className="w-3 h-3" />
                                            {cls.students}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{cls.teacher}</td>
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
