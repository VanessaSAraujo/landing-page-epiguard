import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Button } from '../../components/ui/button';

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-[#03a650]">
            <Check className="w-16 h-16 text-[#03a650]" strokeWidth={3} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#03a650] font-['Poppins',Helvetica]">
            Sucesso
          </h2>
          <p className="text-gray-600 mt-2">
            Sua senha foi redefinida com sucesso
          </p>
        </div>
        <Button
          onClick={() => navigate('/login')}
          className="w-full h-[47px] bg-[#04bf45] hover:bg-[#03a650] rounded-lg text-xl font-['Poppins',Helvetica]"
        >
          Entrar
        </Button>
      </div>
    </AuthLayout>
  );
};

export default PasswordResetSuccess; 