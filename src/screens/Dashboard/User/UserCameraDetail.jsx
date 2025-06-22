import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import camerasData from '../../../data/camerasData';
import AdminLayout from '../../../components/layouts/AdminLayout';
import StatusBadge from '../../../components/ui/StatusBadge';
import { Button } from '../../../components/ui/button';

const UserCameraDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const obra = user?.obraVinculada;

  const camera = camerasData.find(cam => String(cam.id) === String(id));

  if (!camera || camera.obra !== obra) {
    return (
      <AdminLayout pageTitle="Câmeras">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Acesso negado</h2>
          <p className="text-gray-600 mb-6">Você não tem permissão para visualizar esta câmera.</p>
          <Button onClick={() => navigate(-1)} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold">
            Voltar
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle="Câmeras">
      <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Obra {camera.obra} - {camera.nome}</h2>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold"
          >
            Voltar
          </Button>
        </div>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                {['Obra', 'Setor', 'Nome da Câmera', 'Status', 'Última Atividade'].map((header) => (
                  <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{camera.obra}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{camera.setor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{camera.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={camera.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{camera.ultimaAtividade}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-1 min-h-0">
          {camera.status === 'Ativo' ? (
            <img 
              src="https://i.imgur.com/O6S3D43.jpeg" 
              alt={`Feed da ${camera.nome}`} 
              className="w-full h-full object-cover rounded-lg shadow-inner"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center p-4">
              <p className="text-white text-xl md:text-2xl font-semibold text-center">
                The image you are requesting does not exist or is no longer available.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserCameraDetail; 