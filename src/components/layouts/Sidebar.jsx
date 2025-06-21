import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Video,
  FileText,
  Users,
  Archive,
  Settings,
  LifeBuoy,
  LogOut,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isCollapsed, toggleSidebar, user, sidebarOpen, closeSidebar }) => {
  const location = useLocation();
  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/admin' },
    { icon: Video, text: 'Câmeras', path: '/admin/cameras' },
    { icon: FileText, text: 'Relatórios', path: '/admin/reports' },
    { icon: Users, text: 'Usuários', path: '/admin/users' },
    { icon: Archive, text: 'Cadastros Gerais', path: '/admin/general-registrations' },
  ];

  const bottomMenuItems = [
    { icon: Settings, text: 'Configurações', path: '/admin/settings' },
    { icon: LifeBuoy, text: 'Suporte', path: '/admin/support' },
  ];

  return (
    <>
      {/* Sidebar Desktop */}
      <div
        className={`relative flex flex-col bg-white text-gray-700 transition-all duration-300 ease-in-out h-screen shadow-lg ${
          isCollapsed ? 'w-20' : 'w-64'
        } hidden md:flex`}
      >
        {/* Botão de expandir/recolher */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-8 z-10 p-1 bg-white border-2 border-gray-200 rounded-full text-gray-600 hover:bg-gray-100"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center p-4 h-[100px] border-b border-gray-200">
          {isCollapsed ? (
            <img src="/src/assets/Simbolo.png" alt="EpiGuard" className="w-12 h-12" />
          ) : (
            <img src="/src/assets/logo.png" alt="EpiGuard Logo" className="h-14" />
          )}
        </div>

        {/* Itens do Menu */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.text}
              to={item.path}
              className={`flex items-center p-2 rounded-3xl hover:bg-green-50 ${
                location.pathname === item.path ? 'bg-green-50 text-green-600' : 'text-gray-600'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <item.icon className="w-6 h-6" />
              {!isCollapsed && <span className="ml-3 font-medium">{item.text}</span>}
            </Link>
          ))}
          <hr className="my-3 border-gray-200" />
          {bottomMenuItems.map((item) => (
            <Link
              key={item.text}
              to={item.path}
              className={`flex items-center p-2 rounded-3xl hover:bg-green-50 text-gray-600 ${isCollapsed ? 'justify-center' : ''}`}
            >
              <item.icon className="w-6 h-6" />
              {!isCollapsed && <span className="ml-3 font-medium">{item.text}</span>}
            </Link>
          ))}
        </nav>

        {/* Rodapé do Sidebar */}
        <div className="px-3 py-4 border-t border-gray-200">
          <a
            href="/logout"
            className={`flex items-center p-2 rounded-3xl hover:bg-green-50 text-gray-600 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-6 h-6" />
            {!isCollapsed && <span className="ml-3 font-medium">Sair</span>}
          </a>
          <hr className="my-3 border-gray-200" />
          <div className={`flex items-center p-2 ${isCollapsed ? 'justify-center' : ''}`}>
            <img
              src={user?.avatarUrl || '/src/assets/user_icon.png'}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            {!isCollapsed && (
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-gray-800">Olá,</p>
                <p className="text-sm font-medium text-gray-600">{user?.name || 'Usuário'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Sidebar Drawer Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={closeSidebar}></div>
          {/* Drawer */}
          <div className="relative w-64 bg-white h-full shadow-lg flex flex-col animate-fade-in-scale">
            {/* Botão de fechar */}
            <button
              onClick={closeSidebar}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 text-gray-600"
              aria-label="Fechar menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Conteúdo do Sidebar (igual ao desktop, mas sem o botão de expandir/recolher) */}
            <div className="flex items-center justify-center p-4 h-[100px] border-b border-gray-200">
              <img src="/src/assets/logo.png" alt="EpiGuard Logo" className="h-14" />
            </div>
            <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.path}
                  className={`flex items-center p-2 rounded-3xl hover:bg-green-50 ${
                    location.pathname === item.path ? 'bg-green-50 text-green-600' : 'text-gray-600'
                  }`}
                  onClick={closeSidebar}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="ml-3 font-medium">{item.text}</span>
                </Link>
              ))}
              <hr className="my-3 border-gray-200" />
              {bottomMenuItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.path}
                  className="flex items-center p-2 rounded-3xl hover:bg-green-50 text-gray-600"
                  onClick={closeSidebar}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="ml-3 font-medium">{item.text}</span>
                </Link>
              ))}
            </nav>
            <div className="px-3 py-4 border-t border-gray-200">
              <a
                href="/logout"
                className="flex items-center p-2 rounded-3xl hover:bg-green-50 text-gray-600"
              >
                <LogOut className="w-6 h-6" />
                <span className="ml-3 font-medium">Sair</span>
              </a>
              <hr className="my-3 border-gray-200" />
              <div className="flex items-center p-2">
                <img
                  src={user?.avatarUrl || '/src/assets/user_icon.png'}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-semibold text-gray-800">Olá,</p>
                  <p className="text-sm font-medium text-gray-600">{user?.name || 'Usuário'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar; 