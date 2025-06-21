import React from 'react';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Ativo: 'bg-green-100 text-green-700',
    Offline: 'bg-red-100 text-red-700',
    Manutenção: 'bg-yellow-100 text-yellow-700',
    Conectado: 'bg-green-100 text-green-700',
    Desativado: 'bg-red-100 text-red-700',
    Desconectado: 'bg-yellow-100 text-yellow-700',
  };

  const style = statusStyles[status] || 'bg-gray-100 text-gray-700';

  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${style}`}>
      {status}
    </span>
  );
};

export default StatusBadge; 