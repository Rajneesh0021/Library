import React, { useState, useEffect } from 'react';
import { Search, Plus, UserPlus, Mail, Phone, MapPin, MoreVertical, Filter, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const AdminMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/members`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    setMembers(data);
                } else {
                    toast.error(data.message || 'Failed to fetch members');
                    // Fallback to dummy if server is empty
                    setMembers([
                        { _id: '1', name: 'Aman Singh', email: 'aman@edu.in', phone: '8887725829', planType: 'Cultivate', seatId: 'S-12', expiryDate: '2024-08-12', isActive: true },
                        { _id: '2', name: 'Priya Verma', email: 'priya@edu.in', phone: '9721027444', planType: 'Sower', seatId: 'S-05', expiryDate: '2024-05-15', isActive: true },
                        { _id: '3', name: 'Rahul Dev', email: 'rahul@shanti.in', phone: '7788990011', planType: 'Harvest', seatId: 'S-42', expiryDate: '2025-04-01', isActive: false },
                    ]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    const filteredMembers = members.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black font-serif italic text-foreground tracking-tight">Member <span className="text-primary">Registry</span></h1>
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground mt-2">Managing {members.length} active aspirants</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-muted text-foreground px-6 py-3.5 rounded-2xl font-bold text-xs border border-border hover:bg-muted/70 transition-all">
                        <Download size={18} /> Export
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/95 transition-all">
                        <UserPlus size={18} /> Add Student
                    </button>
                </div>
            </header>

            {/* Filters */}
            <div className="bg-card border border-border p-4 rounded-[2rem] shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search by name, email or seat..."
                        className="w-full pl-16 pr-8 py-4 bg-muted/30 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-4 bg-muted/30 rounded-2xl border border-transparent hover:border-border transition-all flex items-center gap-2 text-sm font-bold text-muted-foreground">
                        <Filter size={18} /> Type
                    </button>
                    <button className="px-6 py-4 bg-muted/30 rounded-2xl border border-transparent hover:border-border transition-all flex items-center gap-2 text-sm font-bold text-muted-foreground">
                        <Filter size={18} /> Status
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Student Info</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Plan & Seat</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Renewal Date</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {filteredMembers.map((member) => (
                                <tr key={member._id} className="hover:bg-muted/10 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform ${member.isActive ? 'bg-primary' : 'bg-muted text-muted-foreground'}`}>
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-foreground">{member.name}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black uppercase text-secondary tracking-widest">{member.planType}</span>
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                                <MapPin size={12} className="text-primary" /> {member.seatId || 'N/A'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-xs font-bold text-foreground">{new Date(member.expiryDate).toLocaleDateString()}</p>
                                        <p className="text-[10px] font-bold text-red-500/60 uppercase">
                                            {new Date(member.expiryDate) < new Date() ? 'Expired' : 'Active'}
                                        </p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            member.isActive 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-red-100 text-red-700'
                                        }`}>
                                            {member.isActive ? 'Enrolled' : 'Suspended'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <button className="p-2.5 bg-muted/40 hover:bg-muted rounded-xl transition-all text-muted-foreground">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminMembers;
