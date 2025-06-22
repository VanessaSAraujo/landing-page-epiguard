import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import AuthLayout from "../../components/layouts/AuthLayout";
import usersData from "../../data/usersData";
import { useAuth } from "../../AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    if (!email) return 'E-mail é obrigatório.';
    // Regex simples para e-mail
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return 'E-mail inválido.';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Senha é obrigatória.';
    if (password.length < 8) return 'A senha deve ter pelo menos 8 caracteres.';
    if (password.length > 15) return 'A senha deve ter no máximo 15 caracteres.';
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) return 'A senha deve conter letras e números.';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') setEmailError(validateEmail(value));
    if (name === 'password') setPasswordError(validatePassword(value));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmailError(validateEmail(value));
    if (name === 'password') setPasswordError(validatePassword(value));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailErr = validateEmail(form.email);
    const passErr = validatePassword(form.password);
    setEmailError(emailErr);
    setPasswordError(passErr);
    if (emailErr || passErr) return;
    // Busca usuário pelo e-mail (mock, sem senha)
    const user = usersData.find(u => u.email === form.email);
    if (!user) {
      setError('Usuário ou senha inválidos.');
      return;
    }
    login(user);
    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };

  const inputStyle = "w-full h-10 px-4 py-2 text-base border border-[#DFEAF2] rounded-lg focus:outline-none focus:ring-0 focus:border-[#03A650]";

  return (
    <AuthLayout
      title="Login"
      subtitle="Bem-vindo de volta! Por favor, insira suas credenciais."
    >
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-mail
          </label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            required 
            className={inputStyle + (emailError ? ' border-red-500' : '')}
            placeholder="seuemail@exemplo.com"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>

        <div>
           <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Senha
          </label>
          <Input 
            id="password" 
            name="password"
            type="password" 
            required 
            className={inputStyle + (passwordError ? ' border-red-500' : '')}
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Lembrar-me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={!!emailError || !!passwordError || !form.email || !form.password}>
          Entrar
        </Button>
      </form>
    </AuthLayout>
  );
};
