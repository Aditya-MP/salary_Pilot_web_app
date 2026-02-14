import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, DollarSign, TrendingUp, Briefcase, Newspaper, GraduationCap, Bot, LogOut } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function DashboardLayout() {
  const resetOnboarding = useAppStore((s) => s.resetOnboarding);

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
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-blue-500/20 flex flex-col">
        <div className="p-6 border-b border-blue-500/20">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Salary Pilot
          </h1>
          <p className="text-xs text-gray-400 mt-1">Financial Autopilot</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-500/20">
          <button
            onClick={resetOnboarding}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Reset & Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
