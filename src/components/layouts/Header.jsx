import React from 'react';
import { ChevronLeft, ChevronsRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, user }) => {
  const navigate = useNavigate();

  const getFormattedDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('pt-BR', options);
  };

  return (
    <header className="bg-white shadow-sm p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100" aria-label="Voltar">
          </button>
          <h1 className="text-2xl font-bold text-gray-800 ml-2">{title}</h1>
          <ChevronsRight className="w-5 h-5 text-green-500 mx-2" />
          <span className="text-green-600 font-medium">{getFormattedDate()}</span>
        </div>
        <div className="text-gray-800">
          Olá, <span className="font-semibold">{user?.name || 'Usuário'}!</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 