import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = ({ children, pageTitle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  // Em uma aplicação real, estes dados viriam de um contexto de autenticação ou API
  const currentUser = {
    name: 'Fulana',
    // Para testar sem imagem de perfil, defina como null
    avatarUrl: null 
    // avatarUrl: '/src/assets/user_icon.png' 
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar Desktop e Drawer Mobile */}
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        user={currentUser}
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />
      <div className="flex-1 flex flex-col">
        {/* Botão hambúrguer mobile */}
        <div className="md:hidden flex items-center p-4">
          <button onClick={openSidebar} className="text-gray-700 focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="ml-4 text-xl font-bold">Menu</span>
        </div>
        <Header title={pageTitle} user={currentUser} />
        <main className="flex-1 pt-8 pr-8 pl-8 pb-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 