import { useState, useEffect } from "react";
import { calculateNetReturn, type AssetType } from "./engine/taxEngine";
import { calculateSustainabilityImpact } from "./engine/sustainabilityEngine";
import { useAppStore } from "./store/useAppStore";
import { type RiskType } from "./types";
import { analyzeMarket } from "./engine/trendEngine";
import { evaluateGuards } from "./engine/guardEngine";

type StepType = "boot" | "splash" | "salary" | "risk" | "pulse" | "approve" | "executed" | "dashboard";

function App() {
  const [step, setStep] = useState<StepType>("boot");
  const salary = useAppStore((s) => s.salary);
  const risk = useAppStore((s) => s.risk);

  // Handle boot sequence completion
  const handleBootComplete = () => {
    console.log("Boot complete, moving to splash");
    setStep("splash");
  };

  const handleStart = () => {
    console.log("Start clicked, moving to salary");
    setStep("salary");
  };

  console.log("Current step:", step);

  // Render Quarterly Pulse Step
  if (step === "pulse" && salary && risk) {
    const splits = {
      conservative: { stage: 0.4 },
      balanced: { stage: 0.3 },
      aggressive: { stage: 0.2 },
    };

    const stageAmount = Math.round(salary * splits[risk].stage);

    return (
      <QuarterlyPulse
        stageAmount={stageAmount}
        onNext={() => setStep("approve")}
      />
    );
  }

  if (step === "approve") {
    return (
      <ApproveInvestment
        onExecute={() => {
          console.log("Executing from App...");
          setStep("executed");
        }}
      />
    );
  }

  if (step === "executed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6 animate-fade">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-green-50 rounded-full">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4 tracking-tight">
            Investment Successful
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Funds allocated strategically using <span className="font-semibold text-black">Quarterly Pulse</span> and behavioral safeguards.
          </p>

          <button
            onClick={() => setStep("dashboard")}
            className="group bg-black text-white font-medium tracking-wide px-8 py-4 rounded-xl hover:scale-[1.02] transition-all duration-150 shadow-lg hover:shadow-black/20 flex items-center gap-2 mx-auto"
          >
            View Dashboard
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>
    );
  }

  if (step === "dashboard" && salary && risk) {
    return <Dashboard />;
  }

  // Render current step
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-blue-500/30">
      {step === "boot" && <BootSequence onComplete={handleBootComplete} />}

      {step === "splash" && <UltraSplash onStart={handleStart} />}

      {step === "salary" && (
        <SalaryStep
          onNext={() => setStep("risk")}
        />
      )}

      {step === "risk" && (
        <RiskStep
          onNext={() => setStep("pulse")}
        />
      )}
    </div>
  );
}

// --- Components ---

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "INITIALIZING SECURE ENVIRONMENT...",
    "LOADING FINANCIAL MODELS...",
    "CONNECTING TO NEURAL NETWORK...",
    "ESTABLISHING SECURE UPLINK...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    if (textIndex < texts.length) {
      const timeout = setTimeout(() => {
        setTextIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(onComplete, 500);
    }
  }, [textIndex, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-500 font-mono text-sm tracking-wider">
      <div className="w-64">
        {texts.slice(0, textIndex + 1).map((text, i) => (
          <div key={i} className="mb-2 transition-opacity duration-300">
            <span className="opacity-50 mr-2">{`>`}</span>
            {text}
          </div>
        ))}
        <div className="h-2 w-full bg-gray-900 mt-4 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300 ease-out"
            style={{ width: `${Math.min((textIndex / (texts.length - 1)) * 100, 100)}%` }}
          />
        </div>
      </div>
      <div className="absolute bottom-10 text-xs opacity-50 animate-pulse">
        ENCRYPTED CONNECTION ESTABLISHED
      </div>
    </div>
  );
}

