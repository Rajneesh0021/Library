import React, { useState, useEffect } from 'react';
import { MapPin, CheckCircle, Clock, AlertTriangle, Sparkles, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const AdminSeats = () => {
    const { user } = useAuth();
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/seats`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setSeats(data);
                } else {
                    toast.error(data.message || 'Failed to fetch seats');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSeats();
    }, [user]);

    const stats = {
        total: seats.length,
        occupied: seats.filter(s => s.status === 'occupied').length,
        available: seats.filter(s => s.status === 'available').length,
    };

    if (loading) return <div className="p-8 text-center italic text-muted-foreground">Mapping sanctuary nodes...</div>;

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black font-serif italic text-foreground tracking-tight">Seat <span className="text-secondary">Orchestration</span></h1>
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground mt-2">Managing {stats.total} concentration nodes</p>
                </div>
                <div className="flex gap-4 bg-card border border-border p-2 rounded-2xl shadow-sm">
                    <div className="px-6 py-2 border-r border-border">
                        <p className="text-[8px] font-black uppercase text-muted-foreground mb-1">Total</p>
                        <p className="text-lg font-black text-foreground">{stats.total}</p>
                    </div>
                    <div className="px-6 py-2 border-r border-border">
                        <p className="text-[8px] font-black uppercase text-secondary mb-1">Sold</p>
                        <p className="text-lg font-black text-secondary">{stats.occupied}</p>
                    </div>
                    <div className="px-6 py-2">
                        <p className="text-[8px] font-black uppercase text-primary mb-1">Free</p>
                        <p className="text-lg font-black text-primary">{stats.available}</p>
                    </div>
                </div>
            </header>

            <div className="bg-card border border-border p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-secondary" />
                        <h2 className="text-lg font-black font-serif italic uppercase tracking-tight">Main Sanctuary Map</h2>
                    </div>
                    <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-md shadow-sm"></div> Occupied</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-muted/30 border border-border rounded-md"></div> Available</div>
                    </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-4">
                    {seats.map((seat) => (
                        <div 
                            key={seat._id}
                            className={`group relative aspect-square rounded-2xl border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-sm
                                ${seat.status === 'occupied' 
                                    ? 'bg-primary border-transparent text-primary-foreground shadow-primary/20' 
                                    : 'bg-muted/10 border-border/50 text-muted-foreground hover:bg-white hover:border-primary/30'}
                            `}
                        >
                            <span className="text-[10px] font-black ">{seat.seatNumber}</span>
                            {seat.status === 'occupied' ? (
                                <CheckCircle size={10} className="mt-1 opacity-60" />
                            ) : (
                                <div className="mt-1 w-1 h-1 bg-muted-foreground/20 rounded-full group-hover:bg-primary/40"></div>
                            )}

                            {/* Tooltip on hover */}
                            {seat.status === 'occupied' && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-foreground text-background rounded-xl text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none shadow-2xl">
                                    Occupied by: {seat.assignedMemberId?.name || 'Aspirant'}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-primary/5 border border-primary/10 p-8 rounded-[2.5rem] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary text-primary-foreground rounded-2xl shadow-lg rotate-3">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h4 className="text-lg font-black font-serif italic text-primary">Efficiency Warning</h4>
                            <p className="text-xs font-serif italic text-primary/60">High demand detected for Day-mode nodes. Consider auditing night shifts.</p>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/95 transition-all shadow-md">Run Audit</button>
                </div>

                <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-sm flex items-center justify-center text-center">
                    <div className="space-y-4">
                        <div className="mx-auto w-12 h-12 bg-muted/50 rounded-2xl flex items-center justify-center text-muted-foreground shadow-inner">
                            <Clock size={24} />
                        </div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-relaxed">Smart logic running <br /> <span className="text-secondary text-[8px]">Next evaluation in 4h</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSeats;
