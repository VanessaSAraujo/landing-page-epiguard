import React from 'react';
import {
  LifeBuoy,
  LogOut,
  Settings,
  LayoutDashboard,
  Camera,
  FileText,
  Users,
  Archive,
  ChevronLeft,
  ChevronRight,
  X,
  Video,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import simbolo from '../../assets/Simbolo.png';
import userIcon from '../../assets/user_icon.png';
import { useAuth } from '../../AuthContext';

const Sidebar = ({ isCollapsed, toggleSidebar, sidebarOpen, closeSidebar }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Definição dos menus para admin e técnico
  const adminMenuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: Camera, text: 'Câmeras', path: '/admin/cameras' },
    { icon: FileText, text: 'Relatórios', path: '/admin/reports' },
    { icon: Users, text: 'Usuários', path: '/admin/users' },
    { icon: Archive, text: 'Cadastros Gerais', path: '/admin/general-registrations' },
  ];

  const tecnicoMenuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/user/dashboard' },
    { icon: Camera, text: 'Câmeras', path: '/user/cameras' },
    { icon: FileText, text: 'Relatórios', path: '/user/reports' },
  ];

  const adminBottomMenuItems = [
    { icon: Settings, text: 'Configurações', path: '/admin/settings' },
  ];

  const tecnicoBottomMenuItems = [
    { icon: Settings, text: 'Configurações', path: '/user/settings' },
  ];

  // Escolhe os menus conforme o perfil
  const isTecnico = user?.role === 'tecnico';
  const menuItems = isTecnico ? tecnicoMenuItems : adminMenuItems;
  const bottomMenuItems = isTecnico ? tecnicoBottomMenuItems : adminBottomMenuItems;

  const isActive = (path) => {
    if (path === '/admin/dashboard') {
      return location.pathname === '/admin/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const renderMenuItems = (isMobile) => (
    <>
      {menuItems.map((item) => (
        <Link
          key={item.text}
          to={item.path}
          className={`flex items-center p-3 my-1 rounded-lg transition-colors
            ${isActive(item.path)
              ? 'bg-green-100 text-green-700 font-semibold'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }
            ${isCollapsed && !isMobile ? 'justify-center' : ''}`}
          onClick={isMobile ? closeSidebar : undefined}
        >
          <item.icon className="w-6 h-6 flex-shrink-0" />
          {(!isCollapsed || isMobile) && <span className="ml-4 truncate">{item.text}</span>}
        </Link>
      ))}
      <hr className="my-3 border-gray-200" />
      {bottomMenuItems.map((item) => (
        <Link
          key={item.text}
          to={item.path}
          className={`flex items-center p-3 my-1 rounded-lg transition-colors
          ${isActive(item.path)
            ? 'bg-green-100 text-green-700 font-semibold'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }
          ${isCollapsed && !isMobile ? 'justify-center' : ''}`}
          onClick={isMobile ? closeSidebar : undefined}
        >
          <item.icon className="w-6 h-6 flex-shrink-0" />
          {(!isCollapsed || isMobile) && <span className="ml-4 truncate">{item.text}</span>}
        </Link>
      ))}
      {/* Suporte via WhatsApp */}
      <a
        href="https://wa.me/5575982802992"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center p-3 my-1 rounded-lg transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 ${isCollapsed && !isMobile ? 'justify-center' : ''}`}
        onClick={isMobile ? closeSidebar : undefined}
      >
        <LifeBuoy className="w-6 h-6 flex-shrink-0" />
        {(!isCollapsed || isMobile) && <span className="ml-4 truncate">Suporte</span>}
      </a>
    </>
  );

  return (
    <>
      {/* Sidebar Desktop */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-24' : 'w-64'}`}
      >
        <div className={`flex items-center p-4 h-20 border-b relative ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {isCollapsed ? (
              <img src={simbolo} alt="EpiGuard" className="h-10" />
            ) : (
              <img src={logo} alt="EPIGuard" className="h-10" />
            )}
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-full bg-white text-gray-600 border border-gray-300 absolute top-1/2 -right-3 transform -translate-y-1/2 hover:bg-gray-100 transition-all"
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {renderMenuItems(false)}
        </nav>

        <div className="px-3 py-2">
          <Link
            to="/login"
            className={`flex items-center w-full p-3 rounded-lg text-gray-600 hover:bg-gray-100
            ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && <span className="ml-4 font-semibold">Sair</span>}
          </Link>
        </div>

        <div className="p-3 border-t border-gray-200">
           <div className="flex items-center p-2 rounded-lg mt-2">
              <img
                src={user?.avatarUrl || userIcon}
                alt={user?.name || 'User'}
                className="w-10 h-10 rounded-full object-cover"
              />
              {!isCollapsed && (
                  <div className="ml-3">
                      <p className="text-xs text-gray-500">Olá,</p>
                      <p className="text-sm font-semibold text-gray-800">{user?.name || 'Fulano'}</p>
                  </div>
              )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden
        ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeSidebar}
      ></div>

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white z-40 w-64 transform transition-transform duration-300 ease-in-out md:hidden
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 h-20 border-b">
          {isCollapsed ? (
            <img src={simbolo} alt="EpiGuard" className="h-10" />
          ) : (
            <img src={logo} alt="EPIGuard" className="h-10" />
          )}
          <button onClick={closeSidebar} className="p-2 rounded-lg hover:bg-gray-100">
            <X />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4">
          {renderMenuItems(true)}
        </nav>

        <div className="px-3 py-2">
          <Link to="/login"
            className="flex items-center w-full p-3 rounded-lg text-gray-600 hover:bg-gray-100">
            <LogOut className="w-6 h-6 flex-shrink-0" />
            <span className="ml-4 font-semibold">Sair</span>
          </Link>
        </div>
        
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center p-2 rounded-lg mt-2">
            <div className="flex items-center p-2 rounded-lg">
                <img
                  src={user?.avatarUrl || userIcon}
                  alt={user?.name || 'User'}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                    <p className="text-xs text-gray-500">Olá,</p>
                    <p className="text-sm font-semibold text-gray-800">{user?.name || 'Fulano'}</p>
                </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 