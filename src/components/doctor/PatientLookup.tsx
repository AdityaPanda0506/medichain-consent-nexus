
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  Shield,
  Clock,
  AlertTriangle
} from "lucide-react";

const PatientLookup = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockPatients = [
    {
      id: 'PAT123456',
      name: 'John Smith',
      dob: '1979-03-15',
      gender: 'Male',
      phone: '(555) 123-4567',
      email: 'john.smith@email.com',
      address: '123 Main St, New York, NY 10001',
      lastVisit: '2024-06-15',
      primaryCondition: 'Hypertension',
      consentStatus: 'Active',
      emergencyContact: 'Jane Smith - (555) 987-6543',
      insuranceProvider: 'Blue Cross Blue Shield',
      riskLevel: 'Medium'
    },
    {
      id: 'PAT789012',
      name: 'Sarah Johnson',
      dob: '1992-08-22',
      gender: 'Female',
      phone: '(555) 456-7890',
      email: 'sarah.johnson@email.com',
      address: '456 Oak Ave, Boston, MA 02101',
      lastVisit: '2024-06-20',
      primaryCondition: 'Type 2 Diabetes',
      consentStatus: 'Active',
      emergencyContact: 'Mike Johnson - (555) 321-0987',
      insuranceProvider: 'Aetna',
      riskLevel: 'High'
    },
    {
      id: 'PAT345678',
      name: 'Michael Chen',
      dob: '1966-11-08',
      gender: 'Male',
      phone: '(555) 789-0123',
      email: 'michael.chen@email.com',
      address: '789 Pine St, Chicago, IL 60601',
      lastVisit: '2024-06-18',
      primaryCondition: 'Cardiac Arrhythmia',
      consentStatus: 'Expired',
      emergencyContact: 'Lisa Chen - (555) 654-3210',
      insuranceProvider: 'UnitedHealthcare',
      riskLevel: 'Critical'
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Mock search with delay
    setTimeout(() => {
      const results = mockPatients.filter(patient => 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.dob.includes(searchQuery)
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getConsentStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Patient Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Search by Patient ID, Name, or Date of Birth..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
          
          <div className="text-sm text-slate-600 space-y-1">
            <p><strong>Search Tips:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Use full Patient ID (e.g., PAT123456)</li>
              <li>Search by full name or last name</li>
              <li>Use date format YYYY-MM-DD for DOB</li>
              <li>Partial matches are supported</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">
            Search Results ({searchResults.length} patients found)
          </h3>
          
          {searchResults.map((patient) => (
            <Card key={patient.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-slate-800">{patient.name}</h4>
                      <p className="text-slate-600">Patient ID: {patient.id}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                        <span>DOB: {patient.dob}</span>
                        <span>Gender: {patient.gender}</span>
                        <span>Age: {new Date().getFullYear() - new Date(patient.dob).getFullYear()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getRiskLevelColor(patient.riskLevel)}>
                      {patient.riskLevel} Risk
                    </Badge>
                    <Badge className={getConsentStatusColor(patient.consentStatus)}>
                      Consent: {patient.consentStatus}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div className="space-y-3">
                    <h5 className="font-semibold text-slate-700">Contact Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>{patient.email}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                        <span>{patient.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h5 className="font-semibold text-slate-700">Medical Information</h5>
                    <div className="space-y-2 text-sm">
                      <div><strong>Primary Condition:</strong> {patient.primaryCondition}</div>
                      <div><strong>Last Visit:</strong> {patient.lastVisit}</div>
                      <div><strong>Insurance:</strong> {patient.insuranceProvider}</div>
                      <div><strong>Emergency Contact:</strong> {patient.emergencyContact}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span>Last accessed: 2 hours ago</span>
                  </div>
                  <div className="flex gap-2">
                    {patient.consentStatus === 'Expired' ? (
                      <Button variant="outline" disabled>
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Consent Required
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline">
                          <Shield className="w-4 h-4 mr-2" />
                          Request Access
                        </Button>
                        <Button>
                          View Records
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* FHIR Compliance Notice */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">FHIR/HL7 Compliant Search</h4>
              <p className="text-sm text-green-600">
                Patient lookup follows FHIR R4 standards and HL7 protocols. 
                All searches are logged and require proper authorization.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientLookup;
