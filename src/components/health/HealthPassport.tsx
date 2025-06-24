
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  FileText, 
  Download, 
  Share, 
  Lock, 
  Calendar,
  Activity,
  Pill,
  Stethoscope,
  Eye
} from "lucide-react";

const HealthPassport = () => {
  const [selectedCategory, setSelectedCategory] = useState('overview');

  const categories = [
    { id: 'overview', label: 'Overview', icon: Heart },
    { id: 'medical', label: 'Medical History', icon: FileText },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'vitals', label: 'Vital Signs', icon: Activity },
    { id: 'imaging', label: 'Imaging', icon: Eye }
  ];

  const medicalHistory = [
    { date: '2024-05-15', condition: 'Hypertension', doctor: 'Dr. Sarah Johnson', status: 'Ongoing' },
    { date: '2023-11-20', condition: 'Type 2 Diabetes', doctor: 'Dr. Michael Chen', status: 'Managed' },
    { date: '2023-08-10', condition: 'Knee Surgery', doctor: 'Dr. Emily Davis', status: 'Recovered' }
  ];

  const medications = [
    { name: 'Lisinopril 10mg', purpose: 'Blood Pressure', frequency: 'Once daily', prescriber: 'Dr. Sarah Johnson', status: 'Active' },
    { name: 'Metformin 500mg', purpose: 'Diabetes', frequency: 'Twice daily', prescriber: 'Dr. Michael Chen', status: 'Active' },
    { name: 'Ibuprofen 400mg', purpose: 'Pain Relief', frequency: 'As needed', prescriber: 'Dr. Emily Davis', status: 'Inactive' }
  ];

  const vitalSigns = [
    { date: '2024-06-20', bp: '128/82', hr: '72', temp: '98.6°F', weight: '165 lbs', doctor: 'Dr. Sarah Johnson' },
    { date: '2024-05-15', bp: '135/88', hr: '78', temp: '98.4°F', weight: '167 lbs', doctor: 'Dr. Sarah Johnson' },
    { date: '2024-04-10', bp: '142/90', hr: '75', temp: '98.7°F', weight: '169 lbs', doctor: 'Dr. Michael Chen' }
  ];

  const imagingStudies = [
    { date: '2024-06-18', type: 'Chest X-Ray', result: 'Normal', doctor: 'Dr. Johnson', facility: 'Central Medical' },
    { date: '2024-05-20', type: 'ECG', result: 'Normal Sinus Rhythm', doctor: 'Dr. Johnson', facility: 'Central Medical' },
    { date: '2024-03-15', type: 'MRI Knee', result: 'Post-surgical changes', doctor: 'Dr. Davis', facility: 'Orthopedic Center' }
  ];

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case 'medical':
        return (
          <div className="space-y-4">
            {medicalHistory.map((record, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-800">{record.condition}</h4>
                      <p className="text-sm text-slate-600">Diagnosed by {record.doctor}</p>
                      <p className="text-xs text-slate-500">{record.date}</p>
                    </div>
                    <Badge variant={record.status === 'Ongoing' ? 'default' : record.status === 'Managed' ? 'secondary' : 'outline'}>
                      {record.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'medications':
        return (
          <div className="space-y-4">
            {medications.map((med, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-800">{med.name}</h4>
                      <p className="text-sm text-slate-600">{med.purpose} • {med.frequency}</p>
                      <p className="text-xs text-slate-500">Prescribed by {med.prescriber}</p>
                    </div>
                    <Badge variant={med.status === 'Active' ? 'default' : 'secondary'}>
                      {med.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'vitals':
        return (
          <div className="space-y-4">
            {vitalSigns.map((vital, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-800">{vital.date}</h4>
                    <p className="text-xs text-slate-500">by {vital.doctor}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Blood Pressure</p>
                      <p className="font-semibold text-red-600">{vital.bp}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Heart Rate</p>
                      <p className="font-semibold text-green-600">{vital.hr} bpm</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Temperature</p>
                      <p className="font-semibold text-blue-600">{vital.temp}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Weight</p>
                      <p className="font-semibold text-purple-600">{vital.weight}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'imaging':
        return (
          <div className="space-y-4">
            {imagingStudies.map((study, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-800">{study.type}</h4>
                      <p className="text-sm text-slate-600">{study.result}</p>
                      <p className="text-xs text-slate-500">{study.date} • {study.doctor} • {study.facility}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Medical Records</p>
                  <p className="text-2xl font-bold text-blue-600">24</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Pill className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Active Medications</p>
                  <p className="text-2xl font-bold text-green-600">3</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Activity className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Recent Vitals</p>
                  <p className="text-2xl font-bold text-purple-600">5</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-slate-800">Cardiology Appointment</p>
                      <p className="text-sm text-slate-600">Dr. Sarah Johnson • June 20, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Stethoscope className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-slate-800">Routine Checkup</p>
                      <p className="text-sm text-slate-600">Dr. Michael Chen • June 15, 2024</p>
                    </div>
                  </div>
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Health Passport</h3>
          <p className="text-slate-600">Your complete health record in one secure location</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex space-x-1 p-1 bg-slate-100 rounded-lg">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedCategory === category.id
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {renderCategoryContent()}
      </div>

      {/* Encryption Notice */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">End-to-End Encrypted</h4>
              <p className="text-sm text-green-600">
                Your health data is encrypted with AES-256-GCM and stored on IPFS. 
                Only you and authorized parties can decrypt this information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthPassport;
