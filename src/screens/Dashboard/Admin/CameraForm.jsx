import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { Button } from '../../../components/ui/button';
import { cameras } from '../../../data/camerasData';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';

const CameraForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    setor: '',
    obra: '',
    ip: '',
    porta: '',
  });

  useEffect(() => {
    if (isEditMode) {
      const cameraToEdit = cameras.find((c) => c.id === parseInt(id));
      if (cameraToEdit) {
        setFormData({
          nome: cameraToEdit.nome,
          descricao: cameraToEdit.descricao || '',
          setor: cameraToEdit.setor,
          obra: cameraToEdit.obra,
          ip: cameraToEdit.ip || 'N/A',
          porta: cameraToEdit.porta || 'N/A',
        });
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      console.log('Atualizando câmera:', id, formData);
      // Aqui ficaria a chamada da API para ATUALIZAR
    } else {
      console.log('Criando nova câmera:', { id: Date.now(), ...formData });
      // Aqui ficaria a chamada da API para CRIAR
    }
    navigate('/admin/cameras');
  };

  // Mock de opções para os selects. Viria da API no futuro.
  const obrasOptions = [...new Set(cameras.map((c) => c.obra))];
  const setoresOptions = [...new Set(cameras.map((c) => c.setor))];

  const Label = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="text-sm font-medium text-green-600 mb-1 block">
      {children}
    </label>
  );

  return (
    <AdminLayout pageTitle="Câmeras">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md h-full">
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <span className="border-green-500 text-green-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg">
              Cadastro
            </span>
          </nav>
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          {isEditMode ? `Editando: ${formData.nome}` : 'Cadastro de Câmeras'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div>
              <Label htmlFor="nome">Nome da Câmera</Label>
              <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Digite um nome para a câmera" required />
            </div>
            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Adicione uma breve descrição (opcional)" />
            </div>
            <div>
              <Label htmlFor="setor">Setor</Label>
              <select id="setor" name="setor" value={formData.setor} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
                <option value="" disabled>Selecione o setor</option>
                {setoresOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="obra">Obra</Label>
              <select id="obra" name="obra" value={formData.obra} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
                <option value="" disabled>Selecione a obra</option>
                {obrasOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="ip">Endereço IP ou URL</Label>
              <Input id="ip" name="ip" value={formData.ip} onChange={handleChange} placeholder="Digite o IP ou URL da câmera" required />
            </div>
            <div>
              <Label htmlFor="porta">Porta</Label>
              <Input id="porta" name="porta" value={formData.porta} onChange={handleChange} placeholder="Ex: 8080, 554" required />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="border-gray-300 text-gray-700 font-semibold">
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 font-semibold">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CameraForm; 