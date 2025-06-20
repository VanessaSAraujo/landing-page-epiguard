import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Button } from "../../components/ui/button";
import FloatingLabelInput from "../../components/ui/FloatingLabelInput";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,15}$/;

    // Validação da Nova Senha
    if (!formData.password) {
      newErrors.password = "A senha é obrigatória.";
    } else if (formData.password.length < 8 || formData.password.length > 15) {
      newErrors.password = "A senha deve ter entre 8 e 15 caracteres.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "A senha deve conter letras e número.";
    }

    // Validação da Confirmação de Senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "A confirmação de senha é obrigatória.";
    } else if (formData.confirmPassword.length < 8 || formData.confirmPassword.length > 15) {
      newErrors.confirmPassword = "A senha deve ter entre 8 e 15 caracteres.";
    } else if (!passwordRegex.test(formData.confirmPassword)) {
      newErrors.confirmPassword = "A senha deve conter letras e número.";
    } else if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (validate()) {
      console.log("Senha redefinida com sucesso");
      navigate("/password-reset-success");
    } else {
      console.log("Falha na validação");
    }
  };

  // Validação individual de campo
  const validateField = (name, value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,15}$/;
    let error = '';
    if (name === 'password') {
      if (!value) {
        error = 'A senha é obrigatória.';
      } else if (value.length < 8 || value.length > 15) {
        error = 'A senha deve ter entre 8 e 15 caracteres.';
      } else if (!passwordRegex.test(value)) {
        error = 'A senha deve conter letras e número.';
      }
    }
    if (name === 'confirmPassword') {
      if (!value) {
        error = 'A confirmação de senha é obrigatória.';
      } else if (value.length < 8 || value.length > 15) {
        error = 'A senha deve ter entre 8 e 15 caracteres.';
      } else if (!passwordRegex.test(value)) {
        error = 'A senha deve conter letras e número.';
      } else if (formData.password && value && formData.password !== value) {
        error = 'As senhas não coincidem.';
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  return (
    <AuthLayout>
      <div className="text-center space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-[#03a650] font-['Poppins',Helvetica]">
            Nova Senha
          </h2>
          <p className="text-gray-600 mt-2">
            Digite a sua nova senha.
          </p>
        </div>

        <div className="space-y-6">
          <FloatingLabelInput
            type="password"
            label="Senha"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.password && touched.password}
            helperText={touched.password ? errors.password : ''}
          />
          <FloatingLabelInput
            type="password"
            label="Confirme sua Senha"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.confirmPassword && touched.confirmPassword}
            helperText={touched.confirmPassword ? errors.confirmPassword : ''}
          />
        </div>

        <Button
          onClick={handleSave}
          className="w-full h-[47px] bg-[#04bf45] hover:bg-[#03a650] rounded-lg text-xl font-['Poppins',Helvetica]"
        >
          Salvar
        </Button>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword; 