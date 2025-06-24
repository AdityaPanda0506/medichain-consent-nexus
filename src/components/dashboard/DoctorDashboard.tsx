
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  User, 
  AlertTriangle, 
  Eye, 
  Clock, 
  Heart,
  FileText,
  Shield,
  Stethoscope,
  Activity
} from "lucide-react";
import PatientLookup from "@/components/doctor/PatientLookup";
import RecordViewer from "@/components/record/RecordViewer";
import EmergencyAccess from "@/components/emergency/EmergencyAccess";
import MedicalImaging3D from "@/components/imaging/MedicalImaging3D";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'lookup', label: 'Patient Lookup', icon: Search },
    { id: 'records', label: 'Record Viewer', icon: FileText },
    { id: 'imaging', label: '3D Imaging', icon: Eye },
    { id: 'emergency', label: 'Emergency Access', icon: AlertTriangle }
  ];

  const recentPatients = [
    { id: 'PAT123456', name: 'John Smith', age: 45, condition: 'Hypertension', lastVisit: '2024-06-20', status: 'Active' },
    { id: 'PAT789012', name: 'Sarah Johnson', age: 32, condition: 'Diabetes Type 2', lastVisit: '2024-06-19', status: 'Follow-up' },
    { id: 'PAT345678', name: 'Michael Chen', age: 58, condition: 'Cardiac Arrhythmia', lastVisit: '2024-06-18', status: 'Critical' }
  ];

  const urgentAlerts = [
    { patient: 'John Smith', alert: 'Critical lab results pending review', time: '2 hours ago', type: 'critical' },
    { patient: 'Sarah Johnson', alert: 'Medication refill required', time: '4 hours ago', type: 'warning' },
    { patient: 'Michael Chen', alert: 'Scheduled for follow-up appointment', time: '1 day ago', type: 'info' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'lookup':
        return <PatientLookup />;
      case 'records':
        return <RecordViewer />;
      case 'imaging':
        return <MedicalImaging3D />;
      case 'emergency':
        return <EmergencyAccess />;
      default:
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Active Patients</p>
                      <p className="text-2xl font-bold text-blue-600">24</p>
                    </div>
                    <User className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Pending Reviews</p>
                      <p className="text-2xl font-bold text-orange-600">8</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Critical Alerts</p>
                      <p className="text-2xl font-bold text-red-600">3</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Today's Appointments</p>
                      <p className="text-2xl font-bold text-green-600">12</p>
                    </div>
                    <Stethoscope className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Patient Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Quick Patient Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="Search by Patient ID, Name, or DOB..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Urgent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Urgent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {urgentAlerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      alert.type === 'critical' ? 'border-red-500 bg-red-50' :
                      alert.type === 'warning' ? 'border-orange-500 bg-orange-50' :
                      'border-blue-500 bg-blue-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-800">{alert.patient}</h4>
                          <p className="text-sm text-slate-600">{alert.alert}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">{alert.time}</p>
                          <Badge variant={
                            alert.type === 'critical' ? 'destructive' :
                            alert.type === 'warning' ? 'default' : 'secondary'
                          }>
                            {alert.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Patients */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPatients.map((patient, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{patient.name}</h4>
                          <p className="text-sm text-slate-600">ID: {patient.id} • Age: {patient.age}</p>
                          <p className="text-sm text-slate-500">{patient.condition}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          patient.status === 'Critical' ? 'destructive' :
                          patient.status === 'Follow-up' ? 'default' : 'secondary'
                        }>
                          {patient.status}
                        </Badge>
                        <p className="text-xs text-slate-500 mt-1">Last: {patient.lastVisit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Doctor Portal</h2>
            <p className="text-slate-600">Dr. Sarah Johnson - Cardiology</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-800">Verified</Badge>
            <Badge className="bg-blue-100 text-blue-800">Board Certified</Badge>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <nav className="flex space-x-1 p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
