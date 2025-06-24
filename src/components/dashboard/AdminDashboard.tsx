
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  Activity, 
  Building2, 
  Settings,
  BarChart3,
  Clock,
  FileText,
  Zap
} from "lucide-react";
import StaffManagement from "@/components/admin/StaffManagement";
import ComplianceHub from "@/components/admin/ComplianceHub";
import CrisisMode from "@/components/admin/CrisisMode";
import Analytics from "@/components/admin/Analytics";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [crisisMode, setCrisisMode] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'staff', label: 'Staff Management', icon: Users },
    { id: 'compliance', label: 'Compliance Hub', icon: Shield },
    { id: 'crisis', label: 'Crisis Mode', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const systemStats = [
    { label: 'Total Staff', value: '247', change: '+12', icon: Users, color: 'text-blue-600' },
    { label: 'Active Patients', value: '1,832', change: '+45', icon: Activity, color: 'text-green-600' },
    { label: 'Compliance Score', value: '98.5%', change: '+2.1%', icon: Shield, color: 'text-purple-600' },
    { label: 'System Uptime', value: '99.9%', change: '0%', icon: Zap, color: 'text-orange-600' }
  ];

  const recentAlerts = [
    { type: 'security', message: 'Unusual access pattern detected for Dr. Johnson', time: '5 min ago', severity: 'high' },
    { type: 'compliance', message: 'HIPAA audit trail exported successfully', time: '15 min ago', severity: 'info' },
    { type: 'system', message: 'Blockchain sync completed - 1,234 transactions processed', time: '30 min ago', severity: 'success' },
    { type: 'emergency', message: 'Emergency access granted to trauma team', time: '1 hour ago', severity: 'warning' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'staff':
        return <StaffManagement />;
      case 'compliance':
        return <ComplianceHub />;
      case 'crisis':
        return <CrisisMode />;
      case 'analytics':
        return <Analytics />;
      default:
        return (
          <div className="space-y-6">
            {/* System Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              {systemStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">{stat.label}</p>
                          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                          <p className="text-xs text-green-600">{stat.change}</p>
                        </div>
                        <IconComponent className={`w-8 h-8 ${stat.color.replace('text-', 'text-').replace('-600', '-500')}`} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Crisis Mode Toggle */}
            <Card className={crisisMode ? 'border-red-500 bg-red-50' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className={`w-5 h-5 ${crisisMode ? 'text-red-600' : 'text-slate-600'}`} />
                  Crisis Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className={`font-semibold ${crisisMode ? 'text-red-800' : 'text-slate-800'}`}>
                      Emergency Crisis Mode
                    </h3>
                    <p className={`text-sm ${crisisMode ? 'text-red-600' : 'text-slate-600'}`}>
                      {crisisMode ? 'Crisis protocols activated - Enhanced access controls enabled' : 'Enable emergency protocols and break-glass access'}
                    </p>
                  </div>
                  <Switch 
                    checked={crisisMode}
                    onCheckedChange={setCrisisMode}
                  />
                </div>
                {crisisMode && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="font-semibold text-red-800">Crisis Mode Active</span>
                    </div>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Enhanced audit logging enabled</li>
                      <li>• Emergency access protocols activated</li>
                      <li>• Real-time monitoring increased</li>
                      <li>• Automatic incident reporting active</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAlerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                      alert.severity === 'warning' ? 'border-orange-500 bg-orange-50' :
                      alert.severity === 'success' ? 'border-green-500 bg-green-50' :
                      'border-blue-500 bg-blue-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {alert.type}
                            </Badge>
                            <span className="text-xs text-slate-500">{alert.time}</span>
                          </div>
                          <p className="text-sm text-slate-800">{alert.message}</p>
                        </div>
                        <Badge variant={
                          alert.severity === 'high' ? 'destructive' :
                          alert.severity === 'warning' ? 'default' :
                          alert.severity === 'success' ? 'secondary' : 'outline'
                        }>
                          {alert.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <FileText className="w-6 h-6" />
                    <span>Export Audit Logs</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Shield className="w-6 h-6" />
                    <span>Run Compliance Check</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Users className="w-6 h-6" />
                    <span>Manage Staff Roles</span>
                  </Button>
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
            <h2 className="text-2xl font-bold text-slate-800">Hospital Administration</h2>
            <p className="text-slate-600">Central Medical Center - System Administrator</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-800">System Healthy</Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <Building2 className="w-3 h-3 mr-1" />
              Admin Access
            </Badge>
            {crisisMode && (
              <Badge className="bg-red-100 text-red-800 animate-pulse">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Crisis Mode
              </Badge>
            )}
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

export default AdminDashboard;
