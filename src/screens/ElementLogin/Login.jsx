import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import FloatingLabelInput from "../../components/ui/FloatingLabelInput";
import AuthLayout from "../../components/layouts/AuthLayout";

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};

    // Validação de E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "O e-mail é obrigatório.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Digite um e-mail válido.";
    }

    // Validação de Senha
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    if (!formData.password) {
      newErrors.password = "A senha é obrigatória.";
    } else if (formData.password.length < 8 || formData.password.length > 15) {
      newErrors.password = "A senha deve ter entre 8 e 15 caracteres.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "A senha deve conter letras e números.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    if (validate()) {
      console.log("Login com sucesso:", formData);
      // Aqui iria a lógica de login real
    } else {
      console.log("Falha na validação");
    }
  };

  // Validação individual de campo
  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        error = 'O e-mail é obrigatório.';
      } else if (!emailRegex.test(value)) {
        error = 'Digite um e-mail válido.';
      }
    }
    if (name === 'password') {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
      if (!value) {
        error = 'A senha é obrigatória.';
      } else if (value.length < 8 || value.length > 15) {
        error = 'A senha deve ter entre 8 e 15 caracteres.';
      } else if (!passwordRegex.test(value)) {
        error = 'A senha deve conter letras e números.';
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
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="font-bold text-4xl text-[#03a650] font-['Poppins',Helvetica]">
            EPIGUARD
          </h1>
          <p className="text-lg text-[#222222] font-['Poppins',Helvetica]">
            Faça Login na sua conta
          </p>
        </div>

        <div className="space-y-6">
          <FloatingLabelInput
            type="email"
            label="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.email && touched.email}
            helperText={touched.email ? errors.email : ''}
          />
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
        </div>

        <Button
          onClick={handleLogin}
          className="w-full h-[47px] bg-[#04bf45] hover:bg-[#03a650] rounded-lg text-xl font-['Poppins',Helvetica]"
        >
          Entrar
        </Button>

        <Link
          to="/forgot-password"
          className="text-sm font-semibold text-[#222222] opacity-70 mx-auto block text-center"
        >
          Esqueci minha senha
        </Link>
      </div>
    </AuthLayout>
  );
};
