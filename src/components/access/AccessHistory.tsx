
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  User,
  MapPin,
  Shield,
  AlertTriangle
} from "lucide-react";

const AccessHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [timeRange, setTimeRange] = useState('30');

  const accessLogs = [
    {
      id: 1,
      timestamp: '2024-06-20 14:30:00',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      hospital: 'Central Medical Center',
      dataAccessed: ['Medical History', 'Lab Results', 'Vital Signs'],
      accessType: 'Scheduled',
      location: 'New York, NY',
      ipAddress: '192.168.1.100',
      duration: '15 minutes',
      status: 'Completed'
    },
    {
      id: 2,
      timestamp: '2024-06-19 09:45:00',
      doctor: 'Dr. Michael Chen',
      specialty: 'Radiology',
      hospital: 'St. Mary\'s Hospital',
      dataAccessed: ['Imaging', 'Radiology Reports'],
      accessType: 'QR Code',
      location: 'Boston, MA',
      ipAddress: '10.0.0.50',
      duration: '8 minutes',
      status: 'Completed'
    },
    {
      id: 3,
      timestamp: '2024-06-18 22:15:00',
      doctor: 'Dr. Emergency Team',
      specialty: 'Emergency Medicine',
      hospital: 'City Hospital ER',
      dataAccessed: ['All Records', 'Emergency Contacts', 'Allergies'],
      accessType: 'Emergency',
      location: 'Chicago, IL',
      ipAddress: '172.16.0.25',
      duration: '45 minutes',
      status: 'Emergency Access'
    },
    {
      id: 4,
      timestamp: '2024-06-17 11:20:00',
      doctor: 'Dr. Emily Davis',
      specialty: 'Primary Care',
      hospital: 'Community Health Clinic',
      dataAccessed: ['Medical History', 'Prescriptions'],
      accessType: 'Scheduled',
      location: 'San Francisco, CA',
      ipAddress: '192.168.2.75',
      duration: '12 minutes',
      status: 'Completed'
    },
    {
      id: 5,
      timestamp: '2024-06-16 16:00:00',
      doctor: 'Unauthorized Access Attempt',
      specialty: 'Unknown',
      hospital: 'Unknown',
      dataAccessed: [],
      accessType: 'Failed',
      location: 'Unknown',
      ipAddress: '203.0.113.45',
      duration: '0 minutes',
      status: 'Blocked'
    }
  ];

  const filteredLogs = accessLogs.filter(log => {
    const matchesSearch = log.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || log.accessType.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Emergency Access': return 'bg-red-100 text-red-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getAccessTypeIcon = (type: string) => {
    switch (type) {
      case 'Emergency': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'QR Code': return <Eye className="w-4 h-4 text-blue-500" />;
      case 'Failed': return <Shield className="w-4 h-4 text-red-500" />;
      default: return <User className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Access History</h3>
          <p className="text-slate-600">Track all access to your health data</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by doctor or hospital..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Access Types</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="qr code">QR Code</SelectItem>
                <SelectItem value="failed">Failed Attempts</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Access Logs */}
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <Card key={log.id} className={`${log.status === 'Blocked' ? 'border-red-200 bg-red-50' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getAccessTypeIcon(log.accessType)}
                  <div>
                    <h4 className="font-semibold text-slate-800">{log.doctor}</h4>
                    <p className="text-sm text-slate-600">{log.specialty} • {log.hospital}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(log.status)}>
                    {log.status}
                  </Badge>
                  <p className="text-xs text-slate-500 mt-1">{log.timestamp}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">Data Accessed</p>
                  <div className="flex flex-wrap gap-1">
                    {log.dataAccessed.length > 0 ? (
                      log.dataAccessed.map((data, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {data}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">No data accessed</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">Access Details</p>
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{log.location}</span>
                    </div>
                    <div>IP: {log.ipAddress}</div>
                    <div>Duration: {log.duration}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>Access Type: {log.accessType}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Blockchain Verification */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-semibold text-blue-800">Blockchain Verification</h4>
              <p className="text-sm text-blue-600">
                All access logs are immutably recorded on Ethereum blockchain. 
                Hash: 0x1a2b3c4d5e6f7890abcdef... • Block: 18,245,678
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessHistory;
