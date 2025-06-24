
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  Fingerprint, 
  Key, 
  Phone,
  User,
  MapPin,
  Activity
} from "lucide-react";

const EmergencyAccess = () => {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [verificationStep, setVerificationStep] = useState(1);
  const [biometricVerified, setBiometricVerified] = useState(false);

  const emergencyContacts = [
    { name: 'Jane Smith', relationship: 'Spouse', phone: '(555) 987-6543', priority: 1 },
    { name: 'Dr. Sarah Johnson', relationship: 'Primary Care', phone: '(555) 123-4567', priority: 2 },
    { name: 'Michael Smith', relationship: 'Son', phone: '(555) 456-7890', priority: 3 }
  ];

  const criticalInfo = {
    allergies: ['Penicillin', 'Shellfish', 'Latex'],
    medications: ['Lisinopril 10mg daily', 'Metformin 500mg twice daily'],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    bloodType: 'A+',
    emergencyInstructions: 'Patient has insulin pump. Do not perform MRI without removing pump first.'
  };

  const handleEmergencyAccess = () => {
    if (verificationStep === 1) {
      setVerificationStep(2);
    } else if (verificationStep === 2 && accessCode === 'EMERGENCY123') {
      setVerificationStep(3);
    } else if (verificationStep === 3 && biometricVerified) {
      setEmergencyMode(true);
      setVerificationStep(1);
    }
  };

  const handleBiometricScan = () => {
    // Mock biometric verification
    setTimeout(() => {
      setBiometricVerified(true);
    }, 2000);
  };

  if (emergencyMode) {
    return (
      <div className="space-y-6">
        {/* Emergency Header */}
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-semibold">
            EMERGENCY ACCESS ACTIVATED - All access is being logged and monitored
          </AlertDescription>
        </Alert>

        {/* Critical Patient Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                Critical Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-red-800">Allergies</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {criticalInfo.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-red-800">Blood Type</h4>
                <p className="text-lg font-bold text-red-700">{criticalInfo.bloodType}</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-800">Emergency Instructions</h4>
                <p className="text-sm text-red-700">{criticalInfo.emergencyInstructions}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{contact.name}</h4>
                    <p className="text-sm text-slate-600">{contact.relationship}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm">{contact.phone}</p>
                    <Badge variant="outline" className="text-xs">
                      Priority {contact.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Current Medications */}
        <Card>
          <CardHeader>
            <CardTitle>Current Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criticalInfo.medications.map((med, index) => (
                <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-semibold text-blue-800">{med}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Medical Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Known Medical Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {criticalInfo.conditions.map((condition, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {condition}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Vitals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Latest Vital Signs (Last 24 hours)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-slate-600">Blood Pressure</p>
                <p className="text-xl font-bold text-red-600">145/92</p>
                <p className="text-xs text-slate-500">High</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-slate-600">Heart Rate</p>
                <p className="text-xl font-bold text-green-600">76 bpm</p>
                <p className="text-xs text-slate-500">Normal</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-slate-600">Temperature</p>
                <p className="text-xl font-bold text-blue-600">98.6°F</p>
                <p className="text-xs text-slate-500">Normal</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-slate-600">Blood Glucose</p>
                <p className="text-xl font-bold text-orange-600">142 mg/dL</p>
                <p className="text-xs text-slate-500">High</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          onClick={() => setEmergencyMode(false)}
          className="w-full"
        >
          End Emergency Session
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-slate-800">Emergency Access Protocol</h3>
        <p className="text-slate-600">Break-glass access for critical medical situations</p>
      </div>

      {/* Emergency Access Steps */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Emergency Break-Glass Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Justification */}
          {verificationStep >= 1 && (
            <div className={`p-4 rounded-lg border ${verificationStep === 1 ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${verificationStep === 1 ? 'bg-red-500' : 'bg-green-500'}`}>
                  1
                </div>
                <h4 className="font-semibold">Medical Emergency Justification</h4>
              </div>
              {verificationStep === 1 ? (
                <div className="space-y-3">
                  <p className="text-sm text-slate-700">
                    By proceeding, you acknowledge this is a legitimate medical emergency requiring immediate access to patient records.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                      <Input placeholder="Dr. [Your Name]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Medical Facility</label>
                      <Input placeholder="Hospital/Clinic Name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Reason</label>
                    <Input placeholder="Brief description of medical emergency" />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-green-700">✓ Emergency justification provided</p>
              )}
            </div>
          )}

          {/* Step 2: Emergency Code */}
          {verificationStep >= 2 && (
            <div className={`p-4 rounded-lg border ${verificationStep === 2 ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${verificationStep === 2 ? 'bg-red-500' : 'bg-green-500'}`}>
                  2
                </div>
                <h4 className="font-semibold">Emergency Access Code</h4>
              </div>
              {verificationStep === 2 ? (
                <div className="space-y-3">
                  <p className="text-sm text-slate-700">
                    Enter the emergency access code provided by hospital administration.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter emergency code"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                      className="font-mono"
                    />
                    <Button variant="outline">
                      <Key className="w-4 h-4 mr-2" />
                      Verify
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Contact hospital security if you don't have the emergency code: (555) 911-HELP
                  </p>
                </div>
              ) : (
                <p className="text-sm text-green-700">✓ Emergency access code verified</p>
              )}
            </div>
          )}

          {/* Step 3: Biometric Verification */}
          {verificationStep >= 3 && (
            <div className={`p-4 rounded-lg border ${verificationStep === 3 ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${verificationStep === 3 ? 'bg-red-500' : 'bg-green-500'}`}>
                  3
                </div>
                <h4 className="font-semibold">Biometric Verification</h4>
              </div>
              {verificationStep === 3 && !biometricVerified ? (
                <div className="space-y-3">
                  <p className="text-sm text-slate-700">
                    Complete biometric verification to access patient records.
                  </p>
                  <Button onClick={handleBiometricScan} className="w-full">
                    <Fingerprint className="w-4 h-4 mr-2" />
                    Scan Fingerprint
                  </Button>
                  <p className="text-xs text-slate-500 text-center">
                    Place your finger on the biometric scanner
                  </p>
                </div>
              ) : (
                <p className="text-sm text-green-700">✓ Biometric verification complete</p>
              )}
            </div>
          )}

          {/* Action Button */}
          <Button
            onClick={handleEmergencyAccess}
            className="w-full bg-red-600 hover:bg-red-700"
            disabled={verificationStep === 3 && !biometricVerified}
          >
            {verificationStep === 1 && 'Proceed to Verification'}
            {verificationStep === 2 && 'Verify Access Code'}
            {verificationStep === 3 && !biometricVerified && 'Complete Biometric Scan'}
            {verificationStep === 3 && biometricVerified && 'ACTIVATE EMERGENCY ACCESS'}
          </Button>
        </CardContent>
      </Card>

      {/* Legal Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800">Legal Notice</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Emergency access is granted under break-glass protocols for life-threatening situations only. 
                All access attempts are logged, monitored, and subject to audit. Unauthorized access may result 
                in criminal charges and professional disciplinary action.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Emergency Access Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Emergency Access Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Dr. Emergency Team</h4>
                  <p className="text-sm text-slate-600">City Hospital ER</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">June 18, 2024 - 22:15</p>
                <Badge variant="destructive" className="text-xs">
                  Emergency Access
                </Badge>
              </div>
            </div>
            <div className="text-center text-slate-500 text-sm">
              No other emergency access in the last 30 days
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyAccess;