function UltraSplash({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative min-h-screen bg-black selection:bg-white/20 overflow-hidden flex flex-col justify-between font-sans">

      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Gradient */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px] animate-pulse-slow" />

        {/* Bottom Gradient */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] animate-float" />

        {/* Perspective Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-50 transform perspective-1000 rotate-x-12 scale-150" />
      </div>

      {/* Top Ticker */}
      <div className="relative w-full overflow-hidden border-b border-white/5 bg-black/50 backdrop-blur-sm z-20">
        <div className="flex whitespace-nowrap animate-marquee py-2">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mx-4 text-xs font-mono tracking-[0.2em] text-gray-500 uppercase">
              AI-DRIVEN WEALTH • AUTOMATED SAVINGS • INTELLIGENT ALLOCATION • MARKET ANALYSIS •
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-10 md:mt-20">

        {/* Animated Badge */}
        <div className="mb-10 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
          <div className="relative group cursor-default">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative px-6 py-2 bg-black rounded-full border border-white/10 ring-1 ring-white/10 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-blink" />
              <span className="text-xs font-medium tracking-widest text-gray-300 uppercase">
                System Online
              </span>
            </div>
          </div>
        </div>

        {/* Hero Text */}
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-6 animate-fade-in-up opacity-0 mix-blend-overlay" style={{ animationDelay: "0.4s" }}>
          SALARY
          <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40"> PILOT</span>
        </h1>

        <p className="text-gray-400 max-w-2xl text-xl md:text-2xl font-light tracking-wide leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: "0.6s" }}>
          The operating system for your
          <span className="text-white font-normal mx-2 relative inline-block">
            financial future
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500/50" />
          </span>
          powered by advanced AI.
        </p>

        {/* CTA Section */}
        <div className="mt-16 animate-fade-in-up opacity-0" style={{ animationDelay: "0.8s" }}>
          <button
            onClick={onStart}
            className="group relative px-12 py-5 bg-white text-black text-lg font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <span className="relative flex items-center gap-3">
              INITIALIZE
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          <p className="mt-6 text-[10px] text-gray-600 font-mono uppercase tracking-widest opacity-60">
            v2.0 • Build 2409 • Secure
          </p>
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="relative w-full overflow-hidden border-t border-white/5 bg-black/50 backdrop-blur-sm z-20 mt-10">
        <div className="flex whitespace-nowrap animate-marquee-reverse py-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 mx-6">
              <span className="text-xs font-mono text-gray-500">BTC <span className="text-green-500">▲ 2.4%</span></span>
              <span className="text-xs font-mono text-gray-500">ETH <span className="text-green-500">▲ 1.8%</span></span>
              <span className="text-xs font-mono text-gray-500">S&P 500 <span className="text-green-500">▲ 0.5%</span></span>
              <span className="text-xs font-mono text-gray-500">NASDAQ <span className="text-red-500">▼ 0.2%</span></span>
              <span className="text-xs font-mono text-gray-500">GOLD <span className="text-green-500">▲ 0.1%</span></span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


function SalaryStep({ onNext }: { onNext: () => void; }) {
  const salary = useAppStore((s) => s.salary);
  const setSalary = useAppStore((s) => s.setSalary);

  console.log("Rendering SalaryStep");
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 animate-fade relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 text-center">
        <div className="mb-8 p-3 rounded-full bg-white/5 border border-white/10 w-fit mx-auto backdrop-blur-sm shadow-lg">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">Monthly Input</h2>
        <p className="text-gray-400 mb-10 text-lg font-light">
          Enter your <span className="text-white font-medium">monthly take-home</span> salary to calibrate the engine.
        </p>

        <div className="relative mb-12 group">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-light text-gray-500 transition-colors group-focus-within:text-white">$</span>
          <input
            type="number"
            placeholder="0.00"
            value={salary ?? ""}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full bg-transparent border-b-2 border-gray-800 text-5xl md:text-6xl font-bold py-4 pl-12 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-800 text-white"
            autoFocus
          />
        </div>

        <button
          disabled={!salary}
          onClick={onNext}
          className={`w-full py-5 rounded-full font-bold text-lg transition-all duration-300 ${salary
            ? "bg-white text-black hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            : "bg-gray-900 text-gray-600 cursor-not-allowed"
            }`}
        >
          Confirm Calibration
        </button>
      </div>
    </div>
  );
}

