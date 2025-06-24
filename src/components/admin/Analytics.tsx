
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  Users, 
  Activity, 
  Shield, 
  Clock,
  TrendingUp,
  TrendingDown,
  Eye,
  Database
} from "lucide-react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const metrics = {
    totalUsers: { value: 1247, change: 12, trend: 'up' },
    activePatients: { value: 892, change: -3, trend: 'down' },
    dataAccess: { value: 15634, change: 28, trend: 'up' },
    securityEvents: { value: 23, change: -45, trend: 'down' }
  };

  const accessPatterns = [
    { time: '00:00', accesses: 45 },
    { time: '04:00', accesses: 12 },
    { time: '08:00', accesses: 234 },
    { time: '12:00', accesses: 456 },
    { time: '16:00', accesses: 389 },
    { time: '20:00', accesses: 123 }
  ];

  const topAccessedData = [
    { type: 'Medical History', accesses: 2341, percentage: 34 },
    { type: 'Lab Results', accesses: 1892, percentage: 27 },
    { type: 'Prescriptions', accesses: 1456, percentage: 21 },
    { type: 'Vital Signs', accesses: 823, percentage: 12 },
    { type: 'Imaging', accesses: 412, percentage: 6 }
  ];

  const departmentUsage = [
    { department: 'Emergency', users: 89, accesses: 3245, avgSessionTime: '12m' },
    { department: 'Cardiology', users: 45, accesses: 2891, avgSessionTime: '18m' },
    { department: 'Primary Care', users: 123, accesses: 2456, avgSessionTime: '15m' },
    { department: 'Radiology', users: 34, accesses: 1823, avgSessionTime: '22m' },
    { department: 'Surgery', users: 67, accesses: 1567, avgSessionTime: '25m' }
  ];

  const complianceMetrics = [
    { metric: 'HIPAA Compliance', score: 98.5, status: 'Excellent' },
    { metric: 'Data Encryption', score: 100, status: 'Excellent' },
    { metric: 'Access Logging', score: 99.2, status: 'Excellent' },
    { metric: 'Audit Trail', score: 96.8, status: 'Good' },
    { metric: 'Incident Response', score: 94.5, status: 'Good' }
  ];

  const blockchainStats = [
    { metric: 'Total Transactions', value: '1,234,567', change: '+2.3%' },
    { metric: 'Smart Contracts', value: '456', change: '+12.5%' },
    { metric: 'Consent Records', value: '78,901', change: '+5.7%' },
    { metric: 'Network Uptime', value: '99.9%', change: '0%' }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Analytics Dashboard</h3>
          <p className="text-slate-600">Comprehensive system analytics and insights</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Users</p>
                <p className="text-2xl font-bold text-slate-800">{metrics.totalUsers.value.toLocaleString()}</p>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(metrics.totalUsers.trend)}`}>
                  {getTrendIcon(metrics.totalUsers.trend)}
                  <span>{metrics.totalUsers.change}%</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Patients</p>
                <p className="text-2xl font-bold text-slate-800">{metrics.activePatients.value.toLocaleString()}</p>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(metrics.activePatients.trend)}`}>
                  {getTrendIcon(metrics.activePatients.trend)}
                  <span>{Math.abs(metrics.activePatients.change)}%</span>
                </div>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Data Accesses</p>
                <p className="text-2xl font-bold text-slate-800">{metrics.dataAccess.value.toLocaleString()}</p>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(metrics.dataAccess.trend)}`}>
                  {getTrendIcon(metrics.dataAccess.trend)}
                  <span>{metrics.dataAccess.change}%</span>
                </div>
              </div>
              <Eye className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Security Events</p>
                <p className="text-2xl font-bold text-slate-800">{metrics.securityEvents.value}</p>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(metrics.securityEvents.trend)}`}>
                  {getTrendIcon(metrics.securityEvents.trend)}
                  <span>{Math.abs(metrics.securityEvents.change)}%</span>
                </div>
              </div>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Access Patterns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Daily Access Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {accessPatterns.map((pattern, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div 
                    className="bg-blue-500 w-8 rounded-t-sm"
                    style={{ height: `${(pattern.accesses / 500) * 200}px` }}
                  ></div>
                  <span className="text-xs text-slate-500 transform -rotate-45">{pattern.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-slate-600">
              Peak usage: 12:00 PM (456 accesses)
            </div>
          </CardContent>
        </Card>

        {/* Top Accessed Data Types */}
        <Card>
          <CardHeader>
            <CardTitle>Most Accessed Data Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topAccessedData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-800">{data.type}</span>
                      <span className="text-sm font-semibold text-slate-600">{data.accesses.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${data.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Department Usage Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Department</th>
                  <th className="text-left p-3">Active Users</th>
                  <th className="text-left p-3">Total Accesses</th>
                  <th className="text-left p-3">Avg Session Time</th>
                  <th className="text-left p-3">Activity Level</th>
                </tr>
              </thead>
              <tbody>
                {departmentUsage.map((dept, index) => (
                  <tr key={index} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-medium">{dept.department}</td>
                    <td className="p-3">{dept.users}</td>
                    <td className="p-3">{dept.accesses.toLocaleString()}</td>
                    <td className="p-3">{dept.avgSessionTime}</td>
                    <td className="p-3">
                      <Badge variant={dept.accesses > 2500 ? 'default' : dept.accesses > 2000 ? 'secondary' : 'outline'}>
                        {dept.accesses > 2500 ? 'High' : dept.accesses > 2000 ? 'Medium' : 'Low'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Compliance & Security Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {complianceMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">{metric.metric}</h4>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                    {metric.score}%
                  </span>
                  <Badge variant={metric.status === 'Excellent' ? 'default' : 'secondary'}>
                    {metric.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Blockchain Network Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {blockchainStats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-1">{stat.metric}</h4>
                <p className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.change}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Performance */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">System Performance Summary</h4>
              <p className="text-sm text-green-600">
                All systems operational. Average response time: 245ms. 
                Blockchain sync: 100%. Security score: 98.5/100.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
