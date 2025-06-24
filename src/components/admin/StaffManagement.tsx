
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  Search,
  Mail,
  Phone,
  Calendar,
  UserCheck
} from "lucide-react";

const StaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const staffMembers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      phone: '(555) 123-4567',
      role: 'Doctor',
      department: 'Cardiology',
      permissions: ['Read Patient Records', 'Write Prescriptions', 'Emergency Access'],
      status: 'Active',
      lastAccess: '2024-06-20 14:30',
      joinDate: '2020-03-15',
      certifications: ['Board Certified Cardiologist', 'ACLS Certified']
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@hospital.com',
      phone: '(555) 234-5678',
      role: 'Nurse',
      department: 'Emergency',
      permissions: ['Read Patient Records', 'Update Vitals', 'Emergency Access'],
      status: 'Active',
      lastAccess: '2024-06-20 16:45',
      joinDate: '2019-08-22',
      certifications: ['RN License', 'BLS Certified', 'PALS Certified']
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@hospital.com',
      phone: '(555) 345-6789',
      role: 'Administrator',
      department: 'IT',
      permissions: ['System Administration', 'User Management', 'Audit Logs'],
      status: 'Active',
      lastAccess: '2024-06-20 09:15',
      joinDate: '2021-01-10',
      certifications: ['CISSP', 'HIPAA Security Officer']
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.wilson@hospital.com',
      phone: '(555) 456-7890',
      role: 'Technician',
      department: 'Radiology',
      permissions: ['Read Patient Records', 'Upload Imaging'],
      status: 'Inactive',
      lastAccess: '2024-06-15 11:20',
      joinDate: '2018-11-05',
      certifications: ['Radiology Technologist', 'CT Certified']
    }
  ];

  const roles = [
    { value: 'Doctor', permissions: ['Read Patient Records', 'Write Prescriptions', 'Emergency Access', 'Schedule Appointments'] },
    { value: 'Nurse', permissions: ['Read Patient Records', 'Update Vitals', 'Emergency Access', 'Medication Administration'] },
    { value: 'Administrator', permissions: ['System Administration', 'User Management', 'Audit Logs', 'Compliance Reports'] },
    { value: 'Technician', permissions: ['Read Patient Records', 'Upload Imaging', 'Equipment Management'] }
  ];

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || staff.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Doctor': return 'bg-blue-100 text-blue-800';
      case 'Nurse': return 'bg-purple-100 text-purple-800';
      case 'Administrator': return 'bg-orange-100 text-orange-800';
      case 'Technician': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Staff Management</h3>
          <p className="text-slate-600">Manage hospital staff roles and permissions</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Staff Member
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by name, email, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Doctor">Doctors</SelectItem>
                <SelectItem value="Nurse">Nurses</SelectItem>
                <SelectItem value="Administrator">Administrators</SelectItem>
                <SelectItem value="Technician">Technicians</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Add Staff Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Staff Member</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <Input placeholder="Enter full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                <Input placeholder="Enter phone number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="Nurse">Nurse</SelectItem>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Technician">Technician</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                <Input placeholder="Enter department" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                <Input type="date" />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button>Add Staff Member</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Staff List */}
      <div className="space-y-4">
        {filteredStaff.map((staff) => (
          <Card key={staff.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800">{staff.name}</h4>
                    <p className="text-slate-600">{staff.department} • {staff.role}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span>{staff.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{staff.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(staff.status)}>
                    {staff.status}
                  </Badge>
                  <Badge className={getRoleColor(staff.role)}>
                    {staff.role}
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h5 className="font-semibold text-slate-700 mb-2">Permissions</h5>
                  <div className="flex flex-wrap gap-1">
                    {staff.permissions.map((permission, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-slate-700 mb-2">Certifications</h5>
                  <div className="space-y-1">
                    {staff.certifications.map((cert, index) => (
                      <p key={index} className="text-sm text-slate-600">• {cert}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Joined: {staff.joinDate}</span>
                  </div>
                  <div>Last access: {staff.lastAccess}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role Permissions Reference */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Shield className="w-5 h-5" />
            Role-Based Access Control (RBAC)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <div key={role.value} className="p-3 bg-white rounded-lg border">
                <h4 className="font-semibold text-slate-800 mb-2">{role.value}</h4>
                <div className="space-y-1">
                  {role.permissions.map((permission, index) => (
                    <p key={index} className="text-sm text-slate-600">• {permission}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffManagement;
