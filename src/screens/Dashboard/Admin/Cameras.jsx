import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { Button } from '../../../components/ui/button';
import { cameras as initialCameras } from '../../../data/camerasData';
import StatusBadge from '../../../components/ui/StatusBadge';
import DropdownFilter from '../../../components/ui/DropdownFilter';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';
import { Search, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const Cameras = () => {
  const [filters, setFilters] = useState({ obra: [], setor: [], status: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [allCameras, setAllCameras] = useState(initialCameras);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cameraToDelete, setCameraToDelete] = useState(null);
  const itemsPerPage = 8;

  const filterOptions = useMemo(() => {
    const obras = [...new Set(allCameras.map((c) => c.obra))];
    const setores = [...new Set(allCameras.map((c) => c.setor))];
    const statuses = [...new Set(allCameras.map((c) => c.status))];
    return { obras, setores, statuses };
  }, [allCameras]);

  const filteredItems = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return allCameras
      .filter(
        (camera) =>
          (filters.obra.length === 0 || filters.obra.includes(camera.obra)) &&
          (filters.setor.length === 0 || filters.setor.includes(camera.setor)) &&
          (filters.status.length === 0 || filters.status.includes(camera.status))
      )
      .filter((camera) =>
        !searchTerm ||
        camera.nome.toLowerCase().includes(lowerCaseSearchTerm) ||
        camera.obra.toLowerCase().includes(lowerCaseSearchTerm) ||
        camera.setor.toLowerCase().includes(lowerCaseSearchTerm)
      );
  }, [filters, searchTerm, allCameras]);
  
  // Reset page to 1 when filters or search term change
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

  const handleDeleteClick = (camera) => {
    setCameraToDelete(camera);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCameraToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (cameraToDelete) {
      setAllCameras(prevCameras => prevCameras.filter(c => c.id !== cameraToDelete.id));
    }
    handleCloseModal();
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
    <AdminLayout pageTitle="Câmeras">
      <div className="bg-[#f9fafb] p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200">
        {/* Título da tabela */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-0">Câmeras Cadastradas</h2>
          <div className="flex items-center gap-4">
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-semibold">
              <Link to="/admin/cameras/new">Cadastrar Câmera</Link>
            </Button>
            <div className="flex items-center gap-2">
              <DropdownFilter label="Obras" options={filterOptions.obras} selected={filters.obra} onSelect={(value) => handleFilterChange('obra', value)} />
              <DropdownFilter label="Setor" options={filterOptions.setores} selected={filters.setor} onSelect={(value) => handleFilterChange('setor', value)} />
              <DropdownFilter label="Status" options={filterOptions.statuses} selected={filters.status} onSelect={(value) => handleFilterChange('status', value)} />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Busque por obra, setor ou nome da câmera" 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-[1010px] w-full divide-y divide-gray-200">
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
                    <div className="flex items-center gap-3">
                      <Link to={`/admin/cameras/${camera.id}`} className="text-blue-600 hover:text-blue-800">
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteClick(camera)}>
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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

export default Cameras; 