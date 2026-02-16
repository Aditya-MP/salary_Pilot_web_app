import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, DollarSign, TrendingUp, Briefcase, Newspaper, GraduationCap, Bot, LogOut, Sparkles, User, Crown } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function DashboardLayout() {
  const isPremium = useAppStore((s) => s.isPremium);
  const togglePremium = useAppStore((s) => s.togglePremium);

  const handleLogout = () => {
    localStorage.removeItem('salary-pilot-storage');
    window.location.href = '/';
  };

  const premiumRoutes = ['/dashboard/quarterly-pulse', '/dashboard/learning', '/dashboard/ai-coach'];

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard/salary-splitting', icon: DollarSign, label: 'Salary Splitting' },
    { to: '/dashboard/quarterly-pulse', icon: TrendingUp, label: 'Quarterly Pulse' },
    { to: '/dashboard/portfolio', icon: Briefcase, label: 'Portfolio' },
    { to: '/dashboard/news', icon: Newspaper, label: 'News' },
    { to: '/dashboard/learning', icon: GraduationCap, label: 'Learning Hub' },
    { to: '/dashboard/ai-coach', icon: Bot, label: 'AI Coach' },
    { to: '/dashboard/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex h-screen overflow-hidden relative bg-[#0a0f1a]">
      {/* Ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <aside className="relative z-20 w-72 m-3 flex flex-col bg-[#111827]/90 backdrop-blur-2xl border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl">
        {/* Sidebar header */}
        <div className="p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/10" />
          <div className="relative z-10 flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="text-emerald-400" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-white tracking-tight">SalaryPilot</h1>
              <p className="text-[10px] text-emerald-400/70 font-medium tracking-widest uppercase">Financial Autopilot</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems
            .filter((item) => isPremium || !premiumRoutes.includes(item.to))
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 text-sm ${isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isActive ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white/5 text-slate-400 group-hover:bg-white/10'}`}>
                      <item.icon size={16} />
                    </div>
                    <span className="font-medium tracking-wide">{item.label}</span>
                    {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-l-full" />}
                  </>
                )}
              </NavLink>
            ))}
        </nav>

        <div className="p-3 border-t border-white/[0.06] space-y-1">
          {/* Premium toggle */}
          <button onClick={togglePremium}
            className={`group flex items-center gap-3 px-3.5 py-3 w-full rounded-xl transition-all duration-300 text-sm border ${isPremium
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'text-slate-500 hover:text-amber-400 hover:bg-amber-500/5 border-transparent hover:border-amber-500/20'
              }`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isPremium ? 'bg-gradient-to-br from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/30' : 'bg-white/5 group-hover:bg-amber-500/10'
              }`}>
              <Crown size={16} />
            </div>
            <span className="font-medium">Premium</span>
            {/* Toggle pill */}
            <div className={`ml-auto w-9 h-5 rounded-full transition-all duration-300 relative ${isPremium ? 'bg-amber-500' : 'bg-white/10'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${isPremium ? 'left-[18px]' : 'left-0.5'}`} />
            </div>
          </button>

          {/* Logout */}
          <button onClick={handleLogout}
            className="group flex items-center gap-3 px-3.5 py-3 w-full rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 border border-transparent hover:border-red-500/20">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-red-500/20 transition-all">
              <LogOut size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            </div>
            <span className="text-sm font-medium">Reset & Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 relative z-10 m-3 ml-0 rounded-2xl overflow-hidden bg-[#111827]/60 backdrop-blur-xl border border-white/[0.06] shadow-2xl">
        <div className="h-full overflow-y-auto custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
