import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { Button } from '../../../components/ui/button';
import setoresData from '../../../data/setoresData';
import obrasData from '../../../data/obrasData';

const SetorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    nome: '',
    obraVinculada: '',
    descricao: '',
  });

  // A lista de obras para o dropdown virá de seus próprios dados
  const obras = obrasData.map(o => o.nome);

  useEffect(() => {
    if (isEditMode) {
      const setorToEdit = setoresData.find(s => s.id === parseInt(id));
      if (setorToEdit) {
        setFormData({
          nome: setorToEdit.nome || '',
          obraVinculada: setorToEdit.obra || '',
          descricao: setorToEdit.descricao || '',
        });
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      console.log('Dados do Setor para ATUALIZAR:', formData);
    } else {
      console.log('Dados do Setor para SALVAR:', formData);
    }
    navigate('/admin/general-registrations');
  };

  const inputStyle = "w-full h-10 px-4 py-2 text-base border border-[#DFEAF2] rounded-lg focus:outline-none focus:ring-0 focus:border-[#03A650]";

  return (
    <AdminLayout pageTitle={isEditMode ? "Editar Setor" : "Cadastrar Setor"}>
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-800">{isEditMode ? "Editar Setor" : "Cadastro do Setor"}</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Nome do Setor */}
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome do Setor</label>
              <input type="text" name="nome" id="nome" value={formData.nome} onChange={handleChange} placeholder="Digite o nome do setor" className={inputStyle} />
            </div>

            {/* Obra Vinculada */}
            <div>
              <label htmlFor="obraVinculada" className="block text-sm font-medium text-gray-700 mb-1">Obra Vinculada</label>
              <select name="obraVinculada" id="obraVinculada" value={formData.obraVinculada} onChange={handleChange} className={inputStyle}>
                <option value="">Selecione a obra</option>
                {obras.map(obra => <option key={obra} value={obra}>{obra}</option>)}
              </select>
            </div>

            {/* Descrição */}
            <div className="md:col-span-2">
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea name="descricao" id="descricao" value={formData.descricao} onChange={handleChange} rows="4" placeholder="Digite uma descrição (opcional)" className={inputStyle}></textarea>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-4 mt-8">
            <Button type="button" variant="outline" onClick={() => navigate('/admin/general-registrations')} className="px-8 py-2 rounded-lg border-gray-300 text-gray-700 font-semibold hover:bg-gray-100">
              Cancelar
            </Button>
            <Button type="submit" className="px-8 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default SetorForm; 