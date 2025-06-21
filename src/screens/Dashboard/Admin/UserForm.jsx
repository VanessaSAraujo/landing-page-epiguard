import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { Button } from '../../../components/ui/button';
import usersData from '../../../data/usersData';

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      console.log('Dados do formulário para ATUALIZAR:', { ...formData, id });
    } else {
      console.log('Dados do formulário para SALVAR:', formData);
    }
    navigate('/admin/users');
  };
  
  // Dados mockados para os selects
  const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
  const obras = ["Alpha", "Beta", "Obra B", "Gama", "Delta"];
  const statusOptions = ["Conectado", "Desativado", "Desconectado"];

  return (
    <AdminLayout pageTitle={isEditMode ? "Editar Usuário" : "Cadastrar Usuário"}>
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full">
        <div className="mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-gray-800">{isEditMode ? "Editar Usuário" : "Cadastro de Usuário"}</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Nome Completo */}
            <div>
              <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input type="text" name="nomeCompleto" id="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} placeholder="Digite o nome completo" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>

            {/* CPF */}
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
              <input type="text" name="cpf" id="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>

            {/* Data de Nascimento */}
            <div>
              <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700 mb-1">Data de nascimento</label>
              <input type="text" name="dataNascimento" id="dataNascimento" value={formData.dataNascimento} onChange={handleChange} placeholder="__/__/____" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>

            <div className="grid grid-cols-2 gap-x-8">
              {/* Sexo */}
              <div>
                <label htmlFor="sexo" className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
                <select name="sexo" id="sexo" value={formData.sexo} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              {/* Telefone de Contato */}
               <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">Telefone de contato</label>
                <input type="text" name="telefone" id="telefone" value={formData.telefone} onChange={handleChange} placeholder="(00) 0 0000-0000" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
            </div>
            
            {/* Registro Profissional */}
            <div>
              <label htmlFor="registroProfissional" className="block text-sm font-medium text-gray-700 mb-1">Registro Profissional</label>
              <input type="text" name="registroProfissional" id="registroProfissional" value={formData.registroProfissional} onChange={handleChange} placeholder="Digite o número do registro" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>

            <div className="grid grid-cols-2 gap-x-8">
                {/* UF do Registro */}
                <div>
                  <label htmlFor="ufRegistro" className="block text-sm font-medium text-gray-700 mb-1">UF do Registro</label>
                  <select name="ufRegistro" id="ufRegistro" value={formData.ufRegistro} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">UF</option>
                    {ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>

                {/* Obra Responsável */}
                <div>
                  <label htmlFor="obraResponsavel" className="block text-sm font-medium text-gray-700 mb-1">Obra responsável</label>
                  <select name="obraResponsavel" id="obraResponsavel" value={formData.obraResponsavel} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Selecione a obra</option>
                    {obras.map(obra => <option key={obra} value={obra}>{obra}</option>)}
                  </select>
                </div>
            </div>

            {/* E-mail */}
            <div className="md:col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="exemplo@exemplo.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            
            {/* Senha de Primeiro Acesso */}
            <div className="md:col-span-1">
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">Senha de Primeiro Acesso</label>
                <input type="password" name="senha" id="senha" value={formData.senha} onChange={handleChange} placeholder={isEditMode ? "Deixe em branco para não alterar" : "************"} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>

            {isEditMode && (
              <div className="md:col-span-1">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select name="status" id="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
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