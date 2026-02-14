import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import OnboardingFlow from './pages/OnboardingFlow';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import SalarySplitting from './pages/SalarySplitting';
import TripleGuard from './pages/TripleGuard';
import QuarterlyPulse from './pages/QuarterlyPulse';
import Portfolio from './pages/Portfolio';
import News from './pages/News';
import Learning from './pages/Learning';
import AICoach from './pages/AICoach';
import RiskProfile from './pages/RiskProfile';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';

function App() {
  const onboardingCompleted = useAppStore((s) => s.onboardingCompleted);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        {/* Onboarding */}
        <Route path="/onboarding" element={<OnboardingFlow />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          onboardingCompleted ? <DashboardLayout /> : <Navigate to="/onboarding" replace />
        }>
          <Route index element={<Dashboard />} />
          <Route path="salary-splitting" element={<SalarySplitting />} />
          <Route path="risk-profile" element={<RiskProfile />} />
          <Route path="triple-guard" element={<TripleGuard />} />
          <Route path="quarterly-pulse" element={<QuarterlyPulse />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="news" element={<News />} />
          <Route path="learning" element={<Learning />} />
          <Route path="ai-coach" element={<AICoach />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
