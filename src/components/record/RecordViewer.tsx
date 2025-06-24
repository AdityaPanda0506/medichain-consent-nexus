
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Heart, 
  Pill, 
  Activity, 
  Eye, 
  Download,
  Share,
  Clock,
  User,
  AlertTriangle
} from "lucide-react";

const RecordViewer = () => {
  const [selectedPatient] = useState({
    id: 'PAT123456',
    name: 'John Smith',
    dob: '1979-03-15',
    gender: 'Male',
    consentExpiry: '2024-12-01'
  });

  const medicalHistory = [
    {
      date: '2024-06-15',
      diagnosis: 'Essential Hypertension',
      icd10: 'I10',
      provider: 'Dr. Sarah Johnson',
      notes: 'Blood pressure consistently elevated. Lifestyle modifications recommended.',
      severity: 'Moderate'
    },
    {
      date: '2024-03-20',
      diagnosis: 'Type 2 Diabetes Mellitus',
      icd10: 'E11.9',
      provider: 'Dr. Michael Chen',
      notes: 'Newly diagnosed. HbA1c 7.2%. Initiated on metformin.',
      severity: 'Moderate'
    },
    {
      date: '2023-11-10',
      diagnosis: 'Knee Osteoarthritis',
      icd10: 'M17.9',
      provider: 'Dr. Emily Davis',
      notes: 'Bilateral knee pain. X-ray shows moderate joint space narrowing.',
      severity: 'Mild'
    }
  ];

  const medications = [
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      route: 'Oral',
      prescriber: 'Dr. Sarah Johnson',
      startDate: '2024-06-15',
      endDate: null,
      status: 'Active',
      ndc: '0093-1055-56'
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily with meals',
      route: 'Oral',
      prescriber: 'Dr. Michael Chen',
      startDate: '2024-03-20',
      endDate: null,
      status: 'Active',
      ndc: '0093-1045-01'
    },
    {
      name: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed for pain',
      route: 'Oral',
      prescriber: 'Dr. Emily Davis',
      startDate: '2023-11-10',
      endDate: '2024-05-10',
      status: 'Discontinued',
      ndc: '0574-0155-01'
    }
  ];

  const labResults = [
    {
      date: '2024-06-15',
      test: 'Comprehensive Metabolic Panel',
      results: [
        { name: 'Glucose', value: '142', unit: 'mg/dL', reference: '70-100', status: 'High' },
        { name: 'Sodium', value: '138', unit: 'mEq/L', reference: '136-145', status: 'Normal' },
        { name: 'Potassium', value: '4.2', unit: 'mEq/L', reference: '3.5-5.0', status: 'Normal' },
        { name: 'Creatinine', value: '1.1', unit: 'mg/dL', reference: '0.7-1.3', status: 'Normal' }
      ]
    },
    {
      date: '2024-06-15',
      test: 'Lipid Panel',
      results: [
        { name: 'Total Cholesterol', value: '220', unit: 'mg/dL', reference: '<200', status: 'High' },
        { name: 'HDL', value: '45', unit: 'mg/dL', reference: '>40', status: 'Normal' },
        { name: 'LDL', value: '155', unit: 'mg/dL', reference: '<100', status: 'High' },
        { name: 'Triglycerides', value: '180', unit: 'mg/dL', reference: '<150', status: 'High' }
      ]
    }
  ];

  const vitalSigns = [
    {
      date: '2024-06-20',
      bloodPressure: { systolic: 145, diastolic: 92 },
      heartRate: 76,
      temperature: 98.6,
      respiratoryRate: 16,
      oxygenSaturation: 98,
      weight: 185,
      height: 70,
      bmi: 26.5
    },
    {
      date: '2024-06-15',
      bloodPressure: { systolic: 138, diastolic: 88 },
      heartRate: 72,
      temperature: 98.4,
      respiratoryRate: 14,
      oxygenSaturation: 99,
      weight: 186,
      height: 70,
      bmi: 26.7
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'High': case 'Critical': return 'bg-red-100 text-red-800';
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Discontinued': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Moderate': return 'bg-orange-100 text-orange-800';
      case 'Mild': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-800">{selectedPatient.name}</h3>
                <p className="text-slate-600">Patient ID: {selectedPatient.id}</p>
                <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                  <span>DOB: {selectedPatient.dob}</span>
                  <span>Gender: {selectedPatient.gender}</span>
                  <span>Age: {new Date().getFullYear() - new Date(selectedPatient.dob).getFullYear()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800">
                <Clock className="w-3 h-3 mr-1" />
                Consent until {selectedPatient.consentExpiry}
              </Badge>
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
        </CardContent>
      </Card>

      {/* Record Tabs */}
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Medical History
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-2">
            <Pill className="w-4 h-4" />
            Medications
          </TabsTrigger>
          <TabsTrigger value="labs" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Lab Results
          </TabsTrigger>
          <TabsTrigger value="vitals" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Vital Signs
          </TabsTrigger>
          <TabsTrigger value="imaging" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Imaging
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          {medicalHistory.map((record, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800">{record.diagnosis}</h4>
                    <p className="text-sm text-slate-600">ICD-10: {record.icd10} • {record.provider}</p>
                    <p className="text-xs text-slate-500">{record.date}</p>
                  </div>
                  <Badge className={getSeverityColor(record.severity)}>
                    {record.severity}
                  </Badge>
                </div>
                <p className="text-slate-700">{record.notes}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          {medications.map((med, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800">{med.name} {med.dosage}</h4>
                    <p className="text-sm text-slate-600">{med.frequency} • {med.route}</p>
                    <p className="text-xs text-slate-500">Prescribed by {med.prescriber} on {med.startDate}</p>
                    <p className="text-xs font-mono text-slate-400">NDC: {med.ndc}</p>
                  </div>
                  <Badge className={getStatusColor(med.status)}>
                    {med.status}
                  </Badge>
                </div>
                {med.endDate && (
                  <p className="text-sm text-slate-600">Discontinued: {med.endDate}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="labs" className="space-y-4">
          {labResults.map((lab, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{lab.test}</CardTitle>
                <p className="text-sm text-slate-600">{lab.date}</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Test</th>
                        <th className="text-left p-2">Result</th>
                        <th className="text-left p-2">Unit</th>
                        <th className="text-left p-2">Reference Range</th>
                        <th className="text-left p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lab.results.map((result, resultIndex) => (
                        <tr key={resultIndex} className="border-b">
                          <td className="p-2 font-medium">{result.name}</td>
                          <td className="p-2">{result.value}</td>
                          <td className="p-2">{result.unit}</td>
                          <td className="p-2">{result.reference}</td>
                          <td className="p-2">
                            <Badge className={getStatusColor(result.status)}>
                              {result.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          {vitalSigns.map((vital, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{vital.date}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-slate-600">Blood Pressure</p>
                    <p className="text-xl font-bold text-red-600">
                      {vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic}
                    </p>
                    <p className="text-xs text-slate-500">mmHg</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-slate-600">Heart Rate</p>
                    <p className="text-xl font-bold text-green-600">{vital.heartRate}</p>
                    <p className="text-xs text-slate-500">bpm</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-slate-600">Temperature</p>
                    <p className="text-xl font-bold text-blue-600">{vital.temperature}</p>
                    <p className="text-xs text-slate-500">°F</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-slate-600">BMI</p>
                    <p className="text-xl font-bold text-purple-600">{vital.bmi}</p>
                    <p className="text-xs text-slate-500">kg/m²</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600">Respiratory Rate</p>
                    <p className="text-lg font-semibold">{vital.respiratoryRate} rpm</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600">Oxygen Saturation</p>
                    <p className="text-lg font-semibold">{vital.oxygenSaturation}%</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600">Weight</p>
                    <p className="text-lg font-semibold">{vital.weight} lbs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="imaging" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Eye className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">3D Medical Imaging</h3>
                <p className="text-slate-500 mb-4">Interactive 3D medical imaging viewer will be displayed here</p>
                <Button variant="outline">
                  Load 3D Viewer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Access Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div>
              <h4 className="font-semibold text-yellow-800">Access Notice</h4>
              <p className="text-sm text-yellow-600">
                You are viewing records under patient consent. This access is logged and monitored. 
                Consent expires on {selectedPatient.consentExpiry}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecordViewer;
