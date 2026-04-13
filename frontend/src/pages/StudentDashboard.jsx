import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Sparkles, MapPin, Clock, CreditCard, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const StudentProfile = () => {
    const { user } = useAuth();
    const [memberData, setMemberData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemberData = async () => {
            if (!user?.memberId) {
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/members/${user.memberId}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    setMemberData(data);
                } else {
                    toast.error(data.message || 'Failed to load member details');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMemberData();
    }, [user]);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary text-[8px] font-black uppercase tracking-widest">
                        <Sparkles size={10} /> Aspirant Profile
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-foreground font-serif tracking-tight italic">Peaceful <span className="text-primary">Journey</span>, {user?.name.split(' ')[0]}</h1>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card border border-border p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                        <h3 className="text-xl font-black font-serif italic mb-8">Membership Status</h3>
                        {memberData ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <InfoBox 
                                    icon={<Clock className="text-primary" />} 
                                    label="Current Plan" 
                                    value={memberData.planType.charAt(0).toUpperCase() + memberData.planType.slice(1)} 
                                    sub={`Expires ${new Date(memberData.expiryDate).toLocaleDateString()}`} 
                                />
                                <InfoBox 
                                    icon={<MapPin className="text-secondary" />} 
                                    label="Assigned Seat" 
                                    value={memberData.seatId?.seatNumber || 'Allocating...'} 
                                    sub={memberData.seatId?.type ? `${memberData.seatId.type.toUpperCase()} Zone` : 'Pending Placement'} 
                                />
                                <InfoBox 
                                    icon={<CreditCard className="text-accent" />} 
                                    label="Fee Status" 
                                    value={memberData.feeStatus.toUpperCase()} 
                                    sub={memberData.feeStatus === 'paid' ? 'Account in Good Standing' : 'Payment Required Soon'} 
                                />
                                <InfoBox 
                                    icon={<BookOpen className="text-primary" />} 
                                    label="Sanctuary Status" 
                                    value={memberData.isActive ? 'Active Member' : 'Inactive'} 
                                    sub={memberData.isActive ? 'Access Granted' : 'Access Restricted'} 
                                />
                            </div>
                        ) : (
                            <div className="p-8 bg-muted/20 rounded-2xl text-center">
                                <p className="text-muted-foreground italic">No membership data found. Please contact the registrar.</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-primary/5 border border-primary/10 p-10 rounded-[3rem] relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg rotate-3 group-hover:rotate-0 transition-all">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="text-xl font-black font-serif italic text-primary">Scholarly Focus</h3>
                        </div>
                        <p className="text-foreground/70 font-serif italic leading-relaxed text-lg max-w-2xl">
                            "True silent study is the bridge between chaotic thought and crystallized success. Your dedication is the key to mastery."
                        </p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-card border border-border p-10 rounded-[3rem] shadow-xl">
                        <h3 className="text-lg font-black font-serif italic mb-6">QR Attendance</h3>
                        <div className="aspect-square bg-muted/30 rounded-[2.5rem] border-4 border-dashed border-border flex flex-col items-center justify-center p-8 text-center gap-4 group hover:border-primary/20 transition-colors">
                            <div className="w-full h-full bg-white rounded-3xl shadow-inner flex items-center justify-center p-4">
                                <div className="w-full h-full border-4 border-muted rounded-xl bg-muted/10 opacity-40 flex items-center justify-center">
                                    <Sparkles size={48} className="text-muted/20" />
                                </div>
                            </div>
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-relaxed">Scan at entrance <br /> for quick check-in</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoBox = ({ icon, label, value, sub }) => (
    <div className="space-y-3 p-6 bg-muted/20 rounded-[2rem] border border-transparent hover:border-border transition-all hover:bg-white">
        <div className="bg-card w-10 h-10 rounded-xl flex items-center justify-center shadow-inner">{icon}</div>
        <div>
            <p className="text-[9px] font-black uppercase text-muted-foreground/50 tracking-widest mb-1">{label}</p>
            <p className="text-base font-black text-foreground tracking-tight">{value}</p>
            <p className="text-[9px] font-bold text-muted-foreground italic mt-0.5">{sub}</p>
        </div>
    </div>
);

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <Routes>
        <Route index element={<StudentProfile />} />
        <Route path="seat" element={<div className="p-8"><h2 className="text-2xl font-black font-serif italic text-foreground">My Allocated Sanctuary Node</h2><p className="text-muted-foreground mt-4 italic font-serif opacity-60 italic font-serif">Mapping your study focus area...</p></div>} />
        <Route path="books" element={<div className="p-8"><h2 className="text-2xl font-black font-serif italic text-foreground">Personal Collection</h2><p className="text-muted-foreground mt-4 italic font-serif opacity-60 italic font-serif">Wisdom curations currently under your guidance...</p></div>} />
        <Route path="payments" element={<div className="p-8"><h2 className="text-2xl font-black font-serif italic text-foreground">Contribution Registry</h2><p className="text-muted-foreground mt-4 italic font-serif opacity-60 italic font-serif">Tracking your investment in mastery...</p></div>} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StudentDashboard;
