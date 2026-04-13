import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, Bell, Search, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar role={role} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="lg:ml-80 min-h-screen transition-all duration-500 flex flex-col pt-4 pr-4 pb-4">
        {/* Top Header */}
        <header className="bg-card border border-border rounded-[2rem] px-8 py-4 flex items-center justify-between shadow-sm mb-6 sticky top-4 z-40">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-3 bg-primary/5 rounded-2xl text-primary hover:bg-primary/10 transition-all border border-primary/10"
                >
                    <Menu size={20} />
                </button>
                <div className="hidden md:flex items-center gap-3 bg-muted/50 px-6 py-2.5 rounded-2xl border border-border group focus-within:bg-white focus-within:border-primary/20 transition-all">
                    <Search size={16} className="text-muted-foreground group-focus-within:text-primary" />
                    <input 
                        type="text" 
                        placeholder="Search registry..." 
                        className="bg-transparent border-none focus:outline-none text-xs font-bold tracking-tight w-48"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="p-3 text-muted-foreground hover:bg-muted rounded-2xl transition-all relative">
                    <Bell size={20} />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
                </button>
                <div className="h-8 w-[1px] bg-border mx-2"></div>
                <div className="flex items-center gap-4 pl-2">
                    <div className="hidden sm:block text-right">
                        <p className="text-xs font-black text-foreground">{user?.name}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">{role} Access</p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-secondary text-primary-foreground flex items-center justify-center font-black shadow-lg shadow-secondary/10 rotate-3 border-2 border-white">
                        {user?.name?.charAt(0)}
                    </div>
                </div>
            </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 px-2 pb-8">
            {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
