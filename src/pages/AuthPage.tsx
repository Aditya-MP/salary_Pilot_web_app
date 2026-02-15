import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

/* ═══════════════════════════════════════════════════════════ */
/*           ANIMATED NODE NETWORK (Canvas) — Light           */
/* ═══════════════════════════════════════════════════════════ */
const NodeNetwork = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const NODE_COUNT = 45;
        const CONNECTION_DIST = 170;

        class Node {
            x: number; y: number; vx: number; vy: number; radius: number;
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 2 + 0.8;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
        }

        const nodes = Array.from({ length: NODE_COUNT }, () => new Node());

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            nodes.forEach((n) => {
                n.update();
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
                ctx.fill();
                // Glow
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius + 3, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(16, 185, 129, 0.04)';
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1]" />;
};

/* ═══════════════════════════════════════════════════════════ */
/*           SECURITY SHIELD PULSE — Light                    */
/* ═══════════════════════════════════════════════════════════ */
const ShieldPulse = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[0]">
        <motion.svg
            width="550"
            height="550"
            viewBox="0 0 200 200"
            fill="none"
            className="opacity-[0.08]"
            animate={{ scale: [1, 1.04, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
            <path
                d="M100 15 L175 55 L175 110 C175 155 140 185 100 195 C60 185 25 155 25 110 L25 55 Z"
                stroke="url(#shieldGradLight)"
                strokeWidth="1.5"
                fill="none"
            />
            <path
                d="M100 35 L155 65 L155 105 C155 140 130 165 100 175 C70 165 45 140 45 105 L45 65 Z"
                stroke="url(#shieldGradLight)"
                strokeWidth="0.8"
                fill="none"
                opacity="0.5"
            />
            {/* Lock icon */}
            <rect x="88" y="90" width="24" height="20" rx="3" stroke="rgba(16,185,129,0.35)" strokeWidth="1.5" fill="none" />
            <path d="M93 90 V82 A7 7 0 0 1 107 82 V90" stroke="rgba(16,185,129,0.35)" strokeWidth="1.5" fill="none" />
            <circle cx="100" cy="102" r="2.5" fill="rgba(16,185,129,0.35)" />
            <defs>
                <linearGradient id="shieldGradLight" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
            </defs>
        </motion.svg>
    </div>
);

/* ═══════════════════════════════════════════════════════════ */
/*           DATA STREAM LINES — Light                        */
/* ═══════════════════════════════════════════════════════════ */
const DataStreams = () => {
    const streams = useMemo(() => [
        { y: '18%', dur: 4, delay: 0, color: 'emerald' },
        { y: '35%', dur: 6, delay: 1.5, color: 'blue' },
        { y: '55%', dur: 5, delay: 0.8, color: 'emerald' },
        { y: '72%', dur: 7, delay: 2, color: 'purple' },
        { y: '88%', dur: 4.5, delay: 3, color: 'blue' },
    ], []);

    const colorMap: Record<string, string> = {
        emerald: 'rgba(16,185,129,0.1)',
        blue: 'rgba(59,130,246,0.08)',
        purple: 'rgba(139,92,246,0.07)',
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[0]">
            {streams.map((s, i) => (
                <motion.div
                    key={i}
                    className="absolute left-0 h-px"
                    style={{
                        top: s.y,
                        background: `linear-gradient(90deg, transparent, ${colorMap[s.color]}, transparent)`,
                        width: '100%',
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'linear' }}
                />
            ))}
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════ */
/*           INPUT & SOCIAL COMPONENTS                        */
/* ═══════════════════════════════════════════════════════════ */
const InputGroup = ({ label, type, placeHolder }: { label: string; type: string; placeHolder: string }) => (
    <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-500 ml-1 block tracking-wide uppercase">{label}</label>
        <div className="relative group">
            <input
                type={type}
                placeholder={placeHolder}
                className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3.5 text-navy-900 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 group-hover:bg-white/90 backdrop-blur-sm shadow-sm font-light"
            />
        </div>
    </div>
);

const SocialButton = ({ icon, label }: { icon: string; label: string }) => (
    <button
        type="button"
        aria-label={label}
        className="flex items-center justify-center px-4 py-3 border border-slate-200 rounded-xl bg-white/50 hover:bg-white/80 hover:border-emerald-300 hover:shadow-sm transition-all duration-300 group backdrop-blur-sm"
    >
        <span className="text-slate-600 font-medium group-hover:text-navy-900 group-hover:scale-110 transition-all duration-300">{icon}</span>
    </button>
);

/* ═══════════════════════════════════════════════════════════ */
/*                    AUTH PAGE — Light + Unique               */
/* ═══════════════════════════════════════════════════════════ */
export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const toggleAuth = () => setIsLogin(!isLogin);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const completeOnboarding = useAppStore.getState().completeOnboarding;
        completeOnboarding();
        setTimeout(() => {
            navigate('/dashboard');
        }, 100);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">

            {/* ── Light mesh gradient ── */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-mesh-gradient opacity-20 animate-pulse-slow mix-blend-multiply" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f8fafc_100%)]" />

                {/* Grid Overlay — Light */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            {/* ── Unique Layer: Node Network ── */}
            <NodeNetwork />

            {/* ── Unique Layer: Security Shield ── */}
            <ShieldPulse />

            {/* ── Unique Layer: Data Streams ── */}
            <DataStreams />

            {/* ── Soft vignette ── */}
            <div
                className="absolute inset-0 pointer-events-none z-[2]"
                style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(248,250,252,0.5) 100%)' }}
            />

            {/* ═══════ FORM CARD ═══════ */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md relative z-10"
            >
                {/* Light frosted glass card with emerald glow */}
                <div className="rounded-2xl p-8 bg-white/60 backdrop-blur-xl border border-slate-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.06),0_0_60px_rgba(16,185,129,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08),0_0_60px_rgba(16,185,129,0.1)] hover:border-emerald-300/40 transition-all duration-500">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
                            <span className="text-2xl font-display font-bold text-navy-900 tracking-tight">
                                Salary<span className="text-emerald-500">Pilot</span>
                            </span>
                        </Link>
                        <h2 className="text-2xl font-display font-bold text-navy-900 mb-2 tracking-tight">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-slate-500 text-sm font-light">
                            {isLogin ? 'Securely access your wealth dashboard' : 'Start your journey to financial freedom'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-4">
                                        <InputGroup label="Full Name" type="text" placeHolder="John Doe" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <InputGroup label="Email Address" type="email" placeHolder="john@example.com" />
                        <InputGroup label="Password" type="password" placeHolder="••••••••" />

                        <Button
                            type="submit"
                            className="w-full mt-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-100 rounded-xl border border-emerald-400/20"
                            variant="primary"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white/60 backdrop-blur-sm px-3 text-slate-400 font-medium tracking-wider">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <SocialButton icon="G" label="Google" />
                            <SocialButton icon="" label="Apple" />
                            <SocialButton icon="GH" label="GitHub" />
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm">
                        <p className="text-slate-500">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                onClick={toggleAuth}
                                className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                            >
                                {isLogin ? 'Sign up' : 'Log in'}
                            </button>
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center opacity-60 hover:opacity-100 transition-opacity">
                    <p className="text-xs text-slate-400 flex items-center justify-center gap-2 font-light">
                        <span>🔒 Bank-grade encryption</span>
                        <span>•</span>
                        <span>256-bit SSL secure</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
