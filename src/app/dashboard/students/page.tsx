'use client';

import { useState } from 'react';
import { Search, User, Phone, Mail, Calendar, MapPin, Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Dummy student data
const initialStudents = [
  { id: '1', admissionNo: 'STU2024001', name: 'Arjun Sharma', class: '10-A', gender: 'Male', phone: '+91 98765 43210', email: 'arjun.sharma@school.edu', dob: '2008-05-15', bloodGroup: 'O+', address: 'Green Park, New Delhi', status: 'Active' },
  { id: '2', admissionNo: 'STU2024002', name: 'Priya Patel', class: '10-A', gender: 'Female', phone: '+91 98765 43211', email: 'priya.patel@school.edu', dob: '2008-07-22', bloodGroup: 'A+', address: 'Connaught Place, Delhi', status: 'Active' },
  { id: '3', admissionNo: 'STU2024003', name: 'Rahul Kumar', class: '9-B', gender: 'Male', phone: '+91 98765 43212', email: 'rahul.kumar@school.edu', dob: '2009-03-10', bloodGroup: 'B+', address: 'Karol Bagh, Delhi', status: 'Active' },
  { id: '4', admissionNo: 'STU2024004', name: 'Sneha Singh', class: '10-B', gender: 'Female', phone: '+91 98765 43213', email: 'sneha.singh@school.edu', dob: '2008-11-05', bloodGroup: 'AB+', address: 'Rohini, Delhi', status: 'Active' },
  { id: '5', admissionNo: 'STU2024005', name: 'Amit Verma', class: '9-A', gender: 'Male', phone: '+91 98765 43214', email: 'amit.verma@school.edu', dob: '2009-01-18', bloodGroup: 'O-', address: 'Dwarka, Delhi', status: 'Active' },
  { id: '6', admissionNo: 'STU2024006', name: 'Neha Gupta', class: '10-A', gender: 'Female', phone: '+91 98765 43215', email: 'neha.gupta@school.edu', dob: '2008-09-30', bloodGroup: 'A-', address: 'Pitampura, Delhi', status: 'Active' },
  { id: '7', admissionNo: 'STU2024007', name: 'Vikram Reddy', class: '11-A', gender: 'Male', phone: '+91 98765 43216', email: 'vikram.reddy@school.edu', dob: '2007-06-12', bloodGroup: 'B-', address: 'Janakpuri, Delhi', status: 'Active' },
  { id: '8', admissionNo: 'STU2024008', name: 'Anjali Mehta', class: '11-B', gender: 'Female', phone: '+91 98765 43217', email: 'anjali.mehta@school.edu', dob: '2007-12-25', bloodGroup: 'AB-', address: 'Lajpat Nagar, Delhi', status: 'Active' },
  { id: '9', admissionNo: 'STU2024009', name: 'Rohan Das', class: '12-A', gender: 'Male', phone: '+91 98765 43218', email: 'rohan.das@school.edu', dob: '2006-04-08', bloodGroup: 'O+', address: 'Saket, Delhi', status: 'Active' },
  { id: '10', admissionNo: 'STU2024010', name: 'Kavya Iyer', class: '12-B', gender: 'Female', phone: '+91 98765 43219', email: 'kavya.iyer@school.edu', dob: '2006-08-14', bloodGroup: 'A+', address: 'Vasant Kunj, Delhi', status: 'Active' },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    admissionNo: '',
    class: '',
    gender: 'Male',
    phone: '',
    email: '',
    status: 'Active'
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent = {
      id: (students.length + 1).toString(),
      ...formData,
      dob: '2010-01-01', // Default dummy
      bloodGroup: 'O+', // Default dummy
      address: 'New Entry, School Record' // Default dummy
    };
    setStudents([...students, newStudent]);
    setShowAddForm(false);
    setFormData({ name: '', admissionNo: '', class: '', gender: 'Male', phone: '', email: '', status: 'Active' });
    toast.success('Student added successfully!');
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
    toast.success('Student deleted successfully');
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === 'ALL') return true;
    if (filter === 'ACTIVE') return student.status === 'Active';
    if (filter === 'MALE') return student.gender === 'Male';
    if (filter === 'FEMALE') return student.gender === 'Female';

    return true;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground mt-1">Manage student records and information</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      {/* Add Student Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Add New Student</h2>
              <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-muted rounded-full">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Admission No</label>
                  <input
                    required
                    type="text"
                    value={formData.admissionNo}
                    onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="STU2024..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Class</label>
                  <input
                    required
                    type="text"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="10-A"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="+91..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="john@school.edu"
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 border rounded-lg hover:bg-muted">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Save Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          onClick={() => setFilter('ALL')}
          className={`bg-card rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${filter === 'ALL' ? 'ring-2 ring-primary border-primary' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-2xl font-bold mt-1">{students.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div
          onClick={() => setFilter('ACTIVE')}
          className={`bg-card rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${filter === 'ACTIVE' ? 'ring-2 ring-green-600 border-green-600' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold mt-1 text-green-600">
                {students.filter(s => s.status === 'Active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div
          onClick={() => setFilter('MALE')}
          className={`bg-card rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${filter === 'MALE' ? 'ring-2 ring-blue-600 border-blue-600' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Male</p>
              <p className="text-2xl font-bold mt-1">
                {students.filter(s => s.gender === 'Male').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div
          onClick={() => setFilter('FEMALE')}
          className={`bg-card rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${filter === 'FEMALE' ? 'ring-2 ring-pink-600 border-pink-600' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Female</p>
              <p className="text-2xl font-bold mt-1">
                {students.filter(s => s.gender === 'Female').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-pink-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-card rounded-xl border p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, admission number, or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        {searchQuery && (
          <div className="mt-3 text-sm text-muted-foreground">
            Found {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Students Table */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-medium">
              <tr>
                <th className="px-6 py-4 text-left">Student Name</th>
                <th className="px-6 py-4 text-left">Admission No</th>
                <th className="px-6 py-4 text-left">Class</th>
                <th className="px-6 py-4 text-left">Contact Info</th>
                <th className="px-6 py-4 text-left">Gender</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{student.admissionNo}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-xs font-medium">
                      {student.class}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Phone className="w-3 h-3" /> {student.phone}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Mail className="w-3 h-3" /> {student.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{student.gender}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toast.success(`Viewing details for ${student.name}`)}
                        className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toast.info(`Editing ${student.name}`)}
                        className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-blue-600 transition-colors"
                        title="Edit Student"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-red-600 transition-colors"
                        title="Delete Student"
                      >
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

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
          <p className="text-muted-foreground">No students found</p>
        </div>
      )}
    </div>
  );
}
