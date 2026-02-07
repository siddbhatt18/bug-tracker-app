import { 
  LayoutDashboard, 
  Layers, 
  LogOut, 
  Ticket, 
  Settings, 
  Users, 
  BarChart3, 
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';

const Sidebar = ({ onClose, isCollapsed, toggleCollapse }) => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'My Tickets', icon: Ticket, path: '#' },
    { name: 'Team Members', icon: Users, path: '#' },
    { name: 'Analytics', icon: BarChart3, path: '#' },
    { name: 'Messages', icon: MessageSquare, path: '#' },
    { name: 'Settings', icon: Settings, path: '#' },
  ];

  const handleLinkClick = (e, path) => {
    if (onClose) onClose(); // Close on mobile
    if (path === '#') {
      e.preventDefault();
      toast('Feature coming soon!', { icon: '🚧' });
    }
  };

  return (
    <div className="h-full bg-slate-900 text-white flex flex-col shadow-xl relative">
      
      {/* Desktop Collapse Button */}
      <button 
        onClick={toggleCollapse}
        className="hidden md:flex absolute -right-3 top-10 bg-blue-600 rounded-full p-1 text-white shadow-lg hover:bg-blue-700 transition"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} border-b border-slate-800 transition-all`}>
        <Layers className="text-blue-500 flex-shrink-0" size={28} />
        {!isCollapsed && <span className="text-2xl font-bold tracking-tight whitespace-nowrap">BugTracker</span>}
      </div>

      {/* Menu */}
      <nav className="flex-1 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
        {!isCollapsed && (
          <p className="px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 transition-opacity duration-300">
            Menu
          </p>
        )}
        
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={(e) => handleLinkClick(e, item.path)}
            title={isCollapsed ? item.name : ''} // Tooltip when collapsed
            className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200 group ${
              location.pathname === item.path 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            } ${isCollapsed ? 'justify-center px-2' : ''}`}
          >
            <item.icon size={22} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
            {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.name}</span>}
          </Link>
        ))}

        {/* Fake "Projects" Section - Hide when collapsed */}
        {!isCollapsed && (
          <div className="pt-6 px-2 animate-fade-in">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Recent Projects
            </p>
            <div className="space-y-1">
              {['Website Redesign', 'Mobile App', 'Marketing API'].map((project, i) => (
                <button key={i} className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm transition-colors text-left">
                  <span className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-purple-500' : i === 1 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  <span className="truncate">{project}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <button 
          onClick={logout}
          title={isCollapsed ? "Logout" : ""}
          className={`flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-slate-900 w-full rounded-lg transition-all duration-200 group ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;