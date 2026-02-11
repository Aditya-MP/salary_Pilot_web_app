import DashboardLayout from '@/components/dashboard-layout';

export default function PortfolioPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <h1 className="text-2xl font-bold text-white mb-6">Portfolio</h1>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <p className="text-white/70">Your investment portfolio will be displayed here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}