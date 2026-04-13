import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, Sparkles, BookOpenCheck } from 'lucide-react';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
        // Real Backend Auth
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            login(data);
            toast.success(`Welcome back, ${data.name}`);
            navigate(data.role === 'admin' ? '/admin-dashboard' : '/student-dashboard');
        } else {
            toast.error(data.message || 'Login failed');
        }
    } catch (error) {
        toast.error('Connection error. Is the server running?');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* Zen Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md bg-card p-10 md:p-12 rounded-[3.5rem] shadow-2xl border border-border relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="flex flex-col items-center mb-10 space-y-4">
            <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20 rotate-3 group">
                <BookOpenCheck size={32} />
            </div>
            <div className="text-center">
                <h1 className="text-3xl font-black font-serif italic text-foreground tracking-tight">Portal Entry</h1>
                <p className="text-muted-foreground text-xs font-bold tracking-[0.2em] uppercase mt-2">Shanti Digital Library</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-2">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="student@shanti.in" 
                className="w-full pl-16 pr-8 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm transition-all" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-2">Passphrase</label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full pl-16 pr-8 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm transition-all" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-primary/95 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : (
                <>Enter Sanctuary <LogIn size={18} /></>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-border flex flex-col items-center gap-4 text-center">
            <p className="text-[10px] text-muted-foreground font-bold italic">"Focus is the gateway to Mastery."</p>
            <div className="flex items-center gap-2 text-primary">
                <Sparkles size={14} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Knowledge is Power</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
