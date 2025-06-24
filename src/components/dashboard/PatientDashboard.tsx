
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  QrCode, 
  Shield, 
  Clock, 
  Users, 
  FileText, 
  Heart,
  Eye,
  Download,
  Settings
} from "lucide-react";
import ConsentManager from "@/components/consent/ConsentManager";
import HealthPassport from "@/components/health/HealthPassport";
import QRGenerator from "@/components/qr/QRGenerator";
import AccessHistory from "@/components/access/AccessHistory";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [emergencyAccess, setEmergencyAccess] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Heart },
    { id: 'consent', label: 'Consent Manager', icon: Shield },
    { id: 'passport', label: 'Health Passport', icon: FileText },
    { id: 'qr', label: 'QR Access', icon: QrCode },
    { id: 'history', label: 'Access History', icon: Clock }
  ];

  const consentStatus = [
    { doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', access: 'Full', expires: '2024-07-15', active: true },
    { doctor: 'Dr. Michael Chen', specialty: 'Radiology', access: 'Imaging Only', expires: '2024-07-10', active: true },
    { doctor: 'Dr. Emily Davis', specialty: 'Primary Care', access: 'Full', expires: '2024-08-01', active: false }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'consent':
        return <ConsentManager />;
      case 'passport':
        return <HealthPassport />;
      case 'qr':
        return <QRGenerator />;
      case 'history':
        return <AccessHistory />;
      default:
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Active Consents</p>
                      <p className="text-2xl font-bold text-blue-600">5</p>
                    </div>
                    <Shield className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Recent Access</p>
                      <p className="text-2xl font-bold text-green-600">12</p>
                    </div>
                    <Eye className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Authorized Doctors</p>
                      <p className="text-2xl font-bold text-purple-600">8</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Health Records</p>
                      <p className="text-2xl font-bold text-orange-600">24</p>
                    </div>
                    <FileText className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Access Toggle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Emergency Access Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-red-800">Emergency Break-Glass Protocol</h3>
                    <p className="text-sm text-red-600">Allow emergency access to critical health data</p>
                  </div>
                  <Switch 
                    checked={emergencyAccess}
                    onCheckedChange={setEmergencyAccess}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Current Consent Status */}
            <Card>
              <CardHeader>
                <CardTitle>Current Consent Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consentStatus.map((consent, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{consent.doctor}</h4>
                            <p className="text-sm text-slate-600">{consent.specialty}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <Badge variant={consent.active ? "default" : "secondary"}>
                          {consent.access}
                        </Badge>
                        <p className="text-xs text-slate-500 mt-1">Expires: {consent.expires}</p>
                      </div>
                      <Switch checked={consent.active} />
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
            <h2 className="text-2xl font-bold text-slate-800">Patient Dashboard</h2>
            <p className="text-slate-600">Patient ID: PAT123456</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-800">Verified</Badge>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
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

export default PatientDashboard;
