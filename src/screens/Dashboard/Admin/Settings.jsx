import React, { useState } from 'react';
import { ChevronRight, User, Bell, Lock } from 'lucide-react';
import AdminLayout from '../../../components/layouts/AdminLayout';
import ProfileTab from './tabs/ProfileTab';
import PreferencesTab from './tabs/PreferencesTab';
import SecurityTab from './tabs/SecurityTab';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('perfil');

  const renderContent = () => {
    switch (activeTab) {
      case 'perfil':
        return <ProfileTab />;
      case 'preferencias':
        return <PreferencesTab />;
      case 'seguranca':
        return <SecurityTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Configurações</h1>
            <div className="flex items-center text-sm text-gray-500">
                <ChevronRight size={18} className="text-gray-400" />
                <ChevronRight size={18} className="text-gray-400 -ml-3" />
                <span>20 de abril de 2025</span>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex border-b">
                <TabButton
                    icon={User}
                    label="Perfil"
                    isActive={activeTab === 'perfil'}
                    onClick={() => setActiveTab('perfil')}
                />
                <TabButton
                    icon={Bell}
                    label="Preferências"
                    isActive={activeTab === 'preferencias'}
                    onClick={() => setActiveTab('preferencias')}
                />
                <TabButton
                    icon={Lock}
                    label="Segurança"
                    isActive={activeTab === 'seguranca'}
                    onClick={() => setActiveTab('seguranca')}
                />
            </div>
            <div className="py-6">
                {renderContent()}
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-all
            ${isActive
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }
        `}
    >
        {label}
    </button>
);

export default Settings; 