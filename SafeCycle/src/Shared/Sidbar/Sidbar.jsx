import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  LogOut,
  Heart,
  ChevronDown,
  Settings,
} from 'lucide-react';
import useAuthContext from '../../Hooks/useAuthContext';
import useAxios from '../../Hooks/useAxios';

const Sidebar = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, LogOutUser } = useAuthContext();
  const [adminInfo, setAdminInfo] = useState(null);
  const axios = useAxios();
    const navigate = useNavigate();


const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { id: 'Volunteers', label: 'Volunteers', icon: UserCheck, path: '/admin/volunteers-list' },
    { id: 'Register Admin', label: 'Register Admin', icon: Users, path: '/admin/admin-register' },
    { id: 'Admin List', label: 'Admin List', icon: Users, path: '/admin/admin-list' },
    { id: 'Settings', label: 'Settings', icon: Settings, path: '/admin/settings' }
  ];

  const toggleDropdown = (menuId) => {
    setOpenDropdown(openDropdown === menuId ? null : menuId);
  };

  const getActiveItem = (path) => {
    return location.pathname === path;
  };

  // Fetch admin info by email from API
  useEffect(() => {
    const fetchAdminInfo = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get('/admin-register');
        const matched = res.data.find((admin) => admin.email === user.email);
        setAdminInfo(matched);
      } catch (error) {
        console.error('Failed to load admin info:', error);
      }
    };

    fetchAdminInfo();
  }, [user?.email]);

  return (
    <div className="bg-slate-900 text-white w-64 h-screen fixed left-0 top-0 z-50 flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Heart className="text-white" size={18} />
          </div>
          <div>
            <span className="font-bold text-lg">Admin Panel</span>
            <p className="text-xs text-slate-400">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-3 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-1">
            <Link
              to={item.path}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors group relative ${
                getActiveItem(item.path)
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>

              {item.children && (
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    openDropdown === item.id ? 'rotate-180' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(item.id);
                  }}
                />
              )}
            </Link>
          </div>
        ))}
      </nav>

      {/* Admin Info */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 mb-3">
          {adminInfo?.image ? (
            <img
              src={adminInfo.image}
              alt="Admin"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.displayName?.[0]}
              </span>
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{adminInfo?.name || user?.displayName}</p>
            <p className="text-xs text-slate-400">{adminInfo?.designation || 'Administrator'}</p>
          </div>
        </div>
        <button
         onClick={() => {
        LogOutUser();
        navigate("/login"); // ✅ navigate function call
      }}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-slate-300 hover:bg-red-600 hover:text-white"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
