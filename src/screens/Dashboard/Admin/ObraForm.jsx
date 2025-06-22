import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { Button } from '../../../components/ui/button';
import obrasData from '../../../data/obrasData';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';

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
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const obraToEdit = obrasData.find(o => o.id === parseInt(id));
      if (obraToEdit) {
        setFormData({
          nome: obraToEdit.nome || '',
          endereco: obraToEdit.endereco || '',
          dataInicio: obraToEdit.dataInicio || '',
          previsaoTermino: obraToEdit.termino || '',
          descricao: obraToEdit.descricao || '',
        });
      }
    }
  }, [id, isEditMode]);

  const validate = (fieldData = formData) => {
    const newErrors = {};
    if (!fieldData.nome) newErrors.nome = 'O nome da obra é obrigatório.';
    if (!fieldData.endereco) newErrors.endereco = 'O endereço é obrigatório.';
    if (!(fieldData.previsaoTermino || '').replace(/[^\d]/g, '')) {
      newErrors.previsaoTermino = 'A previsão de término é obrigatória.';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
     if (touched[name]) {
      const newErrors = validate({ ...formData, [name]: value });
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({...prev, [name]: true}));
    const newErrors = validate(formData);
    setErrors(prev => ({...prev, [name]: newErrors[name]}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);
    setTouched({
      nome: true,
      endereco: true,
      previsaoTermino: true,
    });

    if (Object.keys(newErrors).length > 0) {
      console.log("Formulário com erros.");
      return;
    }

    if (isEditMode) {
      console.log('Dados da Obra para ATUALIZAR:', formData);
    } else {
      console.log('Dados da Obra para SALVAR:', formData);
    }
    navigate('/admin/general-registrations');
  };

  const Label = ({ htmlFor, children, required }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const inputStyle = (hasError) =>
    `w-full h-10 px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-0 bg-white ${
      hasError
        ? "border-red-500"
        : "border-[#DFEAF2] focus:border-[#03A650]"
    }`;

  const ErrorMessage = ({ children }) => (
    <p className="text-xs text-red-500 mt-1">{children}</p>
  );

  return (
    <AdminLayout pageTitle={isEditMode ? "Editar Obra" : "Cadastrar Obra"}>
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-800">{isEditMode ? "Editar Obra" : "Cadastro da Obra"}</h2>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <Label htmlFor="nome" required>Nome da Obra</Label>
              <Input type="text" name="nome" id="nome" value={formData.nome} onChange={handleChange} onBlur={handleBlur} placeholder="Digite o nome da obra" className={inputStyle(touched.nome && errors.nome)} />
              {touched.nome && errors.nome && <ErrorMessage>{errors.nome}</ErrorMessage>}
            </div>

            <div>
              <Label htmlFor="endereco" required>Endereço</Label>
              <Input type="text" name="endereco" id="endereco" value={formData.endereco} onChange={handleChange} onBlur={handleBlur} placeholder="Digite o endereço completo" className={inputStyle(touched.endereco && errors.endereco)} />
              {touched.endereco && errors.endereco && <ErrorMessage>{errors.endereco}</ErrorMessage>}
            </div>

            <div>
              <Label htmlFor="dataInicio">Data de Início</Label>
              <InputMask
                mask="99/99/9999"
                value={formData.dataInicio}
                onChange={handleChange}
                name="dataInicio"
              >
                {(inputProps) => <Input {...inputProps} type="text" id="dataInicio" placeholder="__/__/____" className={inputStyle(false)} />}
              </InputMask>
            </div>

            <div>
              <Label htmlFor="previsaoTermino" required>Previsão de Término</Label>
              <InputMask
                mask="99/99/9999"
                value={formData.previsaoTermino}
                onChange={handleChange}
                onBlur={handleBlur}
                name="previsaoTermino"
              >
                {(inputProps) => <Input {...inputProps} type="text" id="previsaoTermino" placeholder="__/__/____" className={inputStyle(touched.previsaoTermino && errors.previsaoTermino)} />}
              </InputMask>
              {touched.previsaoTermino && errors.previsaoTermino && <ErrorMessage>{errors.previsaoTermino}</ErrorMessage>}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea name="descricao" id="descricao" value={formData.descricao} onChange={handleChange} rows="4" placeholder="Digite uma descrição (opcional)" className={`${inputStyle(false)} h-auto`}></Textarea>
            </div>
          </div>

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