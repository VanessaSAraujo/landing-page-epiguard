import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { Button } from '../../../components/ui/button';
import DropdownFilter from '../../../components/ui/DropdownFilter';
import StatusBadge from '../../../components/ui/StatusBadge';
import usersData from '../../../data/usersData'; 
import ConfirmationModal from '../../../components/ui/ConfirmationModal';

const Users = () => {
  const [items, setItems] = useState(usersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedObras, setSelectedObras] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const obrasOptions = [...new Set(items.map(item => item.obra))].map(obra => ({ id: obra, name: obra }));
  const statusOptions = [...new Set(items.map(item => item.status))].map(status => ({ id: status, name: status }));

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const searchTermMatch = item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.email.toLowerCase().includes(searchTerm.toLowerCase());
      const obraMatch = selectedObras.length === 0 || selectedObras.includes(item.obra);
      const statusMatch = selectedStatus.length === 0 || selectedStatus.includes(item.status);
      return searchTermMatch && obraMatch && statusMatch;
    });
  }, [items, searchTerm, selectedObras, selectedStatus]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredItems.length);
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPagination = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    range.push(1);
    if (totalPages > 1) {
      for (let i = currentPage - delta; i <= currentPage + delta; i++) {
        if (i > 1 && i < totalPages) {
          range.push(i);
        }
      }
      range.push(totalPages);
    }

    const uniqueRange = [...new Set(range)];

    for (let i of uniqueRange) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setIsModalOpen(false);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      setItems(items.filter(item => item.id !== userToDelete.id));
      closeDeleteModal();
    }
  };

  return (
    <AdminLayout pageTitle="Usuários">
      <div className="bg-[#f9fafb] p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-0">Usuários</h2>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-semibold flex-grow md:flex-grow-0">
                <Link to="/admin/users/new">
                  Cadastrar Usuário
                </Link>
              </Button>
              <DropdownFilter
                label="Obras"
                options={obrasOptions.map(o => o.name)}
                selected={selectedObras}
                onSelect={(obra) => {
                  const newSelection = selectedObras.includes(obra)
                    ? selectedObras.filter(o => o !== obra)
                    : [...selectedObras, obra];
                  setSelectedObras(newSelection);
                }}
              />
              <DropdownFilter
                label="Status"
                options={statusOptions.map(s => s.name)}
                selected={selectedStatus}
                onSelect={(status) => {
                  const newSelection = selectedStatus.includes(status)
                    ? selectedStatus.filter(s => s !== status)
                    : [...selectedStatus, status];
                  setSelectedStatus(newSelection);
                }}
              />
            </div>
            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou e-mail"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="min-w-[1010px] w-full divide-y divide-gray-200 bg-white rounded-xl shadow-sm border border-gray-100">
            <thead className="bg-[#f3f4f6]">
              <tr>
                {['Obra', 'Nome', 'E-mail', 'Status', 'Último Acesso', 'Ações'].map((header) => (
                  <th key={header} scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{user.obra}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.ultimoAcesso}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-4">
                      <Link to={`/admin/users/${user.id}/edit`} className="text-blue-600 hover:text-blue-800">
                        <FiEdit size={18} />
                      </Link>
                      <button 
                        onClick={() => openDeleteModal(user)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6 gap-4">
          <p className="text-sm text-gray-700">
            Exibindo {startItem} a {endItem} de {filteredItems.length} itens
          </p>
          {totalPages > 1 && (
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50"
              >
                &lt;
              </button>
              {getPagination().map((page, index) => (
                <button
                  key={index}
                  onClick={() => page !== '...' && handlePageChange(page)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    currentPage === page ? 'bg-green-600 text-white' : 'border border-gray-300'
                  } ${page === '...' ? 'cursor-default' : ''}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteUser}
        title="Deseja excluir?"
        confirmText="Excluir"
        cancelText="Cancelar"
      />
    </AdminLayout>
  );
};

export default Users; 