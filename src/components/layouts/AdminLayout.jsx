import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = ({ children, pageTitle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Em uma aplicação real, estes dados viriam de um contexto de autenticação ou API
  const currentUser = {
    name: 'Fulana',
    // Para testar sem imagem de perfil, defina como null
    avatarUrl: null 
    // avatarUrl: '/src/assets/user_icon.png' 
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={toggleSidebar} 
        user={currentUser} 
      />
      <div className="flex-1 flex flex-col">
        <Header title={pageTitle} user={currentUser} />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 