import DashboardLayout from '@/components/dashboard-layout';

export default function LearnPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <h1 className="text-2xl font-bold text-white mb-6">Learning Center</h1>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <p className="text-white/70">Educational resources about investing and financial planning will be available here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}