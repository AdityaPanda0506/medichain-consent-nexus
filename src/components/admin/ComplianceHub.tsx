
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  FileText, 
  Download, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  BarChart3,
  Activity
} from "lucide-react";

const ComplianceHub = () => {
  const [selectedStandard, setSelectedStandard] = useState('hipaa');

  const complianceStandards = [
    {
      id: 'hipaa',
      name: 'HIPAA',
      score: 98.5,
      status: 'Compliant',
      lastAudit: '2024-06-15',
      nextAudit: '2024-12-15',
      issues: 2,
      requirements: [
        { name: 'Administrative Safeguards', status: 'Compliant', score: 100 },
        { name: 'Physical Safeguards', status: 'Compliant', score: 95 },
        { name: 'Technical Safeguards', status: 'Minor Issues', score: 92 },
        { name: 'Breach Notification', status: 'Compliant', score: 100 },
        { name: 'Risk Assessment', status: 'Compliant', score: 98 }
      ]
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      score: 94.2,
      status: 'Compliant',
      lastAudit: '2024-05-20',
      nextAudit: '2024-11-20',
      issues: 5,
      requirements: [
        { name: 'Data Protection Impact Assessment', status: 'Compliant', score: 96 },
        { name: 'Right to be Forgotten', status: 'Compliant', score: 100 },
        { name: 'Data Portability', status: 'Minor Issues', score: 88 },
        { name: 'Consent Management', status: 'Compliant', score: 95 },
        { name: 'Privacy by Design', status: 'Compliant', score: 92 }
      ]
    },
    {
      id: 'ccpa',
      name: 'CCPA',
      score: 96.8,
      status: 'Compliant',
      lastAudit: '2024-06-01',
      nextAudit: '2024-12-01',
      issues: 1,
      requirements: [
        { name: 'Consumer Rights', status: 'Compliant', score: 98 },
        { name: 'Data Disclosure', status: 'Compliant', score: 100 },
        { name: 'Opt-Out Mechanisms', status: 'Compliant', score: 95 },
        { name: 'Non-Discrimination', status: 'Compliant', score: 94 },
        { name: 'Third-Party Sharing', status: 'Minor Issues', score: 90 }
      ]
    }
  ];

  const auditLogs = [
    {
      date: '2024-06-20',
      type: 'HIPAA Compliance Check',
      result: 'Passed',
      issues: 0,
      auditor: 'Automated System'
    },
    {
      date: '2024-06-15',
      type: 'GDPR Assessment',
      result: 'Minor Issues',
      issues: 2,
      auditor: 'External Auditor'
    },
    {
      date: '2024-06-10',
      type: 'Security Audit',
      result: 'Passed',
      issues: 0,
      auditor: 'Internal Team'
    },
    {
      date: '2024-06-05',
      type: 'Access Control Review',
      result: 'Action Required',
      issues: 3,
      auditor: 'Compliance Officer'
    }
  ];

  const riskAreas = [
    {
      area: 'Data Encryption',
      risk: 'Low',
      lastCheck: '2024-06-20',
      status: 'All data encrypted with AES-256'
    },
    {
      area: 'Access Controls',
      risk: 'Medium',
      lastCheck: '2024-06-18',
      status: '3 users require MFA setup'
    },
    {
      area: 'Audit Logging',
      risk: 'Low',
      lastCheck: '2024-06-20',
      status: 'All access logged and monitored'
    },
    {
      area: 'Data Retention',
      risk: 'High',
      lastCheck: '2024-06-15',
      status: '12 records past retention period'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': case 'Passed': return 'bg-green-100 text-green-800';
      case 'Minor Issues': return 'bg-yellow-100 text-yellow-800';
      case 'Action Required': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const selectedStandardData = complianceStandards.find(s => s.id === selectedStandard);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Compliance Hub</h3>
          <p className="text-slate-600">Monitor regulatory compliance and audit status</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Audit Logs
          </Button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        {complianceStandards.map((standard) => (
          <Card 
            key={standard.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedStandard === standard.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedStandard(standard.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-slate-800">{standard.name}</h4>
                <Badge className={getStatusColor(standard.status)}>
                  {standard.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Compliance Score</span>
                  <span className="font-bold text-2xl text-blue-600">{standard.score}%</span>
                </div>
                <Progress value={standard.score} className="h-2" />
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Issues: {standard.issues}</span>
                  <span>Next audit: {standard.nextAudit}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Compliance View */}
      {selectedStandardData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {selectedStandardData.name} Compliance Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-slate-700 mb-3">Overall Score</h4>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{selectedStandardData.score}%</div>
                  <Badge className={getStatusColor(selectedStandardData.status)}>
                    {selectedStandardData.status}
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-3">Audit Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Last Audit:</span>
                    <span className="font-semibold">{selectedStandardData.lastAudit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Audit:</span>
                    <span className="font-semibold">{selectedStandardData.nextAudit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Open Issues:</span>
                    <span className="font-semibold text-red-600">{selectedStandardData.issues}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-700 mb-3">Requirements Breakdown</h4>
              <div className="space-y-3">
                {selectedStandardData.requirements.map((req, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h5 className="font-medium text-slate-800">{req.name}</h5>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={req.score} className="h-2 flex-1" />
                        <span className="text-sm font-semibold text-slate-600">{req.score}%</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(req.status)} variant="outline">
                      {req.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {riskAreas.map((risk, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-800">{risk.area}</h4>
                  <p className="text-sm text-slate-600">{risk.status}</p>
                  <p className="text-xs text-slate-500">Last checked: {risk.lastCheck}</p>
                </div>
                <div className="text-right">
                  <Badge className={getRiskColor(risk.risk)}>
                    {risk.risk} Risk
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Audit Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Audit Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {log.result === 'Passed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{log.type}</h4>
                    <p className="text-sm text-slate-600">By {log.auditor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(log.result)}>
                    {log.result}
                  </Badge>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{log.date}</span>
                  </div>
                  {log.issues > 0 && (
                    <p className="text-xs text-red-600 mt-1">{log.issues} issues found</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Dashboard */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">Regulatory Compliance Dashboard</h4>
              <p className="text-sm text-green-600">
                Real-time monitoring of HIPAA, GDPR, and CCPA compliance. 
                Automated alerts for non-compliance issues and audit requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceHub;
