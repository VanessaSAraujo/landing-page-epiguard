import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { Button } from '../../../components/ui/button';
import usersData from '../../../data/usersData';
import { validateCPF } from '../../../lib/utils';
import { Input } from '../../../components/ui/input';

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpf: '',
    dataNascimento: '',
    sexo: '',
    telefone: '',
    registroProfissional: '',
    ufRegistro: '',
    obraResponsavel: '',
    email: '',
    senha: '',
    status: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (fieldData = formData) => {
    const newErrors = {};
    if (!fieldData.nomeCompleto) newErrors.nomeCompleto = 'O nome completo é obrigatório.';
    
    const numericCPF = (fieldData.cpf || '').replace(/[^\d]/g, '');
    if (numericCPF.length === 0) {
      newErrors.cpf = 'O CPF é obrigatório.';
    } else if (numericCPF.length === 11 && !validateCPF(numericCPF)) {
      newErrors.cpf = 'CPF inválido.';
    }

    const numericDate = (fieldData.dataNascimento || '').replace(/[^\d]/g, '');
    if (numericDate.length === 0) {
      newErrors.dataNascimento = 'A data de nascimento é obrigatória.';
    }
    
    const numericPhone = (fieldData.telefone || '').replace(/[^\d]/g, '');
    if (numericPhone.length === 0) {
        newErrors.telefone = 'O telefone é obrigatório.';
    }

    if (!fieldData.registroProfissional) newErrors.registroProfissional = 'O registro profissional é obrigatório.';
    if (!fieldData.ufRegistro) newErrors.ufRegistro = 'A UF do registro é obrigatória.';
    if (!fieldData.obraResponsavel) newErrors.obraResponsavel = 'A obra é obrigatória.';
    if (!fieldData.email) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldData.email)) {
      newErrors.email = 'Formato de e-mail inválido.';
    }
    if (!isEditMode && !fieldData.senha) {
      newErrors.senha = 'A senha de primeiro acesso é obrigatória.';
    }
    return newErrors;
  };


  useEffect(() => {
    if (isEditMode) {
      const userToEdit = usersData.find(user => user.id === parseInt(id));
      if (userToEdit) {
        setFormData({
          nomeCompleto: userToEdit.nome || '',
          cpf: userToEdit.cpf || '055.055.055-55', // Mock data
          dataNascimento: userToEdit.dataNascimento || '',
          sexo: userToEdit.sexo || '',
          telefone: userToEdit.telefone || '',
          registroProfissional: userToEdit.registroProfissional || '',
          ufRegistro: userToEdit.ufRegistro || '',
          obraResponsavel: userToEdit.obra || '',
          email: userToEdit.email || '',
          status: userToEdit.status || '',
          senha: '', // Senha fica em branco por segurança
        });
      }
    }
  }, [id, isEditMode]);

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
        nomeCompleto: true,
        cpf: true,
        dataNascimento: true,
        telefone: true,
        registroProfissional: true,
        ufRegistro: true,
        obraResponsavel: true,
        email: true,
        senha: true,
    });

    if (Object.keys(newErrors).length > 0) {
        console.log("Formulário com erros.");
        return;
    }

    const userToSave = { ...formData, role: 'tecnico' };

    if (isEditMode) {
      console.log('Dados do formulário para ATUALIZAR:', { ...userToSave, id });
    } else {
      console.log('Dados do formulário para SALVAR:', userToSave);
    }
    navigate('/admin/users');
  };
  
  // Dados mockados para os selects
  const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
  const obras = ["Alpha", "Beta", "Obra B", "Gama", "Delta"];
  const statusOptions = ["Conectado", "Desativado", "Desconectado"];

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
    <AdminLayout pageTitle={isEditMode ? "Editar Usuário" : "Cadastrar Usuário"}>
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full">
        <div className="mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-gray-800">{isEditMode ? "Editar Usuário" : "Cadastro de Usuário"}</h2>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            
            {/* Nome Completo */}
            <div>
              <Label htmlFor="nomeCompleto" required>Nome Completo</Label>
              <Input type="text" name="nomeCompleto" id="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} onBlur={handleBlur} placeholder="Digite o nome completo" className={inputStyle(touched.nomeCompleto && errors.nomeCompleto)} />
              {touched.nomeCompleto && errors.nomeCompleto && <ErrorMessage>{errors.nomeCompleto}</ErrorMessage>}
            </div>

            {/* CPF */}
            <div>
              <Label htmlFor="cpf" required>CPF</Label>
              <InputMask
                mask="999.999.999-99"
                value={formData.cpf}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {(inputProps) => <Input {...inputProps} type="text" name="cpf" id="cpf" placeholder="000.000.000-00" className={inputStyle(touched.cpf && errors.cpf)} />}
              </InputMask>
              {touched.cpf && errors.cpf && <p className="text-xs text-red-500 mt-1">{errors.cpf}</p>}
            </div>

            {/* Data de Nascimento */}
            <div>
              <Label htmlFor="dataNascimento" required>Data de nascimento</Label>
              <InputMask
                mask="99/99/9999"
                value={formData.dataNascimento}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {(inputProps) => <Input {...inputProps} type="text" name="dataNascimento" id="dataNascimento" placeholder="__/__/____" className={inputStyle(touched.dataNascimento && errors.dataNascimento)} />}
              </InputMask>
              {touched.dataNascimento && errors.dataNascimento && <p className="text-xs text-red-500 mt-1">{errors.dataNascimento}</p>}
            </div>

            <div className="grid grid-cols-2 gap-x-8">
              {/* Sexo */}
              <div>
                <Label htmlFor="sexo">Sexo</Label>
                <select name="sexo" id="sexo" value={formData.sexo} onChange={handleChange} className={inputStyle(false)}>
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              {/* Telefone de Contato */}
               <div>
                <Label htmlFor="telefone" required>Telefone de contato</Label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={formData.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => <Input {...inputProps} type="text" name="telefone" id="telefone" placeholder="(00) 99999-9999" className={inputStyle(touched.telefone && errors.telefone)} />}
                </InputMask>
                {touched.telefone && errors.telefone && <p className="text-xs text-red-500 mt-1">{errors.telefone}</p>}
              </div>
            </div>
            
            {/* Registro Profissional */}
            <div>
              <Label htmlFor="registroProfissional" required>Registro Profissional</Label>
              <Input type="text" name="registroProfissional" id="registroProfissional" value={formData.registroProfissional} onChange={handleChange} onBlur={handleBlur} placeholder="Digite o número do registro" className={inputStyle(touched.registroProfissional && errors.registroProfissional)} />
              {touched.registroProfissional && errors.registroProfissional && <ErrorMessage>{errors.registroProfissional}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-2 gap-x-8">
                {/* UF do Registro */}
                <div>
                  <Label htmlFor="ufRegistro" required>UF do Registro</Label>
                  <select name="ufRegistro" id="ufRegistro" value={formData.ufRegistro} onChange={handleChange} onBlur={handleBlur} className={inputStyle(touched.ufRegistro && errors.ufRegistro)}>
                    <option value="">UF</option>
                    {ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                  {touched.ufRegistro && errors.ufRegistro && <ErrorMessage>{errors.ufRegistro}</ErrorMessage>}
                </div>

                {/* Obra Responsável */}
                <div>
                  <Label htmlFor="obraResponsavel" required>Obra responsável</Label>
                  <select name="obraResponsavel" id="obraResponsavel" value={formData.obraResponsavel} onChange={handleChange} onBlur={handleBlur} className={inputStyle(touched.obraResponsavel && errors.obraResponsavel)}>
                    <option value="">Selecione a obra</option>
                    {obras.map(obra => <option key={obra} value={obra}>{obra}</option>)}
                  </select>
                  {touched.obraResponsavel && errors.obraResponsavel && <ErrorMessage>{errors.obraResponsavel}</ErrorMessage>}
                </div>
            </div>

            {/* E-mail */}
            <div className="md:col-span-1">
              <Label htmlFor="email" required>E-mail</Label>
              <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder="exemplo@exemplo.com" className={inputStyle(touched.email && errors.email)} />
              {touched.email && errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </div>
            
            {/* Senha de Primeiro Acesso */}
            <div className="md:col-span-1">
                <Label htmlFor="senha" required>Senha de Primeiro Acesso</Label>
                <Input type="password" name="senha" id="senha" value={formData.senha} onChange={handleChange} onBlur={handleBlur} placeholder={isEditMode ? "Deixe em branco para não alterar" : "************"} className={inputStyle(touched.senha && errors.senha)} />
                {touched.senha && errors.senha && <ErrorMessage>{errors.senha}</ErrorMessage>}
            </div>

            {isEditMode && (
              <div className="md:col-span-1">
                <Label htmlFor="status">Status</Label>
                <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputStyle(false)}>
                  <option value="">Selecione o status</option>
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-4 mt-8">
            <Button type="button" variant="outline" onClick={() => navigate('/admin/users')} className="px-8 py-2 rounded-lg border-gray-300 text-gray-700 font-semibold hover:bg-gray-100">
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

export default UserForm; 