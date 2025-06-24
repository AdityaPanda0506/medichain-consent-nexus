
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Clock, 
  Shield, 
  Edit, 
  Trash2, 
  CheckCircle,
  AlertCircle,
  Calendar,
  User
} from "lucide-react";

const ConsentManager = () => {
  const [consents, setConsents] = useState([
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      hospital: 'Central Medical Center',
      permissions: ['Medical History', 'Lab Results', 'Imaging', 'Prescriptions'],
      startDate: '2024-06-01',
      endDate: '2024-12-01',
      active: true,
      emergency: false
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Radiology',
      hospital: 'St. Mary\'s Hospital',
      permissions: ['Imaging', 'Radiology Reports'],
      startDate: '2024-06-15',
      endDate: '2024-07-15',
      active: true,
      emergency: false
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Davis',
      specialty: 'Primary Care',
      hospital: 'Community Health Clinic',
      permissions: ['Medical History', 'Lab Results', 'Prescriptions', 'Vital Signs'],
      startDate: '2024-05-01',
      endDate: '2024-11-01',
      active: false,
      emergency: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const toggleConsent = (id: number) => {
    setConsents(consents.map(consent => 
      consent.id === id ? { ...consent, active: !consent.active } : consent
    ));
  };

  const deleteConsent = (id: number) => {
    setConsents(consents.filter(consent => consent.id !== id));
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Consent Management</h3>
          <p className="text-slate-600">Manage doctor and hospital access to your health data</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Consent
        </Button>
      </div>

      {/* Add Consent Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Grant New Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Doctor Name</label>
                <Input placeholder="Enter doctor's name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Specialty</label>
                <Input placeholder="Enter specialty" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hospital/Clinic</label>
                <Input placeholder="Enter hospital name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Access Duration (days)</label>
                <Input type="number" placeholder="30" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Data Access Permissions</label>
              <div className="grid grid-cols-2 gap-3">
                {['Medical History', 'Lab Results', 'Imaging', 'Prescriptions', 'Vital Signs', 'Surgical Records'].map((permission) => (
                  <label key={permission} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-slate-700">{permission}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button>Grant Access</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Consents */}
      <div className="space-y-4">
        {consents.map((consent) => {
          const daysRemaining = getDaysRemaining(consent.endDate);
          const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
          const isExpired = daysRemaining <= 0;
          
          return (
            <Card key={consent.id} className={`${
              isExpired ? 'border-red-200 bg-red-50' : 
              isExpiringSoon ? 'border-orange-200 bg-orange-50' : 
              'border-slate-200'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{consent.doctorName}</h4>
                        <p className="text-sm text-slate-600">{consent.specialty} • {consent.hospital}</p>
                      </div>
                    </div>
                    
                    <div className="ml-13 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {consent.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Valid until: {consent.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className={
                            isExpired ? 'text-red-600 font-medium' :
                            isExpiringSoon ? 'text-orange-600 font-medium' :
                            'text-slate-600'
                          }>
                            {isExpired ? 'Expired' : `${daysRemaining} days remaining`}
                          </span>
                        </div>
                        {consent.emergency && (
                          <Badge variant="outline" className="border-red-200 text-red-600">
                            Emergency Access
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {consent.active ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                      <Switch 
                        checked={consent.active}
                        onCheckedChange={() => toggleConsent(consent.id)}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteConsent(consent.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Smart Contract Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-semibold text-blue-800">Blockchain Security</h4>
              <p className="text-sm text-blue-600">
                All consent records are secured on Ethereum blockchain with smart contracts. 
                Changes are immutable and require your cryptographic signature.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsentManager;
