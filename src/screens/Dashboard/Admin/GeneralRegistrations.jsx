import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { Button } from '../../../components/ui/button';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';
import obrasData from '../../../data/obrasData';
import setoresData from '../../../data/setoresData';

// O arquivo generalRegistrationsData.js não será mais usado.

const GeneralRegistrations = () => {
  const [activeTab, setActiveTab] = useState('obras');

  // Lógica comum de paginação e exclusão pode ser abstraída para um hook customizado no futuro.
  // Por enquanto, duplicamos a lógica para clareza.

  // --- ESTADO E LÓGICA PARA OBRAS ---
  const [obras, setObras] = useState(obrasData);
  const [obrasCurrentPage, setObrasCurrentPage] = useState(1);
  const [obrasItemsPerPage] = useState(8);
  const [obrasSearchTerm, setObrasSearchTerm] = useState('');
  const [obraToDelete, setObraToDelete] = useState(null);

  const filteredObras = useMemo(() => {
    return obras.filter(o => o.nome.toLowerCase().includes(obrasSearchTerm.toLowerCase()));
  }, [obras, obrasSearchTerm]);

  const obrasTotalPages = Math.ceil(filteredObras.length / obrasItemsPerPage);
  const obrasCurrentItems = filteredObras.slice((obrasCurrentPage - 1) * obrasItemsPerPage, obrasCurrentPage * obrasItemsPerPage);

  const handleDeleteObra = () => {
    if (obraToDelete) {
      setObras(obras.filter(o => o.id !== obraToDelete.id));
      setObraToDelete(null);
    }
  };


  // --- ESTADO E LÓGICA PARA SETORES ---
  const [setores, setSetores] = useState(setoresData);
  const [setoresCurrentPage, setSetoresCurrentPage] = useState(1);
  const [setoresItemsPerPage] = useState(8);
  const [setoresSearchTerm, setSetoresSearchTerm] = useState('');
  const [setorToDelete, setSetorToDelete] = useState(null);

  const filteredSetores = useMemo(() => {
    return setores.filter(s => s.nome.toLowerCase().includes(setoresSearchTerm.toLowerCase()));
  }, [setores, setoresSearchTerm]);

  const setoresTotalPages = Math.ceil(filteredSetores.length / setoresItemsPerPage);
  const setoresCurrentItems = filteredSetores.slice((setoresCurrentPage - 1) * setoresItemsPerPage, setoresCurrentPage * setoresItemsPerPage);
  
  const handleDeleteSetor = () => {
    if (setorToDelete) {
      setSetores(setores.filter(s => s.id !== setorToDelete.id));
      setSetorToDelete(null);
    }
  };

  const renderObrasTable = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-semibold">
          <Link to="/admin/general-registrations/obra/new">Cadastrar Obra</Link>
        </Button>
        <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Buscar Obra..." value={obrasSearchTerm} onChange={(e) => setObrasSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"/>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full w-full divide-y divide-gray-200 bg-white rounded-xl shadow-sm border">
          <thead className="bg-[#f3f4f6]">
            <tr>
              {['Nome da Obra', 'Endereço', 'Término', 'Ações'].map(h => <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {obrasCurrentItems.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.endereco}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.termino}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-4">
                    <Link to={`/admin/general-registrations/obra/${item.id}/edit`} className="text-blue-600 hover:text-blue-800"><FiEdit size={18} /></Link>
                    <button onClick={() => setObraToDelete(item)} className="text-red-600 hover:text-red-800"><FiTrash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Paginação para Obras */}
    </>
  );

  const renderSetoresTable = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-semibold">
          <Link to="/admin/general-registrations/setor/new">Cadastrar Setor</Link>
        </Button>
         <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Buscar Setor..." value={setoresSearchTerm} onChange={(e) => setSetoresSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"/>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full w-full divide-y divide-gray-200 bg-white rounded-xl shadow-sm border">
          <thead className="bg-[#f3f4f6]">
            <tr>
              {['Nome do Setor', 'Obra Vinculada', 'Ações'].map(h => <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {setoresCurrentItems.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.obra}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-4">
                    <Link to={`/admin/general-registrations/setor/${item.id}/edit`} className="text-blue-600 hover:text-blue-800"><FiEdit size={18} /></Link>
                    <button onClick={() => setSetorToDelete(item)} className="text-red-600 hover:text-red-800"><FiTrash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {/* Paginação para Setores */}
    </>
  );

  return (
    <AdminLayout pageTitle="Cadastros Gerais">
      <div className="bg-[#f9fafb] p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200 w-full">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Cadastros Gerais</h2>
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-6">
            <button
              onClick={() => setActiveTab('obras')}
              className={`py-3 px-1 whitespace-nowrap border-b-2 font-medium text-sm transition-colors
                ${activeTab === 'obras'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Obras
            </button>
            <button
              onClick={() => setActiveTab('setores')}
              className={`py-3 px-1 whitespace-nowrap border-b-2 font-medium text-sm transition-colors
                ${activeTab === 'setores'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Setores
            </button>
          </nav>
        </div>
        
        {activeTab === 'obras' ? renderObrasTable() : renderSetoresTable()}
      </div>

      <ConfirmationModal
        isOpen={!!obraToDelete || !!setorToDelete}
        onClose={() => { setObraToDelete(null); setSetorToDelete(null); }}
        onConfirm={activeTab === 'obras' ? handleDeleteObra : handleDeleteSetor}
        title="Deseja realmente excluir?"
        confirmText="Excluir"
      />
    </AdminLayout>
  );
};

export default GeneralRegistrations; 