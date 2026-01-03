'use client';

import { useState } from 'react';
import { Search, User, Phone, Mail, BookOpen, Award, Calendar, Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Dummy teacher data
const initialTeachers = [
  { id: '1', employeeId: 'TCH001', name: 'Sarah Wilson', gender: 'Female', subject: 'Maths', qualification: 'M.Sc Mathematics', experience: '8 years', phone: '+91 98765 00000', email: 'sarah.wilson@school.edu', joiningDate: '2016-07-01', status: 'Active', classes: '10-A, 10-B, 11-A' },
  { id: '2', employeeId: 'TCH002', name: 'Rajesh Kumar', gender: 'Male', subject: 'Science', qualification: 'M.Sc Physics', experience: '12 years', phone: '+91 98765 00001', email: 'rajesh.kumar@school.edu', joiningDate: '2012-08-15', status: 'Active', classes: '11-A, 11-B, 12-A' },
  { id: '3', employeeId: 'TCH003', name: 'Priya Sharma', gender: 'Female', subject: 'English', qualification: 'M.A English', experience: '6 years', phone: '+91 98765 00002', email: 'priya.sharma@school.edu', joiningDate: '2018-06-10', status: 'Active', classes: '9-A, 9-B, 10-A' },
  { id: '4', employeeId: 'TCH004', name: 'Amit Patel', gender: 'Male', subject: 'Telugu', qualification: 'M.A Telugu', experience: '10 years', phone: '+91 98765 00003', email: 'amit.patel@school.edu', joiningDate: '2014-07-20', status: 'Active', classes: '11-A, 12-A, 12-B' },
  { id: '5', employeeId: 'TCH005', name: 'Neha Singh', gender: 'Female', subject: 'Hindi', qualification: 'M.A Hindi', experience: '7 years', phone: '+91 98765 00004', email: 'neha.singh@school.edu', joiningDate: '2017-08-01', status: 'Active', classes: '10-A, 11-B, 12-A' },
  { id: '6', employeeId: 'TCH006', name: 'Vikram Reddy', gender: 'Male', subject: 'Social', qualification: 'M.A History', experience: '9 years', phone: '+91 98765 00005', email: 'vikram.reddy@school.edu', joiningDate: '2015-07-15', status: 'Active', classes: '9-A, 10-A, 11-A, 12-A' },
  { id: '7', employeeId: 'TCH007', name: 'Anjali Mehta', gender: 'Female', subject: 'Social', qualification: 'M.A History', experience: '11 years', phone: '+91 98765 00006', email: 'anjali.mehta@school.edu', joiningDate: '2013-06-05', status: 'Active', classes: '9-A, 10-B, 11-A' },
  { id: '8', employeeId: 'TCH008', name: 'Rohan Das', gender: 'Male', subject: 'Science', qualification: 'M.A Geography', experience: '5 years', phone: '+91 98765 00007', email: 'rohan.das@school.edu', joiningDate: '2019-07-10', status: 'Active', classes: '9-B, 10-A, 11-B' },
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    gender: 'Male',
    subject: '',
    qualification: '',
    experience: '',
    phone: '',
    email: '',
    status: 'Active'
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeacher = {
      id: (teachers.length + 1).toString(),
      ...formData,
      joiningDate: '2024-01-01', // Default
      classes: 'Not Assigned' // Default
    };
    setTeachers([...teachers, newTeacher]);
    setShowAddForm(false);
    setFormData({ name: '', employeeId: '', gender: 'Male', subject: '', qualification: '', experience: '', phone: '', email: '', status: 'Active' });
    toast.success('Teacher added successfully!');
  };

  const handleDelete = (id: string) => {
    setTeachers(teachers.filter(t => t.id !== id));
    toast.success('Teacher deleted successfully');
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === 'ALL') return true;
    if (filter === 'ACTIVE') return teacher.status === 'Active';
    if (filter === 'MALE') return teacher.gender === 'Male';
    if (filter === 'FEMALE') return teacher.gender === 'Female';

    return true;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teachers</h1>
          <p className="text-muted-foreground mt-1">Manage teaching staff and their information</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Teacher
        </button>
      </div>

      {/* Add Teacher Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Add New Teacher</h2>
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
                    placeholder="Jane Smith"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Employee ID</label>
                  <input
                    required
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="TCH..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <input
                    required
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="Mathematics"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Qualification</label>
                  <input
                    required
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="M.Sc, B.Ed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience</label>
                  <input
                    required
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="5 years"
                  />
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
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    placeholder="jane.smith@school.edu"
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 border rounded-lg hover:bg-muted">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Save Teacher</button>
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
              <p className="text-sm text-muted-foreground">Total Teachers</p>
              <p className="text-2xl font-bold mt-1">{teachers.length}</p>
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
                {teachers.filter(t => t.status === 'Active').length}
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
                {teachers.filter(t => t.gender === 'Male').length}
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
                {teachers.filter(t => t.gender === 'Female').length}
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
            placeholder="Search by name, employee ID, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        {searchQuery && (
          <div className="mt-3 text-sm text-muted-foreground">
            Found {filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Teachers Table */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground font-medium">
              <tr>
                <th className="px-6 py-4 text-left">Teacher Name</th>
                <th className="px-6 py-4 text-left">Emp ID</th>
                <th className="px-6 py-4 text-left">Subject & Qual.</th>
                <th className="px-6 py-4 text-left">Experience</th>
                <th className="px-6 py-4 text-left">Contact Info</th>
                <th className="px-6 py-4 text-left">Classes</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium">{teacher.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{teacher.employeeId}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-sm">{teacher.subject}</span>
                      <span className="text-xs text-muted-foreground">{teacher.qualification}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{teacher.experience}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Phone className="w-3 h-3" /> {teacher.phone}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Mail className="w-3 h-3" /> {teacher.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <span className="text-xs">{teacher.classes}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toast.success(`Viewing details for ${teacher.name}`)}
                        className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toast.info(`Editing ${teacher.name}`)}
                        className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-blue-600 transition-colors"
                        title="Edit Teacher"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.id)}
                        className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-red-600 transition-colors"
                        title="Delete Teacher"
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

      {filteredTeachers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
          <p className="text-muted-foreground">No teachers found</p>
        </div>
      )}
    </div>
  );
}
