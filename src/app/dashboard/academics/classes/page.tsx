'use client';

import { useState } from 'react';
import { Users, BookOpen, MoreVertical, Plus, X, ClipboardList, School } from 'lucide-react';
import { toast } from 'sonner';

export default function ClassesPage() {
    const [activeTab, setActiveTab] = useState<'classes' | 'sections'>('classes');

    // Classes State
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

    const [showAddClassModal, setShowAddClassModal] = useState(false);
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
        setShowAddClassModal(false);
        setNewClass({ name: '', grade: '', sections: 1, teacher: '' });
        toast.success('Class added successfully!');
    };

    // Sections State
    const [sections, setSections] = useState([
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
    ]);

    const [showAddSectionModal, setShowAddSectionModal] = useState(false);
    const [newSection, setNewSection] = useState({
        name: '',
        class: '',
        teacher: '',
        room: '',
        students: 0
    });

    const handleAddSection = (e: React.FormEvent) => {
        e.preventDefault();
        const sec = {
            id: `SEC0${sections.length + 1}`,
            ...newSection
        };
        setSections([...sections, sec]);
        setShowAddSectionModal(false);
        setNewSection({ name: '', class: '', teacher: '', room: '', students: 0 });
        toast.success('Section added successfully!');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Classes & Sections</h1>
                    <p className="text-muted-foreground mt-1">Manage academic classes, grades and their sections.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => activeTab === 'classes' ? setShowAddClassModal(true) : setShowAddSectionModal(true)}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{activeTab === 'classes' ? 'Add Class' : 'Add Section'}</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
                <button
                    onClick={() => setActiveTab('classes')}
                    className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'classes'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <School className="w-4 h-4" />
                    All Classes
                </button>
                <button
                    onClick={() => setActiveTab('sections')}
                    className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'sections'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <ClipboardList className="w-4 h-4" />
                    Sections
                </button>
            </div>

            {/* Content Active Tab */}
            <div className="bg-card rounded-xl border shadow-sm">
                <div className="overflow-x-auto">
                    {activeTab === 'classes' ? (
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
                    ) : (
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
                    )}
                </div>
            </div>

            {/* Modals */}
            {showAddClassModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold">Add New Class</h2>
                            <button onClick={() => setShowAddClassModal(false)} className="p-2 hover:bg-muted rounded-full">
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
                                <button type="button" onClick={() => setShowAddClassModal(false)} className="px-4 py-2 border rounded-lg hover:bg-muted">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Save Class</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showAddSectionModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold">Add New Section</h2>
                            <button onClick={() => setShowAddSectionModal(false)} className="p-2 hover:bg-muted rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddSection} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Section Name</label>
                                <input
                                    required
                                    type="text"
                                    value={newSection.name}
                                    onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
                                    placeholder="e.g. Section A"
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Associated Class</label>
                                <select
                                    required
                                    value={newSection.class}
                                    onChange={(e) => setNewSection({ ...newSection, class: e.target.value })}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">Select Class</option>
                                    {classes.map(cls => (
                                        <option key={cls.id} value={cls.name}>{cls.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Class Teacher</label>
                                <input
                                    required
                                    type="text"
                                    value={newSection.teacher}
                                    onChange={(e) => setNewSection({ ...newSection, teacher: e.target.value })}
                                    placeholder="Teacher Name"
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Room No.</label>
                                    <input
                                        required
                                        type="text"
                                        value={newSection.room}
                                        onChange={(e) => setNewSection({ ...newSection, room: e.target.value })}
                                        placeholder="e.g. 101"
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Students</label>
                                    <input
                                        required
                                        type="number"
                                        min="0"
                                        value={newSection.students}
                                        onChange={(e) => setNewSection({ ...newSection, students: parseInt(e.target.value) })}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <button type="button" onClick={() => setShowAddSectionModal(false)} className="px-4 py-2 border rounded-lg hover:bg-muted">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Save Section</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
