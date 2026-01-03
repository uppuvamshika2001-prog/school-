'use client';

import { useState } from 'react';
import { BookOpen, MoreVertical, Plus, Beaker, Calculator, Languages, Globe, X } from 'lucide-react';
import { toast } from 'sonner';

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState([
        { id: 'SUB001', name: 'Mathematics', code: 'MATH-001', department: 'Mathematics', type: 'Theory', credits: 4, icon: Calculator },
        { id: 'SUB002', name: 'Science', code: 'SCI-001', department: 'Science', type: 'Theory + Practical', credits: 4, icon: Beaker },
        { id: 'SUB003', name: 'English', code: 'ENG-001', department: 'Languages', type: 'Theory', credits: 3, icon: Languages },
        { id: 'SUB004', name: 'Social Studies', code: 'SST-001', department: 'Social Sciences', type: 'Theory', credits: 3, icon: Globe },
        { id: 'SUB005', name: 'Physics', code: 'PHY-011', department: 'Science', type: 'Theory + Practical', credits: 4, icon: Beaker },
        { id: 'SUB006', name: 'Chemistry', code: 'CHEM-011', department: 'Science', type: 'Theory + Practical', credits: 4, icon: Beaker },
        { id: 'SUB007', name: 'Biology', code: 'BIO-011', department: 'Science', type: 'Theory + Practical', credits: 4, icon: Beaker },
        { id: 'SUB008', name: 'Computer Science', code: 'CS-011', department: 'Computer Science', type: 'Practical', credits: 2, icon: BookOpen },
        { id: 'SUB009', name: 'Economics', code: 'ECO-011', department: 'Commerce', type: 'Theory', credits: 4, icon: Calculator },
        { id: 'SUB010', name: 'Accountancy', code: 'ACC-011', department: 'Commerce', type: 'Theory', credits: 4, icon: Calculator },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newSubject, setNewSubject] = useState({
        name: '',
        code: '',
        department: '',
        type: 'Theory',
        credits: 3
    });

    const handleAddSubject = (e: React.FormEvent) => {
        e.preventDefault();
        const sub = {
            id: `SUB0${subjects.length + 1}`,
            ...newSubject,
            icon: BookOpen // Default icon
        };
        setSubjects([...subjects, sub]);
        setShowAddModal(false);
        setNewSubject({ name: '', code: '', department: '', type: 'Theory', credits: 3 });
        toast.success('Subject added successfully!');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
                    <p className="text-muted-foreground mt-1">Configure curriculum and subjects.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Subject</span>
                </button>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold">Add New Subject</h2>
                            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-muted rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddSubject} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Subject Name</label>
                                <input
                                    required
                                    type="text"
                                    value={newSubject.name}
                                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                                    placeholder="e.g. History"
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Subject Code</label>
                                <input
                                    required
                                    type="text"
                                    value={newSubject.code}
                                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                                    placeholder="e.g. HIS-001"
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Department</label>
                                <input
                                    required
                                    type="text"
                                    value={newSubject.department}
                                    onChange={(e) => setNewSubject({ ...newSubject, department: e.target.value })}
                                    placeholder="e.g. Humanities"
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Type</label>
                                    <select
                                        value={newSubject.type}
                                        onChange={(e) => setNewSubject({ ...newSubject, type: e.target.value })}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="Theory">Theory</option>
                                        <option value="Practical">Practical</option>
                                        <option value="Theory + Practical">Theory + Practical</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Credits</label>
                                    <input
                                        required
                                        type="number"
                                        min="1"
                                        value={newSubject.credits}
                                        onChange={(e) => setNewSubject({ ...newSubject, credits: parseInt(e.target.value) })}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded-lg hover:bg-muted">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Save Subject</button>
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
                                <th className="px-6 py-4 text-left">Subject Name</th>
                                <th className="px-6 py-4 text-left">Code</th>
                                <th className="px-6 py-4 text-left">Department</th>
                                <th className="px-6 py-4 text-left">Type</th>
                                <th className="px-6 py-4 text-left">Credits</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-sm">
                            {subjects.map((sub) => (
                                <tr key={sub.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-primary/10 rounded text-primary">
                                                <sub.icon className="w-4 h-4" />
                                            </div>
                                            {sub.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs">{sub.code}</td>
                                    <td className="px-6 py-4">{sub.department}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${sub.type.includes('Practical')
                                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                            }`}>
                                            {sub.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{sub.credits}</td>
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
