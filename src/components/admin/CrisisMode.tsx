
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  Shield, 
  Activity, 
  Users, 
  Clock,
  Phone,
  Radio,
  MapPin,
  Zap
} from "lucide-react";

const CrisisMode = () => {
  const [crisisActive, setCrisisActive] = useState(false);
  const [emergencyProtocols, setEmergencyProtocols] = useState({
    massAccess: false,
    auditBypass: false,
    emergencyContacts: true,
    dataBackup: true,
    systemMonitoring: true
  });

  const crisisScenarios = [
    {
      id: 'natural-disaster',
      name: 'Natural Disaster',
      description: 'Earthquake, hurricane, or other natural disaster',
      actions: ['Enable mass casualty protocols', 'Activate emergency staff', 'Bypass consent for life-threatening cases'],
      active: false
    },
    {
      id: 'cyberattack',
      name: 'Cyber Attack',
      description: 'Security breach or ransomware attack',
      actions: ['Isolate affected systems', 'Enable manual processes', 'Notify security team'],
      active: false
    },
    {
      id: 'mass-casualty',
      name: 'Mass Casualty Event',
      description: 'Multiple casualties requiring immediate attention',
      actions: ['Open emergency access', 'Activate triage protocols', 'Enable rapid patient registration'],
      active: crisisActive
    },
    {
      id: 'system-outage',
      name: 'System Outage',
      description: 'Critical system failure or infrastructure issue',
      actions: ['Switch to backup systems', 'Enable offline mode', 'Notify IT emergency team'],
      active: false
    }
  ];

  const emergencyTeam = [
    { name: 'Dr. Emergency Director', role: 'Chief Medical Officer', phone: '(555) 911-1001', status: 'Available' },
    { name: 'Security Chief', role: 'IT Security Manager', phone: '(555) 911-1002', status: 'On-Call' },
    { name: 'Admin Supervisor', role: 'Hospital Administrator', phone: '(555) 911-1003', status: 'Available' },
    { name: 'Network Operations', role: 'IT Operations', phone: '(555) 911-1004', status: 'Monitoring' }
  ];

  const systemStatus = [
    { system: 'Patient Records Database', status: 'Operational', uptime: '99.9%' },
    { system: 'Blockchain Network', status: 'Operational', uptime: '100%' },
    { system: 'Authentication System', status: 'Degraded', uptime: '95.2%' },
    { system: 'Backup Systems', status: 'Standby', uptime: '100%' },
    { system: 'Emergency Access Portal', status: crisisActive ? 'Active' : 'Standby', uptime: '100%' }
  ];

  const activateCrisisMode = () => {
    setCrisisActive(true);
    // Simulate crisis activation
    console.log('Crisis Mode Activated - All emergency protocols enabled');
  };

  const deactivateCrisisMode = () => {
    setCrisisActive(false);
    setEmergencyProtocols({
      massAccess: false,
      auditBypass: false,
      emergencyContacts: true,
      dataBackup: true,
      systemMonitoring: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational': case 'Available': case 'Active': return 'bg-green-100 text-green-800';
      case 'Degraded': case 'On-Call': return 'bg-yellow-100 text-yellow-800';
      case 'Offline': case 'Unavailable': return 'bg-red-100 text-red-800';
      case 'Standby': case 'Monitoring': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Crisis Mode Header */}
      {crisisActive && (
        <Alert className="border-red-500 bg-red-50 animate-pulse">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-semibold">
            CRISIS MODE ACTIVE - Emergency protocols are in effect. All activities are being monitored and logged.
          </AlertDescription>
        </Alert>
      )}

      {/* Crisis Control Panel */}
      <Card className={crisisActive ? 'border-red-500 bg-red-50' : ''}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className={`w-5 h-5 ${crisisActive ? 'text-red-600' : 'text-slate-600'}`} />
            Crisis Management Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Master Crisis Switch */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className={`font-semibold ${crisisActive ? 'text-red-800' : 'text-slate-800'}`}>
                  Master Crisis Mode
                </h4>
                <p className={`text-sm ${crisisActive ? 'text-red-600' : 'text-slate-600'}`}>
                  {crisisActive 
                    ? 'Emergency protocols active - Enhanced monitoring and break-glass access enabled'
                    : 'Normal operations - Standard security and audit controls active'
                  }
                </p>
              </div>
              <Switch 
                checked={crisisActive}
                onCheckedChange={crisisActive ? deactivateCrisisMode : activateCrisisMode}
                className={crisisActive ? 'data-[state=checked]:bg-red-600' : ''}
              />
            </div>

            {crisisActive && (
              <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span className="font-semibold text-red-800">Crisis Activated</span>
                </div>
                <p className="text-sm text-red-700">
                  Started: {new Date().toLocaleString()} • Duration: Active
                </p>
                <p className="text-sm text-red-700">
                  Reason: Mass casualty event simulation
                </p>
              </div>
            )}
          </div>

          {/* Emergency Protocol Toggles */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emergency Protocols</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Mass Casualty Access</h5>
                    <p className="text-xs text-slate-600">Enable rapid patient registration</p>
                  </div>
                  <Switch 
                    checked={emergencyProtocols.massAccess}
                    onCheckedChange={(checked) => setEmergencyProtocols(prev => ({...prev, massAccess: checked}))}
                    disabled={!crisisActive}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Audit Bypass</h5>
                    <p className="text-xs text-slate-600">Temporary audit requirement bypass</p>
                  </div>
                  <Switch 
                    checked={emergencyProtocols.auditBypass}
                    onCheckedChange={(checked) => setEmergencyProtocols(prev => ({...prev, auditBypass: checked}))}
                    disabled={!crisisActive}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Emergency Contacts</h5>
                    <p className="text-xs text-slate-600">Auto-notify emergency team</p>
                  </div>
                  <Switch 
                    checked={emergencyProtocols.emergencyContacts}
                    onCheckedChange={(checked) => setEmergencyProtocols(prev => ({...prev, emergencyContacts: checked}))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Protocols</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Data Backup</h5>
                    <p className="text-xs text-slate-600">Continuous data protection</p>
                  </div>
                  <Switch 
                    checked={emergencyProtocols.dataBackup}
                    onCheckedChange={(checked) => setEmergencyProtocols(prev => ({...prev, dataBackup: checked}))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Enhanced Monitoring</h5>
                    <p className="text-xs text-slate-600">Real-time system monitoring</p>
                  </div>
                  <Switch 
                    checked={emergencyProtocols.systemMonitoring}
                    onCheckedChange={(checked) => setEmergencyProtocols(prev => ({...prev, systemMonitoring: checked}))}
                  />
                </div>

                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Radio className="w-4 h-4 mr-2" />
                    Test Emergency Systems
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Crisis Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Crisis Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {crisisScenarios.map((scenario) => (
              <div key={scenario.id} className={`p-4 border rounded-lg ${scenario.active ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-semibold ${scenario.active ? 'text-red-800' : 'text-slate-800'}`}>
                    {scenario.name}
                  </h4>
                  <Badge className={scenario.active ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'}>
                    {scenario.active ? 'Active' : 'Standby'}
                  </Badge>
                </div>
                <p className={`text-sm mb-3 ${scenario.active ? 'text-red-700' : 'text-slate-600'}`}>
                  {scenario.description}
                </p>
                <div className="space-y-1">
                  {scenario.actions.map((action, index) => (
                    <p key={index} className={`text-xs ${scenario.active ? 'text-red-600' : 'text-slate-500'}`}>
                      • {action}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Team */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Emergency Response Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {emergencyTeam.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-800">{member.name}</h4>
                  <p className="text-sm text-slate-600">{member.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span className="text-xs font-mono text-slate-500">{member.phone}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Status Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemStatus.map((system, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-800">{system.system}</h4>
                  <p className="text-sm text-slate-600">Uptime: {system.uptime}</p>
                </div>
                <Badge className={getStatusColor(system.status)}>
                  {system.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Phone className="w-6 h-6" />
              <span>Call Emergency Team</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <MapPin className="w-6 h-6" />
              <span>Evacuation Protocol</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Zap className="w-6 h-6" />
              <span>System Failover</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrisisMode;
