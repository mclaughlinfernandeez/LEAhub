
import React, { useState } from 'react';
import { Shield, Lock, Activity, Search, Download, Filter } from 'lucide-react';
import { AuditLogEntry } from '../types';

const ComplianceCenter: React.FC = () => {
  const [logs] = useState<AuditLogEntry[]>([
    { id: '1', timestamp: '2023-12-21 14:22:01', user: 'Admin User', action: 'ACCESS', entityType: 'MEDICAL_RECORD', details: 'Viewed records for S-100 (John Smith)', ipAddress: '192.168.1.1' },
    { id: '2', timestamp: '2023-12-21 15:10:45', user: 'Educator 02', action: 'MODIFY', entityType: 'PLAN_504', details: 'Added new accommodation to Plan-001', ipAddress: '192.168.1.52' },
    { id: '3', timestamp: '2023-12-21 16:05:12', user: 'System', action: 'SECURITY', entityType: 'AUTH', details: 'Unauthorized login attempt blocked', ipAddress: '45.12.89.2' },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Security Status</p>
            <p className="text-xl font-bold text-slate-800">Protected</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Lock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Encryption</p>
            <p className="text-xl font-bold text-slate-800">AES-256 Active</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Audit Trails</p>
            <p className="text-xl font-bold text-slate-800">Live Logging</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-800">System Audit Logs</h3>
            <p className="text-xs text-slate-500">Detailed record of all system events and data access.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-sm font-semibold text-slate-600 hover:text-indigo-600">
              <Filter size={16} className="mr-1" /> Filter
            </button>
            <button className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800">
              <Download size={16} className="mr-1" /> Export Report
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">{log.timestamp}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.action === 'SECURITY' ? 'bg-red-100 text-red-700' : 
                      log.action === 'MODIFY' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{log.entityType}</td>
                  <td className="px-6 py-4 text-slate-700">{log.details}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplianceCenter;
