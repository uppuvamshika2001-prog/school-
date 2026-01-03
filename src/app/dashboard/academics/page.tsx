'use client';

import { BookOpen } from 'lucide-react';

export default function AcademicsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Academics Management</h1>
            <div className="grid gap-6 md:grid-cols-3">
                {['Classes', 'Sections', 'Subjects'].map((item) => (
                    <div key={item} className="p-6 border rounded-xl bg-card hover:shadow-lg transition-all cursor-pointer">
                        <BookOpen className="w-8 h-8 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{item}</h3>
                        <p className="text-muted-foreground text-sm">Manage {item.toLowerCase()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
