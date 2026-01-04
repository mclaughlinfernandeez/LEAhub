
import React from 'react';
import { Bell, X, Check, AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { AppNotification, AppView } from '../types';

interface NotificationCenterProps {
  notifications: AppNotification[];
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onNavigate: (view: AppView) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  notifications, 
  onClose, 
  onMarkRead, 
  onMarkAllRead,
  onNavigate 
}) => {
  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'warning': return <AlertTriangle size={16} className="text-amber-500" />;
      case 'success': return <CheckCircle size={16} className="text-emerald-500" />;
      case 'error': return <AlertCircle size={16} className="text-red-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-slate-800">Notifications</h3>
          <span className="bg-indigo-100 text-indigo-600 text-[10px] px-1.5 py-0.5 rounded-full font-black">
            {notifications.filter(n => !n.isRead).length} NEW
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onMarkAllRead}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
          >
            Mark all read
          </button>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell size={32} className="mx-auto text-slate-200 mb-3" />
            <p className="text-slate-400 text-sm font-medium">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {notifications.map((n) => (
              <div 
                key={n.id} 
                className={`p-4 flex space-x-4 transition-colors relative group ${!n.isRead ? 'bg-indigo-50/30' : 'hover:bg-slate-50'}`}
              >
                <div className="mt-1">{getIcon(n.type)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-bold ${!n.isRead ? 'text-slate-900' : 'text-slate-600'}`}>
                      {n.title}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {n.message}
                  </p>
                  {n.linkTo && (
                    <button 
                      onClick={() => {
                        onNavigate(n.linkTo!);
                        onMarkRead(n.id);
                        onClose();
                      }}
                      className="text-[10px] font-bold text-indigo-600 hover:underline mt-1"
                    >
                      View Details
                    </button>
                  )}
                </div>
                {!n.isRead && (
                  <button 
                    onClick={() => onMarkRead(n.id)}
                    className="opacity-0 group-hover:opacity-100 absolute right-2 top-2 p-1 text-slate-400 hover:text-indigo-600"
                    title="Mark as read"
                  >
                    <Check size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <button className="text-xs font-bold text-slate-500 hover:text-slate-800">
            View All Alerts
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
