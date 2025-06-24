
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  QrCode, 
  Download, 
  Copy, 
  Clock, 
  Shield, 
  Share,
  RefreshCw,
  Smartphone
} from "lucide-react";

const QRGenerator = () => {
  const [qrType, setQrType] = useState('emergency');
  const [duration, setDuration] = useState('24');
  const [permissions, setPermissions] = useState(['medical-history', 'vitals']);
  const [generatedQR, setGeneratedQR] = useState(null);

  const qrTypes = [
    { value: 'emergency', label: 'Emergency Access', description: 'For emergency medical situations' },
    { value: 'appointment', label: 'Appointment Access', description: 'For scheduled doctor visits' },
    { value: 'specialist', label: 'Specialist Access', description: 'For specialist consultations' },
    { value: 'temporary', label: 'Temporary Access', description: 'For one-time data sharing' }
  ];

  const permissionOptions = [
    { id: 'medical-history', label: 'Medical History' },
    { id: 'medications', label: 'Current Medications' },
    { id: 'allergies', label: 'Allergies' },
    { id: 'vitals', label: 'Vital Signs' },
    { id: 'lab-results', label: 'Lab Results' },
    { id: 'imaging', label: 'Medical Imaging' },
    { id: 'emergency-contacts', label: 'Emergency Contacts' }
  ];

  const generateQR = () => {
    // Mock QR generation
    const mockQRData = {
      id: `QR-${Date.now()}`,
      type: qrType,
      duration: duration,
      permissions: permissions,
      created: new Date().toISOString(),
      expires: new Date(Date.now() + parseInt(duration) * 60 * 60 * 1000).toISOString()
    };
    setGeneratedQR(mockQRData);
  };

  const copyQRCode = () => {
    if (generatedQR) {
      navigator.clipboard.writeText(JSON.stringify(generatedQR));
    }
  };

  const togglePermission = (permissionId: string) => {
    setPermissions(prev => 
      prev.includes(permissionId) 
        ? prev.filter(p => p !== permissionId)
        : [...prev, permissionId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-slate-800">QR Code Generator</h3>
        <p className="text-slate-600">Generate secure QR codes for quick data access</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* QR Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Configure Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Access Type</label>
              <Select value={qrType} onValueChange={setQrType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {qrTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-slate-500">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Duration (hours)</label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Hour</SelectItem>
                  <SelectItem value="6">6 Hours</SelectItem>
                  <SelectItem value="24">24 Hours</SelectItem>
                  <SelectItem value="72">72 Hours</SelectItem>
                  <SelectItem value="168">1 Week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Data Permissions</label>
              <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                {permissionOptions.map(option => (
                  <label key={option.id} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={permissions.includes(option.id)}
                      onChange={() => togglePermission(option.id)}
                      className="rounded"
                    />
                    <span className="text-sm text-slate-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button onClick={generateQR} className="w-full">
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Generated QR Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Generated QR Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            {generatedQR ? (
              <div className="space-y-4">
                {/* Mock QR Code Display */}
                <div className="aspect-square bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center">
                  <div className="w-48 h-48 bg-slate-900 rounded-lg flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">QR ID:</span>
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded">{generatedQR.id}</code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Type:</span>
                    <Badge variant="outline">{qrTypes.find(t => t.value === generatedQR.type)?.label}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Expires:</span>
                    <span className="text-xs text-slate-500">
                      {new Date(generatedQR.expires).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyQRCode}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            ) : (
              <div className="aspect-square border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-500">Configure and generate your QR code</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active QR Codes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Active QR Codes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Mock active QR codes */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-semibold text-slate-800">Emergency Access QR</h4>
                <p className="text-sm text-slate-600">Created: 2 hours ago • Expires: in 22 hours</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Active</Badge>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-semibold text-slate-800">Appointment Access QR</h4>
                <p className="text-sm text-slate-600">Created: 1 day ago • Expires: in 5 hours</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Expiring Soon</Badge>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-semibold text-blue-800">Security Features</h4>
              <p className="text-sm text-blue-600">
                QR codes are time-limited, permission-scoped, and traceable. 
                All access attempts are logged on the blockchain for your security.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRGenerator;
