import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  LayoutDashboard, 
  MapPin, 
  BookOpen, 
  History, 
  LogOut, 
  Settings,
  ChevronRight,
  UserCircle,
  Library,
  Sparkles,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ role, isOpen, setIsOpen }) => {
  const { logout, user } = useAuth();

  const adminLinks = [
    { name: 'Overview', path: '/admin-dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Members', path: '/admin-dashboard/members', icon: <Users size={20} /> },
    { name: 'Seat Layout', path: '/admin-dashboard/seats', icon: <MapPin size={20} /> },
    { name: 'Book Inventory', path: '/admin-dashboard/books', icon: <BookOpen size={20} /> },
    { name: 'Admission Requests', path: '/admin-dashboard/requests', icon: <History size={20} /> },
  ];

  const studentLinks = [
    { name: 'My Profile', path: '/student-dashboard', icon: <UserCircle size={20} /> },
    { name: 'My Seat', path: '/student-dashboard/seat', icon: <MapPin size={20} /> },
    { name: 'Issued Books', path: '/student-dashboard/books', icon: <BookOpen size={20} /> },
    { name: 'Payment History', path: '/student-dashboard/payments', icon: <History size={20} /> },
  ];

  const links = role === 'admin' ? adminLinks : studentLinks;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`fixed top-4 left-4 bottom-4 w-72 bg-card border border-border rounded-[2.5rem] shadow-2xl z-50 transition-all duration-500 flex flex-col overflow-hidden ${isOpen ? 'translate-x-0' : '-translate-x-[110%] lg:translate-x-0'}`}>
        {/* Sidebar Header */}
        <div className="p-8 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 rotate-3">
                    <Library size={24} />
                </div>
                <div>
                    <h2 className="text-lg font-black font-serif italic text-foreground tracking-tight leading-none uppercase">Shanti</h2>
                    <p className="text-[10px] font-black uppercase text-muted-foreground/40 tracking-[0.2em] mt-1">Registry</p>
                </div>
            </div>
            <button 
                className="lg:hidden p-2 text-muted-foreground hover:bg-muted rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
            >
                <X size={20} />
            </button>
        </div>

        {/* User Card */}
        <div className="mx-6 my-4 p-5 bg-primary/5 rounded-3xl border border-primary/10">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-primary-foreground font-black shadow-inner">
                    {user?.name?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-foreground truncate">{user?.name}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{role}</p>
                </div>
            </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto scroll-hide">
            {links.map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    end
                    onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                    className={({ isActive }) => `
                        flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group
                        ${isActive 
                            ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20 translate-x-1' 
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:translate-x-1'}
                    `}
                >
                    <div className="flex items-center gap-4">
                        <span className={`${link.icon ? '' : 'hidden'}`}>{link.icon}</span>
                        <span className="text-sm font-bold tracking-tight">{link.name}</span>
                    </div>
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                </NavLink>
            ))}
        </nav>

        <div className="p-4 mt-auto">
            <div className="bg-accent/10 p-5 rounded-3xl mb-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent/10 rounded-full blur-xl -mr-8 -mt-8"></div>
                <div className="flex items-center gap-2 text-accent mb-2">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Efficiency Mode</span>
                </div>
                <p className="text-[10px] text-accent/60 font-bold leading-relaxed italic">Optimize your study sessions today.</p>
            </div>
            
            <button 
                onClick={logout}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-all font-bold text-sm"
            >
                <LogOut size={18} />
                <span>Exit Sanctuary</span>
            </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
