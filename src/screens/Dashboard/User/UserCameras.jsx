import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../../AuthContext';
import camerasData from '../../../data/camerasData';
import AdminLayout from '../../../components/layouts/AdminLayout';
import StatusBadge from '../../../components/ui/StatusBadge';
import DropdownFilter from '../../../components/ui/DropdownFilter';
import { Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserCameras = () => {
  const { user } = useAuth();
  const obra = user?.obraVinculada;
  const navigate = useNavigate();

  // Filtra as câmeras da obra vinculada
  const camerasObra = camerasData.filter(cam => cam.obra === obra);

  const [filters, setFilters] = useState({ setor: [], status: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filterOptions = useMemo(() => {
    const setores = [...new Set(camerasObra.map((c) => c.setor))];
    const statuses = [...new Set(camerasObra.map((c) => c.status))];
    return { setores, statuses };
  }, [camerasObra]);

  const filteredItems = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return camerasObra
      .filter(
        (camera) =>
          (filters.setor.length === 0 || filters.setor.includes(camera.setor)) &&
          (filters.status.length === 0 || filters.status.includes(camera.status))
      )
      .filter((camera) =>
        !searchTerm ||
        camera.nome.toLowerCase().includes(lowerCaseSearchTerm) ||
        camera.setor.toLowerCase().includes(lowerCaseSearchTerm)
      );
  }, [filters, searchTerm, camerasObra]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

  const { currentItems, totalPages, startItem, endItem } = useMemo(() => {
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage;
    const endItem = startItem + itemsPerPage;
    const currentItems = filteredItems.slice(startItem, endItem);
    return { currentItems, totalPages, startItem: startItem + 1, endItem: Math.min(endItem, totalItems) };
  }, [currentPage, filteredItems]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => {
      const currentFilterValues = prev[filterName];
      const newFilterValues = currentFilterValues.includes(value)
        ? currentFilterValues.filter(v => v !== value)
        : [...currentFilterValues, value];
      return { ...prev, [filterName]: newFilterValues };
    });
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const createPageButton = (page) => (
      <button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 text-sm rounded-md ${currentPage === page ? 'bg-green-600 text-white' : 'hover:bg-gray-100'}`}>
        {page}
      </button>
    );
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) buttons.push(createPageButton(i));
    } else if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) buttons.push(createPageButton(i));
      buttons.push(<span key="dots-end" className="px-2">...</span>);
      buttons.push(createPageButton(totalPages));
    } else if (currentPage > totalPages - 4) {
      buttons.push(createPageButton(1));
      buttons.push(<span key="dots-start" className="px-2">...</span>);
      for (let i = totalPages - 4; i <= totalPages; i++) buttons.push(createPageButton(i));
    } else {
      buttons.push(createPageButton(1));
      buttons.push(<span key="dots-start" className="px-2">...</span>);
      buttons.push(createPageButton(currentPage - 1));
      buttons.push(createPageButton(currentPage));
      buttons.push(createPageButton(currentPage + 1));
      buttons.push(<span key="dots-end" className="px-2">...</span>);
      buttons.push(createPageButton(totalPages));
    }
    return buttons;
  };

  return (
    <AdminLayout pageTitle={`Câmeras - ${obra}`}>
      <div className="bg-[#f9fafb] p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200">
        {/* Título da tabela */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-0">Câmeras Cadastradas</h2>
          <div className="flex items-center gap-4">
            {/* Sem botão de cadastro para técnico */}
            <div className="flex items-center gap-2">
              <DropdownFilter label="Setor" options={filterOptions.setores} selected={filters.setor} onSelect={(value) => handleFilterChange('setor', value)} />
              <DropdownFilter label="Status" options={filterOptions.statuses} selected={filters.status} onSelect={(value) => handleFilterChange('status', value)} />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Busque por setor ou nome da câmera" 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-[900px] w-full divide-y divide-gray-200">
            <thead className="bg-[#f3f4f6]">
              <tr>
                {['Obra', 'Setor', 'Nome da Câmera', 'Status', 'Última Atividade', 'Ações'].map((header) => (
                  <th key={header} scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentItems.map((camera) => (
                <tr key={camera.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{camera.obra}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{camera.setor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{camera.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={camera.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{camera.ultimaAtividade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      title="Ver detalhes"
                      onClick={() => navigate(`/user/cameras/${camera.id}`)}
                    >
                      <Eye className="w-5 h-5" />
                      <span className="hidden md:inline">Detalhes</span>
                    </button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr><td colSpan={6} className="text-center text-gray-400 py-8">Nenhuma câmera cadastrada para esta obra.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6 gap-4">
          <p className="text-sm text-gray-700">
            Exibindo {startItem} a {endItem} de {filteredItems.length} itens
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50">
              <ChevronLeft className="w-5 h-5" />
            </button>
            {getPaginationButtons()}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserCameras; 