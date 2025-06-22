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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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

  const validate = (fieldData = formData) => {
    const newErrors = {};
    if (!fieldData.nome) newErrors.nome = 'O nome da câmera é obrigatório.';
    if (!fieldData.setor) newErrors.setor = 'É obrigatório selecionar um setor.';
    if (!fieldData.obra) newErrors.obra = 'É obrigatório selecionar uma obra.';
    if (!fieldData.ip) newErrors.ip = 'O endereço IP ou URL é obrigatório.';
    if (!fieldData.porta) newErrors.porta = 'A porta é obrigatória.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: newErrors[name] });
    }
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);
    setTouched({
      nome: true,
      setor: true,
      obra: true,
      ip: true,
      porta: true,
    });
    
    if (Object.keys(newErrors).length > 0) {
      console.log('Formulário com erros, não foi possível salvar.');
      return;
    }
    
    if (isEditMode) {
      console.log('Atualizando câmera:', id, formData);
    } else {
      console.log('Criando nova câmera:', { id: Date.now(), ...formData });
    }
    navigate('/admin/cameras');
  };

  // Mock de opções para os selects. Viria da API no futuro.
  const obrasOptions = [...new Set(cameras.map((c) => c.obra))];
  const setoresOptions = [...new Set(cameras.map((c) => c.setor))];

  const Label = ({ htmlFor, children, required }) => (
    <label htmlFor={htmlFor} className="text-sm font-medium text-green-600 mb-1 block">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const inputStyle = (hasError) => 
    `w-full h-10 px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-0 bg-white ${
      hasError 
        ? 'border-red-500' 
        : 'border-[#DFEAF2] focus:border-[#03A650]'
    }`;

  const ErrorMessage = ({ children }) => (
    <p className="text-xs text-red-500 mt-1">{children}</p>
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
        
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <Label htmlFor="nome" required>Nome da Câmera</Label>
              <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} onBlur={handleBlur} placeholder="Digite um nome para a câmera" className={inputStyle(touched.nome && errors.nome)} />
              {touched.nome && errors.nome && <ErrorMessage>{errors.nome}</ErrorMessage>}
            </div>
            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Adicione uma breve descrição (opcional)" className="w-full h-10 px-4 py-2 text-base border border-[#DFEAF2] rounded-lg focus:outline-none focus:ring-0 focus:border-[#03A650] bg-white" />
            </div>
            <div>
              <Label htmlFor="setor" required>Setor</Label>
              <select id="setor" name="setor" value={formData.setor} onChange={handleChange} onBlur={handleBlur} className={inputStyle(touched.setor && errors.setor)}>
                <option value="" disabled>Selecione o setor</option>
                {setoresOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              {touched.setor && errors.setor && <ErrorMessage>{errors.setor}</ErrorMessage>}
            </div>
            <div>
              <Label htmlFor="obra" required>Obra</Label>
              <select id="obra" name="obra" value={formData.obra} onChange={handleChange} onBlur={handleBlur} className={inputStyle(touched.obra && errors.obra)}>
                <option value="" disabled>Selecione a obra</option>
                {obrasOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              {touched.obra && errors.obra && <ErrorMessage>{errors.obra}</ErrorMessage>}
            </div>
            <div>
              <Label htmlFor="ip" required>Endereço IP ou URL</Label>
              <Input id="ip" name="ip" value={formData.ip} onChange={handleChange} onBlur={handleBlur} placeholder="Digite o IP ou URL da câmera" className={inputStyle(touched.ip && errors.ip)} />
              {touched.ip && errors.ip && <ErrorMessage>{errors.ip}</ErrorMessage>}
            </div>
            <div>
              <Label htmlFor="porta" required>Porta</Label>
              <Input id="porta" name="porta" value={formData.porta} onChange={handleChange} onBlur={handleBlur} placeholder="Ex: 8080, 554" className={inputStyle(touched.porta && errors.porta)} />
              {touched.porta && errors.porta && <ErrorMessage>{errors.porta}</ErrorMessage>}
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