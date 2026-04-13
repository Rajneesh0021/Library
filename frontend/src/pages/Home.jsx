import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Mail, 
  ShieldCheck, 
  Zap, 
  Wifi, 
  Coffee,
  Globe,
  Share2,
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpenCheck,
  Search,
  Book,
  PenTool
} from 'lucide-react';
import { toast } from 'react-toastify';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showRegModal, setShowRegModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [regData, setRegData] = useState({ name: '', email: '', phone: '', address: '' });
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message received. We will connect soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    toast.info(`Admission Request for ${selectedPlan} submitted.`, {
        icon: <BookOpenCheck className="text-primary" />
    });
    setShowRegModal(false);
    setRegData({ name: '', email: '', phone: '', address: '' });
  };

  const openRegModal = (plan) => {
    setSelectedPlan(plan);
    setShowRegModal(true);
  };

  return (
    <div className="font-sans text-foreground bg-background min-h-screen selection:bg-primary/10 relative overflow-hidden">
      {/* Zen Interactive Spotlight */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 zen-spotlight transition-opacity duration-1000"
        style={{ 
          '--x': `${mousePos.x}%`, 
          '--y': `${mousePos.y}%`,
          opacity: 1
        }}
      ></div>

      {/* Static Background Drifts */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] left-[5%] animate-drift opacity-[0.03] blur-[120px] w-[500px] h-[500px] bg-primary rounded-full"></div>
          <div className="absolute bottom-[20%] right-[10%] animate-drift opacity-[0.03] blur-[120px] w-[600px] h-[600px] bg-secondary rounded-full" style={{ animationDelay: '-5s' }}></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'} px-6 flex justify-between items-center`}>
        <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-sm group-hover:rotate-12 transition-transform">
                <BookOpenCheck size={18} />
            </div>
            <div className="text-lg font-black text-primary tracking-tighter uppercase font-serif">SHANTI DIGITAL LIBRARY</div>
        </div>
        
        <div className="hidden lg:flex gap-8 font-bold text-[10px] uppercase tracking-widest text-muted-foreground/60">
          <a href="#home" className="hover:text-primary transition-colors">Intro</a>
          <a href="#about" className="hover:text-primary transition-colors">Facilities</a>
          <a href="#packages" className="hover:text-primary transition-colors">Plans</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
        
        <Link to="/login" className="text-primary-foreground px-5 py-2 rounded-lg font-bold hover:bg-primary/90 transition-all text-sm uppercase tracking-wider shadow-lg shadow-primary/20 relative z-20">
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-40 pb-20 px-6 z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase animate-slide-up">
                <Sparkles size={12} className="animate-pulse" /> Knowledge Sanctuary
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground font-serif animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Cultivating <span className="text-primary italic relative">Silence<span className="absolute -bottom-1 left-0 w-full h-1 bg-accent/20 rounded-full"></span></span>, <br />
              Masterpiece <span className="text-secondary/80 italic">Success.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed font-light max-w-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Designed for deep concentration and academic excellence. Your quiet sanctuary for scholarly breakthroughs.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <a href="#packages" className="button-calm bg-primary text-primary-foreground text-base group px-8">
                    Start Journey <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#about" className="button-calm bg-white/50 backdrop-blur-sm border border-border text-foreground hover:bg-primary hover:text-white transition-all text-base px-8 font-semibold">
                    Tour Sanctuary
                </a>
            </div>
          </div>
          
          <div className="flex-1 relative page-turn-wrapper group animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative w-full aspect-[4/5] md:aspect-square border-[3px] border-card shadow-2xl rounded-[3rem] overflow-hidden page-turn shadow-primary/5">
                <img 
                    src="book_bg.jpg" 
                    alt="Library Sanctuary" 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1507842217351-5835b719524e?auto=format&fit=crop&q=80&w=2070";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
                
               </div>
            
            {/* Minimal Detail */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-3xl shadow-2xl flex items-center gap-4 border border-border group-hover:translate-x-2 transition-transform duration-500">
                <div className="bg-secondary/10 p-3 rounded-2xl text-secondary"><Wifi size={24} /></div>
                <div>
                    <h4 className="font-serif font-black text-lg italic leading-none">High Speed</h4>
                    <p className="text-[8px] text-muted-foreground font-bold tracking-[0.2em] uppercase mt-2">Gigabit Network</p>
                </div>
            </div>
            
            {/* Interactive Badge */}
            <div className="absolute -top-6 -right-6 bg-accent text-foreground p-5 rounded-full shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500 border-4 border-card">
                <ShieldCheck size={28} />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="about" className="py-24 bg-muted/20 relative z-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32"></div>
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-black font-serif italic text-foreground leading-tight">Where Focus <span className="text-primary">Resides</span></h2>
                <div className="h-1 w-20 bg-accent/20 mx-auto rounded-full"></div>
                <p className="text-muted-foreground text-sm italic">Engineered for the modern aspirant who seeks silence.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <FacilityCard icon={<Wifi />} title="Fiber Internet" desc="Ultra-fast connection for lag-free research sessions." delay="0.1s" />
                <FacilityCard icon={<ShieldCheck />} title="24/7 Safety" desc="CCTV surveillance for a secure study environment." delay="0.2s" />
                <FacilityCard icon={<Search />} title="Quiet Zone" desc="Strict silence protocol enforced for maximum focus." delay="0.3s" />
                <FacilityCard icon={<Coffee />} title="Break Area" desc="Dedicated space for hydration and quick breaks." delay="0.4s" />
            </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-24 px-6 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black font-serif italic text-foreground leading-tight">Sanctuary <span className="text-accent underline underline-offset-8 decoration-accent/10">Access</span></h2>
            <p className="text-muted-foreground text-sm italic">Structured plans for consistent mastery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <PackageCard 
                title="Sower" 
                time="1 Month" 
                price="₹600" 
                features={["30 Days Standard", "Fibre WiFi", "Ergonomic Desk", "RO Water"]}
                color="border-border hover:border-primary/20 bg-card/50"
                onClick={() => openRegModal('Sower Plan')}
            />
            <PackageCard 
                title="Cultivate" 
                time="6 Months" 
                price="₹3200" 
                features={["180 Days Priority", "Fixed Desk", "Prime Utilities", "Silent Pack"]}
                color="border-primary bg-primary/5 shadow-2xl md:scale-105"
                popular
                onClick={() => openRegModal('Cultivate Plan')}
            />
            <PackageCard 
                title="Harvest" 
                time="1 Year" 
                price="₹6000" 
                features={["365 Days Mastery", "Choice Seat", "Member Support", "Annual Perk"]}
                color="border-border hover:border-primary/20 bg-card/50"
                onClick={() => openRegModal('Harvest Plan')}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/20 px-6 relative z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
                <h2 className="text-3xl md:text-4xl font-black font-serif italic mb-4">Visit our <span className="text-primary italic">Space</span></h2>
                <div className="h-1 w-16 bg-primary/10 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <ContactInfoItem icon={<MapPin />} label="Address" value="Lalpalpur, UP 241001" link="https://maps.app.goo.gl/5jZembwNV7EuU7gs6" />
              <ContactInfoItem icon={<Phone />} label="Primary" value="+91 88877 25829" link="tel:+918887725829" />
              <ContactInfoItem icon={<Phone />} label="Helpdesk" value="+91 97210 27444" link="tel:+919721027444" />
              <ContactInfoItem icon={<Mail />} label="Registry" value="shanti@study.in" link="mailto:rajneesh0021@gmail.com" />
            </div>

            <div className="w-full h-72 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-card relative group">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d458.9943736649105!2d80.19294623990515!3d27.323549504840575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1776050584562!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    className="grayscale group-hover:grayscale-0 transition-all duration-1000"
                    allowFullScreen="" 
                    loading="lazy" 
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-[3rem]"></div>
            </div>
          </div>

          <div className="bg-card p-10 md:p-12 rounded-[3.5rem] shadow-2xl space-y-8 border border-border relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl"></div>
            <h3 className="text-2xl font-black font-serif italic mb-2">Send Enquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-2">Your Name</label>
                <input 
                    type="text" 
                    placeholder="Enter full name" 
                    className="w-full px-8 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm transition-all" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-2">Email Address</label>
                <input 
                    type="email" 
                    placeholder="student@example.com" 
                    className="w-full px-8 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm transition-all" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-2">Message</label>
                <textarea 
                    placeholder="Tell us your study goal..." 
                    rows="4" 
                    className="w-full px-8 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm resize-none transition-all"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                ></textarea>
              </div>
              <button className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 active:scale-[0.98]">
                Submit Entry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background pt-20 pb-10 px-6 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-6 max-w-sm">
                <div className="flex items-center gap-2">
                    <BookOpenCheck size={28} className="text-accent" />
                    <h3 className="text-2xl font-black tracking-tighter uppercase font-serif">Shanti Library</h3>
                </div>
                <p className="text-background/40 text-sm font-serif italic">"Where the quiet mind finds its greatest strength. Dedicated to the pursuit of excellence in Lalpalpur."</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 font-bold text-[10px] uppercase tracking-[0.2em] text-background/30">
                <div className="flex flex-col gap-4">
                    <span className="text-accent/60">Nav</span>
                    <a href="#home" className="hover:text-background transition-colors">Intro</a>
                    <a href="#about" className="hover:text-background transition-colors">Space</a>
                    <a href="#packages" className="hover:text-background transition-colors">Plans</a>
                </div>
                <div className="flex flex-col gap-4">
                    <span className="text-secondary/60">Legal</span>
                    <Link to="/login" className="hover:text-background transition-colors">Privacy</Link>
                    <Link to="/login" className="hover:text-background transition-colors">Terms</Link>
                    <Link to="/login" className="hover:text-background transition-colors">Admission</Link>
                </div>
                <div className="flex flex-col gap-4">
                    <span className="text-primary/60">Registry</span>
                    <Link to="/login" className="text-white hover:text-accent transition-colors">Staff Login</Link>
                    <Link to="/login" className="text-white hover:text-accent transition-colors">Student Portal</Link>
                </div>
            </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-background/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-background/10 text-[8px] font-black uppercase tracking-[0.4em]">
            <span>&copy; 2026 Shanti Digital Library</span>
            <span>Est. 2024 &bull; Lalpalpur HQ</span>
        </div>
      </footer>

      {/* Admission Modal */}
      {showRegModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-foreground/70 backdrop-blur-md animate-in fade-in duration-500">
            <div className="bg-card w-full max-w-lg rounded-[3.5rem] p-10 md:p-12 shadow-2xl border border-border relative animate-in zoom-in-95 duration-500">
                <button 
                    onClick={() => setShowRegModal(false)}
                    className="absolute top-8 right-8 p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors text-muted-foreground"
                >
                    <X size={20} />
                </button>
                
                <div className="mb-10 space-y-2">
                    <div className="inline-flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest">
                        <CheckCircle2 size={12} /> Membership Registration
                    </div>
                    <h3 className="text-3xl font-black font-serif italic">{selectedPlan} Application</h3>
                    <p className="text-muted-foreground text-xs italic">Enter your scholarly details to begin the process.</p>
                </div>

                <form handleRegister={handleRegister} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 ml-2">Full Legal Name</label>
                        <input 
                            type="text" 
                            placeholder="Aman Singh" 
                            className="w-full px-8 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm"
                            value={regData.name}
                            onChange={(e) => setRegData({...regData, name: e.target.value})}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 ml-2">Email</label>
                            <input 
                                type="email" 
                                placeholder="name@edu.in" 
                                className="w-full px-8 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm"
                                value={regData.email}
                                onChange={(e) => setRegData({...regData, email: e.target.value})}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 ml-2">Phone Number</label>
                            <input 
                                type="tel" 
                                placeholder="88877 25XXX" 
                                className="w-full px-8 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm"
                                value={regData.phone}
                                onChange={(e) => setRegData({...regData, phone: e.target.value})}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 ml-2">Residential Address</label>
                        <textarea 
                            placeholder="Street, District, PIN Code" 
                            rows="2" 
                            className="w-full px-8 py-4 bg-muted/30 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white text-sm resize-none"
                            value={regData.address}
                            onChange={(e) => setRegData({...regData, address: e.target.value})}
                            required
                        ></textarea>
                    </div>
                    <button onClick={handleRegister} className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 mt-6 active:scale-[0.98]">
                        Confirm Admission Request
                    </button>
                    <p className="text-[8px] text-center text-muted-foreground/40 uppercase font-black tracking-[0.4em] mt-8 leading-relaxed">
                        Notice: Applications are reviewed by the library registrar. <br /> You will be contacted within 24 study hours.
                    </p>
                </form>
            </div>
        </div>
      )}

      {/* Floating Action Node */}
      <a 
        href="https://wa.me/918887725829" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-secondary text-primary-foreground p-5 rounded-full shadow-2xl hover:scale-110 hover:-rotate-12 transition-all z-50 group border-4 border-white/10"
      >
        <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background animate-pulse"></span>
      </a>
    </div>
  );
};

