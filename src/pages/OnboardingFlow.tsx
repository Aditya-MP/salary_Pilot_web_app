import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BootSequence } from '../features/onboarding/BootSequence';
import { UltraSplash } from '../features/onboarding/UltraSplash';
import { SalaryStep } from '../features/onboarding/SalaryStep';
import { RiskStep } from '../features/onboarding/RiskStep';

export default function OnboardingFlow() {
  const [step, setStep] = useState<'boot' | 'splash' | 'salary' | 'risk'>('boot');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-blue-500/30">
      {step === 'boot' && <BootSequence onComplete={() => setStep('splash')} />}
      {step === 'splash' && <UltraSplash onStart={() => setStep('salary')} />}
      {step === 'salary' && <SalaryStep onNext={() => navigate('/')} />}
    </div>
  );
}