function RiskStep({ onNext }: { onNext: () => void; }) {
  const selected = useAppStore((s) => s.risk);
  const setSelected = useAppStore((s) => s.setRisk);

  const risks: { id: RiskType; title: string; desc: string; icon: any }[] = [
    {
      id: "conservative",
      title: "Conservative",
      desc: "Capital preservation focused. Low volatility.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: "balanced",
      title: "Balanced",
      desc: "Balanced growth and standard stability.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    {
      id: "aggressive",
      title: "Aggressive",
      desc: "Maximum growth potential. Higher volatility.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 animate-fade">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Risk Profile</h2>
          <p className="text-gray-400">Select your preferred <span className="text-white font-medium">volatility tolerance</span>.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {risks.map((risk) => (
            <button
              key={risk.id}
              onClick={() => setSelected(risk.id)}
              className={`relative group text-left border rounded-2xl p-6 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 ${selected === risk.id
                ? "bg-white text-black border-white ring-2 ring-white/50 ring-offset-2 ring-offset-black scale-105 z-10"
                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white"
                }`}
            >
              <div className={`mb-4 p-3 rounded-full w-fit ${selected === risk.id ? "bg-black/10 text-black" : "bg-white/10 text-white"}`}>
                {risk.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{risk.title}</h3>
              <p className={`text-sm leading-relaxed ${selected === risk.id ? "text-gray-700" : "text-gray-500"}`}>{risk.desc}</p>

              {selected === risk.id && (
                <div className="absolute top-4 right-4 text-black animate-fade-in-up">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          disabled={!selected}
          onClick={onNext}
          className={`w-full py-5 rounded-full font-bold text-lg transition-all duration-300 max-w-md mx-auto block ${selected
            ? "bg-white text-black hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            : "bg-gray-900 text-gray-600 cursor-not-allowed"
            }`}
        >
          Finalize Profile
        </button>
      </div>
    </div>
  );
}


function QuarterlyPulse({
  stageAmount,
  onNext,
}: {
  stageAmount: number;
  onNext: () => void;
}) {
  const [pulseActive, setPulseActive] = useState(true);
  const pulseData = useAppStore((s) => s.pulse);
  const advancePulse = useAppStore((s) => s.advancePulse);

  const [trend, setTrend] = useState<null | any>(null);

  const progress = (pulseData.month / 3) * 100;

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-6 font-sans animate-fade">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2">Quarterly Pulse</h2>
        <p className="text-gray-500 mb-6 font-light">
          Stage your capital for 90 days before strategic market entry.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
          <span className="font-medium">Activate Pulse</span>
          <button
            onClick={() => setPulseActive(!pulseActive)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${pulseActive ? "bg-black text-white" : "bg-gray-300 text-gray-500"
              }`}
          >
            {pulseActive ? "ON" : "OFF"}
          </button>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 mb-6 shadow-md hover:shadow-lg transition bg-white">
          <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-semibold">Staging Vault</p>
          <p className="text-3xl font-bold tracking-tight">
            ${pulseData.totalStaged.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Accumulating low-risk liquid ESG assets
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-500 mb-2 font-medium">
            <span>Month {pulseData.month} / 3</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-black h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {pulseData.state === "strike" && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in-up">
              <p className="text-green-700 font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Strike Window Active
              </p>
              <p className="text-sm text-green-600 mt-1">
                Capital ready for bulk market execution. AI Trend Analysis Complete using local NPU.
              </p>
            </div>
          )}

          {trend && (
            <div className="mt-4 p-4 bg-gray-50 border rounded-xl animate-fade-in-up">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                Market Analysis Result
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">Confidence:</div>
                <div className="font-mono">{trend.confidence}%</div>
                <div className="text-gray-600">Volatility:</div>
                <div className="font-mono">{trend.volatility}</div>
                <div className="text-gray-600">Signal:</div>
                <div className={`font-bold ${trend.entrySignal === "strong" ? "text-green-600" : trend.entrySignal === "moderate" ? "text-yellow-600" : "text-red-500"}`}>
                  {trend.entrySignal.toUpperCase()}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Simulate Month Progress */}
        <button
          onClick={() => {
            advancePulse(stageAmount);

            // Allow state to update before checking strike - simplified logical check here
            // In a real app we'd use useEffect to watch pulseData.state
            if (pulseData.month === 2) { // Logic check: current is 2, next will be 3 (strike)
              setTrend(analyzeMarket());
            } else if (pulseData.state === "strike") {
              setTrend(analyzeMarket());
            }
          }}
          disabled={pulseData.state === "strike"}
          className={`w-full py-3 mb-3 border rounded-xl font-medium transition-all ${pulseData.state === "strike"
            ? "bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed"
            : "border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600"
            }`}
        >
          {pulseData.state === "strike" ? "Cycle Complete - Ready to Strike" : "Advance Month (Simulation)"}
        </button>

        <button
          onClick={onNext}
          className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-900 transition-all duration-150 hover:scale-[1.02] shadow-lg shadow-gray-200/50 tracking-wide"
        >
          Continue
        </button>
      </div>
    </div>
  );
}


function ApproveInvestment({
  onExecute,
}: {
  onExecute: () => void;
}) {
  const [emotion, setEmotion] = useState<"calm" | "stressed">("calm");
  const streakPass = useAppStore((s) => s.streakActive);
  const riskProfile = useAppStore((s) => s.risk);

  // Guard Logic
  const guardResult = evaluateGuards({
    emotion,
    streakActive: streakPass,
    riskProfile: riskProfile || "balanced",
  });

  // Derived states for UI
  const emotionalPass = emotion === "calm";

  // Tax Preview Calculation
  const previewAmount = 10000;
  const equity = calculateNetReturn(previewAmount, "equity");
  const crypto = calculateNetReturn(previewAmount, "crypto");
  const esg = calculateNetReturn(previewAmount, "esg");

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-6 font-sans animate-fade">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-black/5 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-3xl font-bold mb-2">Triple Guard Verification</h2>
          <p className="text-gray-500">
            System requires <span className="text-black font-semibold">Composite Score ≥ 0.75</span> to authorize execution.
          </p>
        </div>

        {/* Emotional Guard */}
        <div className={`border rounded-xl p-5 mb-4 transition-all duration-300 shadow-md hover:shadow-lg ${!emotionalPass ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-semibold flex items-center gap-2">
                1. Emotional Guard
                {emotionalPass && <span className="text-green-500 text-xs">● PASSED</span>}
              </p>
              <p className="text-xs text-gray-500 mt-1">Biometric & sentiment analysis</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setEmotion("calm")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${emotion === "calm"
                ? "bg-black text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
            >
              Calm
            </button>
            <button
              onClick={() => setEmotion("stressed")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${emotion === "stressed"
                ? "bg-black text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
            >
              Stressed
            </button>
          </div>

          {!emotionalPass && (
            <div className="mt-3 flex items-center gap-2 text-red-600 text-xs font-medium bg-red-100/50 p-2 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              High stress detected. Cooling period advised.
            </div>
          )}
        </div>

        {/* Peer Benchmark */}
        <div className="border border-gray-200 rounded-xl p-5 mb-4 bg-white shadow-md hover:shadow-lg transition">
          <p className="font-semibold mb-2 flex items-center gap-2">
            2. Peer Benchmark
            <span className="text-green-500 text-xs">● PASSED</span>
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold text-black">72%</span> of disciplined investors held their position during similar volatility.
          </p>
        </div>

        {/* Streak Guard */}
        <div className="border border-gray-200 rounded-xl p-5 mb-8 bg-white shadow-md hover:shadow-lg transition">
          <p className="font-semibold mb-2 flex items-center gap-2">
            3. Discipline Guard
            {streakPass ? <span className="text-green-500 text-xs">● PASSED</span> : <span className="text-red-500 text-xs">● FAILED</span>}
          </p>
          {streakPass ? (
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <p className="text-sm font-medium">Diamond Streak Active</p>
                <p className="text-xs text-gray-500">90-day discipline intact.</p>
              </div>
            </div>
          ) : (
            <p className="text-red-500 text-sm">
              Streak broken. Review strategy.
            </p>
          )}
        </div>

        {/* Guard Score Breakdown */}
        <div className="border rounded-xl p-4 mb-6 bg-gray-50">
          <p className="font-semibold mb-2">
            Guard Composite Score
          </p>
          <p className="text-sm">
            Final Score: {guardResult.finalScore}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Minimum Required: 0.75
          </p>
        </div>

        {/* Tax Preview UI */}
        <div className="border rounded-xl p-4 mb-6 bg-gray-50/50">
          <p className="font-semibold mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            Tax-Aware Net Preview <span className="text-xs font-normal text-gray-500">(₹10,000 example)</span>
          </p>

          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Equity</span>
              <span className="font-mono">
                ₹{equity.net.toLocaleString()} <span className="text-xs text-gray-400">({equity.taxRate * 100}% tax)</span>
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Crypto</span>
              <span className="font-mono">
                ₹{crypto.net.toLocaleString()} <span className="text-xs text-gray-400">({crypto.taxRate * 100}% tax)</span>
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">ESG Bond</span>
              <span className="font-mono">
                ₹{esg.net.toLocaleString()} <span className="text-xs text-gray-400">({esg.taxRate * 100}% tax)</span>
              </span>
            </div>
          </div>
        </div>

        <button
          disabled={!guardResult.allowExecution}
          onClick={() => {
            console.log("Button clicked!");
            onExecute();
          }}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-150 shadow-xl ${guardResult.allowExecution
            ? "bg-black text-white hover:scale-[1.02] shadow-black/20 tracking-wide"
            : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
            }`}
        >
          {guardResult.allowExecution ? "Execute Strategy" : "Blocked by Guard System"}
        </button>
      </div>
    </div>
  );
}


function Dashboard() {
  const salary = useAppStore((s) => s.salary) || 0;
  const risk = useAppStore((s) => s.risk) || "balanced";

  const disciplineStreak = 4; // Hardcoded
  const totalInvested = Math.round(salary * 2.5); // Simulated accumulated amount

  const assetMix: { asset: AssetType; allocation: number }[] = [
    { asset: "equity", allocation: 0.4 },
    { asset: "esg", allocation: 0.4 },
    { asset: "crypto", allocation: 0.2 },
  ];

  const sustainabilityScore = calculateSustainabilityImpact(
    salary,
    assetMix,
    true
  );

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans p-6 animate-fade">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Financial Command</h1>
            <p className="text-gray-500 text-sm">System Status: <span className="text-green-500 font-medium">OPTIMAL</span></p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-500 font-mono tracking-tight mb-1 uppercase">Running on Local AI Engine (AMD Optimized)</div>
            <div className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium capitalize shadow-sm flex items-center gap-2 w-fit ml-auto">
              <span className={`w-2 h-2 rounded-full ${risk === "conservative" ? "bg-blue-500" :
                risk === "balanced" ? "bg-purple-500" : "bg-orange-500"
                }`} />
              {risk} Profile
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Invested */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-black text-white rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className="text-xs font-mono text-gray-400">YTD GROWTH +12%</span>
            </div>
            <h2 className="font-semibold text-lg mb-1 text-gray-600">Total Invested</h2>
            <p className="text-4xl font-bold tracking-tight">
              ${totalInvested.toLocaleString()}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Across all asset classes
            </p>
          </div>

          {/* Sustainability */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className="text-xs font-mono text-green-500">ESG RATING: AAA</span>
            </div>
            <h2 className="font-semibold text-lg mb-1 text-gray-600">Sustainability Impact</h2>
            <p className="text-2xl font-bold">
              {sustainabilityScore} Tons CO₂
            </p>
            <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Offset via ESG aligned portfolio
            </p>
          </div>

          {/* Streak */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
            </div>
            <h2 className="font-semibold text-lg mb-1 text-gray-600">Discipline Streak</h2>
            <p className="text-xl font-bold text-blue-600">
              {disciplineStreak} Month Streak Active
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Quarterly Pulse intact
            </p>
          </div>

          {/* Vault Status */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <span className="text-xs font-mono text-purple-500 animate-pulse">LIVE MONITORING</span>
            </div>
            <h2 className="font-semibold text-lg mb-1 text-gray-600">Staging Vault</h2>
            <p className="text-xl font-bold">
              Active – Next Strike Window
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Monitoring optimal entry timing
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400">Salary Pilot v2.1 • Security Encrypted • AI Governance Active</p>
        </div>
      </div>
    </div>
  );
}

export default App;
