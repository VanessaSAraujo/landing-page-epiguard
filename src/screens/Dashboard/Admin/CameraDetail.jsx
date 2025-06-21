import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { Button } from '../../../components/ui/button';
import { cameras } from '../../../data/camerasData';
import StatusBadge from '../../../components/ui/StatusBadge';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';
import { Pencil, Trash2 } from 'lucide-react';

const CameraDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const camera = cameras.find((c) => c.id === parseInt(id));
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // Lógica de exclusão (aqui simulada, será chamada da API)
    console.log(`Câmera com ID ${camera.id} excluída.`);
    setIsModalOpen(false);
    navigate('/admin/cameras'); // Redireciona para a lista
  };

  if (!camera) {
    return (
      <AdminLayout pageTitle="Câmera não encontrada">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-xl text-gray-700">A câmera que você está procurando não foi encontrada.</p>
          <Button onClick={() => navigate('/admin/cameras')} className="mt-4 bg-green-600 hover:bg-green-700">
            Voltar para a lista de câmeras
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle="Câmeras">
      <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">{`Obra ${camera.obra} - ${camera.nome}`}</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/cameras')}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold"
          >
            Voltar
          </Button>
        </div>

        {/* Camera Info Table */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                {['Obra', 'Setor', 'Nome da Câmera', 'Status', 'Última Atividade', 'Ações'].map((header) => (
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => navigate(`/admin/cameras/${camera.id}/edit`)}>
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800" onClick={handleDeleteClick}>
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Camera Feed */}
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
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Deseja excluir?"
        confirmText="Excluir"
        cancelText="Cancelar"
      />
    </AdminLayout>
  );
};

export default CameraDetail; 