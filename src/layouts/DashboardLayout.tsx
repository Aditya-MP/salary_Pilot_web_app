import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, DollarSign, TrendingUp, Briefcase, Newspaper, GraduationCap, Bot, LogOut } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function DashboardLayout() {
  const resetOnboarding = useAppStore((s) => s.resetOnboarding);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('salary-pilot-storage');
    window.location.href = '/';
  };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard/salary-splitting', icon: DollarSign, label: 'Salary Splitting' },
    { to: '/dashboard/quarterly-pulse', icon: TrendingUp, label: 'Quarterly Pulse' },
    { to: '/dashboard/portfolio', icon: Briefcase, label: 'Portfolio' },
    { to: '/dashboard/news', icon: Newspaper, label: 'News' },
    { to: '/dashboard/learning', icon: GraduationCap, label: 'Learning Hub' },
    { to: '/dashboard/ai-coach', icon: Bot, label: 'AI Coach' },
  ];

  return (
    <div className="flex h-screen bg-navy-950 overflow-hidden relative">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-mesh-gradient opacity-20 animate-pulse-slow" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <aside className="relative z-20 w-72 m-4 flex flex-col glass-panel rounded-3xl overflow-hidden shadow-2xl border-white/10">
        <div className="p-8 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-50" />
          <div className="relative z-10">
            <h1 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              SalaryPilot
            </h1>
            <p className="text-xs text-slate-400 mt-2 font-medium tracking-wide uppercase">Financial Autopilot</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${isActive
                  ? 'bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)] border border-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              <item.icon size={22} className={`transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`} />
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
              {/* Active Indicator */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-400 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-300 opacity-0 group-[.active]:opacity-100" />
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 bg-black/20">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 px-4 py-3.5 w-full rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 border border-transparent hover:border-red-500/20"
          >
            <LogOut size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Reset & Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 relative z-10 m-4 ml-0 rounded-3xl overflow-hidden glass-panel border-white/5 shadow-2xl">
        <div className="h-full overflow-y-auto custom-scrollbar p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
