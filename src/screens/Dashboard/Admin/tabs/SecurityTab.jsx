import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';

const SecurityTab = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  
  const validate = (fieldData = passwords) => {
    const newErrors = {};
    
    // Validação da Senha Atual
    if (!fieldData.currentPassword) {
      newErrors.currentPassword = 'A senha atual é obrigatória.';
    }

    // Validação da Nova Senha
    if (!fieldData.newPassword) {
      newErrors.newPassword = 'A nova senha é obrigatória.';
    } else if (fieldData.newPassword.length < 8 || fieldData.newPassword.length > 15) {
      newErrors.newPassword = 'A senha deve ter entre 8 e 15 caracteres.';
    } else if (!passwordRegex.test(fieldData.newPassword)) {
      newErrors.newPassword = 'A senha deve conter letras e números.';
    }

    // Validação da Confirmação de Senha
    if (!fieldData.confirmPassword) {
      newErrors.confirmPassword = 'A confirmação de senha é obrigatória.';
    } else if (fieldData.newPassword !== fieldData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }

    return newErrors;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => {
        const newPasswords = { ...prev, [name]: value };
        if (touched[name] || (name === 'newPassword' && touched.confirmPassword)) {
            const fieldErrors = validate(newPasswords);
            setErrors(prevErrors => ({...prevErrors, ...fieldErrors}));
        }
        return newPasswords;
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldErrors = validate(passwords);
    setErrors(prevErrors => ({ ...prevErrors, ...fieldErrors }));
  };

  const handleSave = async () => {
    const newErrors = validate(passwords);
    setErrors(newErrors);
    setTouched({ currentPassword: true, newPassword: true, confirmPassword: true });

    if (Object.keys(newErrors).length > 0) {
      console.log('Erro de validação');
      return;
    }

    setSubmitting(true);
    try {
      console.log('Enviando alteração de senha...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Senha alterada com sucesso!');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  const inputStyle = (hasError) => 
    `w-full h-10 px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-0 bg-white ${
      hasError 
        ? 'border-red-500' 
        : 'border-[#DFEAF2] focus:border-[#03A650]'
    }`;

  const Label = ({ htmlFor, children, required }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  return (
    <div className="max-w-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Alterar Senha</h3>
      <div className="space-y-6">
        <div>
          <Label htmlFor="currentPassword" required>Senha Atual</Label>
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={passwords.currentPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Digite sua senha atual"
            className={inputStyle(touched.currentPassword && errors.currentPassword)}
            disabled={submitting}
          />
          {touched.currentPassword && errors.currentPassword && <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>}
        </div>
        <div>
          <Label htmlFor="newPassword" required>Nova Senha</Label>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            value={passwords.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Digite a nova senha"
            className={inputStyle(touched.newPassword && errors.newPassword)}
            disabled={submitting}
          />
          {touched.newPassword && errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
        </div>
        <div>
          <Label htmlFor="confirmPassword" required>Confirmação de Senha</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={passwords.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirme a nova senha"
            className={inputStyle(touched.confirmPassword && errors.confirmPassword)}
            disabled={submitting}
          />
          {touched.confirmPassword && errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <Button className="bg-green-500 hover:bg-green-600" onClick={handleSave} disabled={submitting}>
          {submitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </div>
  );
};

export default SecurityTab; 