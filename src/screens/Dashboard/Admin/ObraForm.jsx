import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { Button } from '../../../components/ui/button';
import obrasData from '../../../data/obrasData';

const ObraForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    dataInicio: '',
    previsaoTermino: '',
    descricao: '',
  });

  useEffect(() => {
    if (isEditMode) {
      const obraToEdit = obrasData.find(o => o.id === parseInt(id));
      if (obraToEdit) {
        setFormData({
          nome: obraToEdit.nome || '',
          endereco: obraToEdit.endereco || '',
          dataInicio: obraToEdit.dataInicio || '', // Supondo que o formato já venha correto
          previsaoTermino: obraToEdit.termino || '',
          descricao: obraToEdit.descricao || '',
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
      console.log('Dados da Obra para ATUALIZAR:', formData);
    } else {
      console.log('Dados da Obra para SALVAR:', formData);
    }
    navigate('/admin/general-registrations');
  };

  return (
    <AdminLayout pageTitle={isEditMode ? "Editar Obra" : "Cadastrar Obra"}>
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-800">{isEditMode ? "Editar Obra" : "Cadastro da Obra"}</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Nome da Obra */}
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome da Obra</label>
              <input type="text" name="nome" id="nome" value={formData.nome} onChange={handleChange} placeholder="Digite o nome da obra" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>

            {/* Endereço */}
            <div>
              <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <input type="text" name="endereco" id="endereco" value={formData.endereco} onChange={handleChange} placeholder="Digite o endereço completo" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>

            {/* Data de Início */}
            <div>
              <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
              <InputMask
                mask="99/99/9999"
                value={formData.dataInicio}
                onChange={handleChange}
                name="dataInicio"
              >
                {(inputProps) => <input {...inputProps} type="text" id="dataInicio" placeholder="__/__/____" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />}
              </InputMask>
            </div>

            {/* Previsão de Término */}
            <div>
              <label htmlFor="previsaoTermino" className="block text-sm font-medium text-gray-700 mb-1">Previsão de Término</label>
              <InputMask
                mask="99/99/9999"
                value={formData.previsaoTermino}
                onChange={handleChange}
                name="previsaoTermino"
              >
                {(inputProps) => <input {...inputProps} type="text" id="previsaoTermino" placeholder="__/__/____" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />}
              </InputMask>
            </div>

            {/* Descrição */}
            <div className="md:col-span-2">
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea name="descricao" id="descricao" value={formData.descricao} onChange={handleChange} rows="4" placeholder="Digite uma descrição (opcional)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
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

export default ObraForm; 