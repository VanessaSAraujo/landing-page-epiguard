import React from 'react';
import { Info, AlertTriangle } from 'lucide-react';

const Notification = ({ message, show, type = 'success' }) => {
  if (!show) {
    return null;
  }

  const isError = type === 'error';
  
  const colorClass = isError ? 'text-red-500' : 'text-[#03a650]';
  const Icon = isError ? AlertTriangle : Info;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 flex flex-col items-center gap-4 w-11/12 max-w-sm">
        <Icon className={`w-8 h-8 ${colorClass}`} />
        {/* <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#03a650]">
        </div> */}
        <p className={`text-lg font-semibold ${colorClass} text-center`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default Notification; 