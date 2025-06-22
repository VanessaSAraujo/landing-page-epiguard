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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
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
            className={inputStyle} 
            placeholder="seuemail@exemplo.com"
            value={form.email}
            onChange={handleChange}
          />
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
            className={inputStyle}
            placeholder="********"
            value={form.password}
            onChange={handleChange}
          />
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

        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </AuthLayout>
  );
};
