'use client';

import { useState } from 'react';
import { LayoutDashboard, PieChart, GraduationCap, Menu, BarChart3, TrendingUp, CreditCard, Shield, User, ChevronDown, Search, Wallet } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MENU_ITEMS = [
  { name: 'Planning', icon: LayoutDashboard, path: '/' },
  { name: 'Dashboard', icon: BarChart3, path: '/dashboard' },
  { name: 'Portfolio', icon: PieChart, path: '/portfolio' },
  { name: 'Investments', icon: TrendingUp, path: '/investing-complete' },
  { name: 'Education', icon: GraduationCap, path: '/learn' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#0F172A]">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 h-full bg-[#0F172A] border-r border-slate-800 pt-8 px-5 w-72 transform transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center mb-10 px-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20">
              <Wallet size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold tracking-tight">Salary Pilot</h1>
              <p className="text-slate-500 text-xs font-medium">Wealth Manager</p>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto pb-10">
            <ul className="space-y-1">
              {MENU_ITEMS.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <li key={item.name}>
                    <Link href={item.path}>
                      <div
                        className={`flex items-center px-4 py-3 rounded-xl transition-all cursor-pointer group ${isActive
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                            : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                      >
                        <item.icon
                          size={18}
                          className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}
                        />
                        <span className="ml-3 font-medium text-sm">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile Section - Simplified */}
          <div className="mt-auto mb-6">
            <div className="flex items-center p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                <User size={16} className="text-slate-400" />
              </div>
              <div className="ml-3 flex-1 overflow-hidden">
                <p className="text-white font-medium text-sm truncate">Aditya</p>
                <p className="text-slate-500 text-xs truncate">Pro Plan</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/80 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-[#0F172A] relative">
        {/* Background gradients */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}