const FacilityCard = ({ icon, title, desc, delay }) => (
    <div 
        className="bg-card p-10 rounded-[2.5rem] border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group card-hover relative overflow-hidden"
        style={{ animationDelay: delay }}
    >
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="bg-secondary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 rotate-3 shadow-inner">
            {React.cloneElement(icon, { size: 28 })}
        </div>
        <h4 className="text-xl font-black mb-4 font-serif italic text-foreground tracking-tight">{title}</h4>
        <p className="text-muted-foreground text-xs font-medium leading-relaxed opacity-80">{desc}</p>
        
        <div className="mt-8 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Sparkles className="text-accent" size={16} />
        </div>
    </div>
);

const PackageCard = ({ title, time, price, features, color, popular, onClick }) => (
    <div className={`p-12 rounded-[3.5rem] border flex flex-col items-center text-center transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden ${color}`}>
        {popular && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-accent text-foreground px-6 py-1.5 rounded-b-2xl text-[9px] font-black uppercase tracking-[0.3em] shadow-lg">Most Balanced</div>
            </div>
        )}
        
        <div className="mb-10 relative">
            <h3 className="text-2xl font-black font-serif italic mb-1 group-hover:scale-110 transition-transform duration-500">{title} Access</h3>
            <p className="text-[10px] font-black uppercase text-secondary tracking-[0.3em]">{time} Duration</p>
        </div>
        
        <div className="text-5xl font-black mb-10 tracking-tighter flex items-center gap-1 group-hover:scale-105 transition-transform duration-500">
            <span className="text-xl font-serif text-muted-foreground/40 self-start mt-2">₹</span>
            {price.replace('₹', '')}
        </div>
        
        <ul className="space-y-5 mb-12 flex-1 w-full">
            {features.map((f, i) => (
                <li key={i} className="text-xs font-bold text-muted-foreground/80 flex items-center justify-center gap-2 group-hover:text-foreground transition-colors">
                    <div className="w-1 h-1 bg-accent rounded-full group-hover:scale-150 transition-transform"></div>
                    {f}
                </li>
            ))}
        </ul>
        
        <button onClick={onClick} className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all duration-500 shadow-xl active:scale-[0.98] ${
            popular ? 'bg-primary text-primary-foreground shadow-primary/30' : 'bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-primary/20'
        }`}>
            Register Now
        </button>
    </div>
);

const ContactInfoItem = ({ icon, label, value, link }) => (
    <a href={link} className="flex items-center gap-5 group">
        <div className="bg-card p-4 rounded-2xl shadow-xl border border-border text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:-rotate-12 transition-all duration-500">
            {React.cloneElement(icon, { size: 20 })}
        </div>
        <div>
            <p className="text-[9px] uppercase font-black tracking-[0.3em] text-muted-foreground/50 mb-1">{label}</p>
            <p className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{value}</p>
        </div>
    </a>
);

export default Home;
