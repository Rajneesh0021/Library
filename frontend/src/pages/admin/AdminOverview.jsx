import React, { useState, useEffect } from 'react';
import { Users, Armchair, Calendar, DollarSign, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const AdminOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
      totalStudents: 0,
      seatRatio: '0/0',
      pendingRenewals: 0,
      revenue: '₹0'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/stats`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setStats(data);
            } else {
                toast.error(data.message || 'Failed to fetch registry stats');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    fetchStats();
  }, [user]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary text-[8px] font-black uppercase tracking-widest">
                    <Sparkles size={10} /> Administrative Console
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-foreground font-serif tracking-tight italic">Registry <span className="text-primary">Overview</span></h1>
            </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Students" value={stats.totalStudents} icon={<Users />} active />
            <StatCard title="Seats Taken" value={stats.seatRatio} icon={<Armchair />} />
            <StatCard title="Due Renewal" value={stats.pendingRenewals} icon={<Calendar />} />
            <StatCard title="Monthly Revenue" value={stats.revenue} icon={<DollarSign />} />
        </div>

        {/* Visuals */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 bg-card p-10 rounded-[2rem] shadow-lg border border-border">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div className="space-y-1">
                       <h3 className="text-xl font-black text-foreground font-serif italic tracking-tight">Main Sanctuary Mapping</h3>
                       <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Allocation Node Layout (Live)</p>
                    </div>
                    <div className="flex gap-4 text-[8px] font-black uppercase tracking-widest text-muted-foreground bg-muted/30 px-4 py-2 rounded-full">
                        <div className="flex items-center gap-2"><div className="h-2 w-2 bg-green-500/20 rounded-full border border-green-500/40"></div> Available</div>
                        <div className="flex items-center gap-2"><div className="h-2 w-2 bg-primary rounded-full"></div> Occupied</div>
                    </div>
                </div>
                
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                    {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={`aspect-square rounded-xl flex items-center justify-center text-[8px] font-black transition-all transform hover:scale-110 cursor-pointer shadow-xs border ${
                        i === 11 ? 'bg-primary text-primary-foreground border-transparent' : 'bg-muted/10 text-muted-foreground/40 border-border/30'
                        }`}
                    >
                        {i+1}
                    </div>
                    ))}
                    {[...Array(60)].map((_, i) => (
                        <div key={i+20} className="aspect-square rounded-xl bg-muted/5 border border-dashed border-border/20 flex items-center justify-center text-[8px] opacity-20">
                            {i+21}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="space-y-6">
                <div className="bg-primary text-primary-foreground p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                    <h3 className="text-xl font-black font-serif italic mb-4 relative z-10">Daily Focus</h3>
                    <p className="text-sm opacity-80 font-serif italic relative z-10 leading-relaxed border-l-2 border-accent/30 pl-4">
                        "The quality of your focus determines the level of your success. Registry current status: Stable."
                    </p>
                </div>
                <div className="bg-card p-8 rounded-[2rem] border border-border">
                    <h4 className="text-xs font-black uppercase tracking-widest mb-4">Quick Insights</h4>
                    <div className="space-y-3">
                        <ActivityItem label="Attendance Drift: Normal" />
                        <ActivityItem label="Sanctuary Health: 98%" />
                        <ActivityItem label="Fee Collection: Optimal" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, active }) => (
    <div className={`p-8 rounded-[2rem] border transition-all ${
        active ? 'bg-card border-primary/20 shadow-lg' : 'bg-card border-border'
    }`}>
      <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">{title}</p>
      <div className="flex items-center justify-between">
          <h4 className="text-2xl font-black text-foreground tracking-tighter">{value}</h4>
          <div className={`p-2 rounded-lg ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              {React.cloneElement(icon, { size: 18 })}
          </div>
      </div>
    </div>
);

const ActivityItem = ({ label }) => (
    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg text-[10px] font-bold">
        <span>{label}</span>
    </div>
);

export default AdminOverview;
