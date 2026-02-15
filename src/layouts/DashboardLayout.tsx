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
    <div className="flex h-screen bg-slate-50 overflow-hidden relative">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-mesh-gradient opacity-10 animate-pulse-slow mix-blend-multiply" />
      </div>

      <aside className="relative z-20 w-72 m-4 flex flex-col bg-white/70 backdrop-blur-2xl border border-slate-200/60 rounded-3xl overflow-hidden shadow-lg">
        <div className="p-8 border-b border-slate-200/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-blue-50 opacity-50" />
          <div className="relative z-10">
            <h1 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              SalaryPilot
            </h1>
            <p className="text-xs text-slate-500 mt-2 font-medium tracking-wide uppercase">Financial Autopilot</p>
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
                  ? 'bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-200/50'
                  : 'text-slate-500 hover:text-navy-900 hover:bg-slate-100 border border-transparent'
                }`
              }
            >
              <item.icon size={22} className={`transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`} />
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200/50 bg-slate-50/50">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 px-4 py-3.5 w-full rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 border border-transparent hover:border-red-200/50"
          >
            <LogOut size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Reset & Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 relative z-10 m-4 ml-0 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-xl border border-slate-200/50 shadow-lg">
        <div className="h-full overflow-y-auto custom-scrollbar p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
