
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Shield, 
  Building2, 
  Lock, 
  Database, 
  Zap,
  FileText,
  Users,
  Activity
} from "lucide-react";
import PatientDashboard from "@/components/dashboard/PatientDashboard";
import DoctorDashboard from "@/components/dashboard/DoctorDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'admin' | null>(null);

  const roles = [
    {
      id: 'patient' as const,
      title: 'Patient Portal',
      description: 'Manage your health data and consent permissions',
      icon: User,
      color: 'bg-blue-500',
      features: ['Consent Manager', 'Health Passport', 'QR Code Generator', 'Access History']
    },
    {
      id: 'doctor' as const,
      title: 'Doctor Portal',
      description: 'Access patient records with proper authorization',
      icon: Activity,
      color: 'bg-green-500',
      features: ['Patient Lookup', 'Record Viewer', '3D Medical Imaging', 'Emergency Access']
    },
    {
      id: 'admin' as const,
      title: 'Hospital Admin',
      description: 'Manage staff, compliance, and crisis protocols',
      icon: Building2,
      color: 'bg-purple-500',
      features: ['Staff Management', 'Compliance Hub', 'Crisis Mode', 'Analytics']
    }
  ];

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-slate-800">
              MedChain Platform - {roles.find(r => r.id === selectedRole)?.title}
            </h1>
            <Button 
              variant="outline" 
              onClick={() => setSelectedRole(null)}
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Switch Role
            </Button>
          </div>
          
          {selectedRole === 'patient' && <PatientDashboard />}
          {selectedRole === 'doctor' && <DoctorDashboard />}
          {selectedRole === 'admin' && <AdminDashboard />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">MedChain</h1>
                <p className="text-sm text-slate-600">Secure Healthcare Data Sharing</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                HIPAA Compliant
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Database className="w-3 h-3" />
                Blockchain Secured
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            Revolutionary Healthcare Data Platform
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Secure, compliant, and patient-controlled healthcare data sharing using blockchain technology, 
            zero-knowledge encryption, and smart contracts.
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Next.js + React
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              Ethereum + Hyperledger
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              FHIR/HL7 Compatible
            </span>
          </div>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-0 shadow-md"
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-800">{role.title}</CardTitle>
                  <p className="text-slate-600 text-sm">{role.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6" size="lg">
                    Enter {role.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Technology Stack</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Next.js & React</li>
                <li>Material-UI & Tailwind</li>
                <li>Three.js for 3D</li>
                <li>Node.js Backend</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Blockchain</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Ethereum Smart Contracts</li>
                <li>Hyperledger Fabric</li>
                <li>IPFS Storage</li>
                <li>Zero-Knowledge Proofs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Security</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>AES-256-GCM Encryption</li>
                <li>Biometric Authentication</li>
                <li>JWT Role-Based Access</li>
                <li>Audit Trails</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Compliance</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>HIPAA Compliant</li>
                <li>GDPR Ready</li>
                <li>CCPA Compatible</li>
                <li>FHIR/HL7 Standards</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 MedChain Platform. Secure Healthcare Data Sharing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
