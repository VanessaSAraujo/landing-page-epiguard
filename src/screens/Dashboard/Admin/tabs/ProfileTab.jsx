import React, { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import userIcon from '../../../../assets/user_icon.png';

const ProfileTab = () => {
  const [formData, setFormData] = useState({
    nome: '',
    comoMeChamar: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    endereco: '',
    complemento: '',
    cidade: '',
    cep: '',
    pais: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const Label = ({ htmlFor, children, required }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const mockUserData = {
          nome: 'Fulana Souza',
          comoMeChamar: 'Fulana',
          email: 'fulana235@gmail.com',
          telefone: '(75) 99999-9999',
          dataNascimento: '25/01/1982',
          endereco: 'Rua x, número 1856, bairro y',
          complemento: 'Apartamento 565',
          cidade: 'Feira de Santana',
          cep: '44085-963',
          pais: 'Brasil',
        };
        
        setTimeout(() => {
          setFormData(mockUserData);
          setLoading(false);
        }, 1500);

      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const validate = (fieldData = formData) => {
    const newErrors = {};

    if (!fieldData.nome) newErrors.nome = 'O nome é obrigatório.';
    if (!fieldData.endereco) newErrors.endereco = 'O endereço é obrigatório.';

    if (!fieldData.email) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldData.email)) {
      newErrors.email = 'E-mail inválido.';
    }

    const numericPhone = (fieldData.telefone || '').replace(/[^\d]/g, '');
    if (numericPhone.length === 0) {
        newErrors.telefone = 'O telefone é obrigatório.';
    } else if (numericPhone.length < 10) { // Ex: (75)99999-9999 -> 11 dígitos
        newErrors.telefone = 'Telefone inválido.';
    }

    if (fieldData.dataNascimento && !/^\d{2}\/\d{2}\/\d{4}$/.test(fieldData.dataNascimento)) {
      newErrors.dataNascimento = 'Data inválida. Use DD/MM/AAAA.';
    }
    if (fieldData.cep && !/^\d{5}-\d{3}$/.test(formData.cep)) {
      newErrors.cep = 'CEP inválido. Use 99999-999.';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let maskedValue = value;

    if (name === 'telefone') {
      maskedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
    } else if (name === 'dataNascimento') {
      maskedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 10);
    } else if (name === 'cep') {
      maskedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 9);
    }

    setFormData(prev => ({ ...prev, [name]: maskedValue }));
    if (touched[name]) {
        const newErrors = validate({ ...formData, [name]: maskedValue });
        setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const newErrors = validate(formData);
    setErrors(prev => ({...prev, [name]: newErrors[name]}));
  };
  
  const handleSave = async () => {
    const newErrors = validate(formData);
    setErrors(newErrors);
    setTouched({
        nome: true,
        email: true,
        endereco: true,
        telefone: true
    });

    if (Object.keys(newErrors).length > 0) {
      console.log('Erro de validação detectado.');
      return;
    }

    setSubmitting(true);
    try {
      console.log('Enviando dados para o backend:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">Carregando informações do perfil...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
            <div className="relative">
                <img 
                    src={userIcon}
                    alt="Fulana Souza"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                />
                <button className="absolute bottom-1 right-1 bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
                    <Edit2 size={16} />
                </button>
            </div>
        </div>

        <div className="md:col-span-2">
            <form onSubmit={(e) => {e.preventDefault(); handleSave();}} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <Label htmlFor="nome" required>Nome</Label>
                  <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} onBlur={handleBlur} disabled={submitting} className={inputStyle(touched.nome && errors.nome)} />
                  {touched.nome && errors.nome && <ErrorMessage>{errors.nome}</ErrorMessage>}
                </div>
                <div>
                  <Label htmlFor="comoMeChamar">Como me Chamar</Label>
                  <Input id="comoMeChamar" name="comoMeChamar" value={formData.comoMeChamar} onChange={handleChange} disabled={submitting} className={inputStyle(false)} />
                </div>
                <div>
                  <Label htmlFor="email" required>E-mail</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} disabled={submitting} className={inputStyle(touched.email && errors.email)} />
                  {touched.email && errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </div>
                <div>
                  <Label htmlFor="telefone" required>Telefone</Label>
                  <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} onBlur={handleBlur} disabled={submitting} className={inputStyle(touched.telefone && errors.telefone)} />
                  {touched.telefone && errors.telefone && <ErrorMessage>{errors.telefone}</ErrorMessage>}
                </div>
                <div>
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <Input id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} onBlur={handleBlur} disabled={submitting} className={inputStyle(touched.dataNascimento && errors.dataNascimento)} />
                  {touched.dataNascimento && errors.dataNascimento && <ErrorMessage>{errors.dataNascimento}</ErrorMessage>}
                </div>
                <div>
                  <Label htmlFor="endereco" required>Endereço</Label>
                  <Input id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} onBlur={handleBlur} disabled={submitting} className={inputStyle(touched.endereco && errors.endereco)} />
                  {touched.endereco && errors.endereco && <ErrorMessage>{errors.endereco}</ErrorMessage>}
                </div>
                <div>
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input id="complemento" name="complemento" value={formData.complemento} onChange={handleChange} disabled={submitting} className={inputStyle(false)} />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} disabled={submitting} className={inputStyle(false)} />
                </div>
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input id="cep" name="cep" value={formData.cep} onChange={handleChange} onBlur={handleBlur} disabled={submitting} className={inputStyle(touched.cep && errors.cep)} />
                  {touched.cep && errors.cep && <ErrorMessage>{errors.cep}</ErrorMessage>}
                </div>
                <div>
                  <Label htmlFor="pais">País</Label>
                  <Input id="pais" name="pais" value={formData.pais} onChange={handleChange} disabled={submitting} className={inputStyle(false)} />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                  <Button type="button" variant="outline" className="border-gray-400 text-gray-700" onClick={() => { /* lógica para cancelar */}} disabled={submitting}>Cancelar</Button>
                  <Button type="submit" className="bg-green-500 hover:bg-green-600" disabled={submitting}>
                    {submitting ? 'Salvando...' : 'Salvar'}
                  </Button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default ProfileTab; 