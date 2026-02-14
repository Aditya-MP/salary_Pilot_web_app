import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const InputGroup = ({ label, type, placeHolder }: { label: string, type: string, placeHolder: string }) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-slate-400 ml-1 block">{label}</label>
        <div className="relative group">
            <input
                type={type}
                placeholder={placeHolder}
                className="w-full bg-navy-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all duration-300 group-hover:bg-navy-800/70"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur-sm" />
        </div>
    </div>
);

const SocialButton = ({ icon, label }: { icon: string, label: string }) => (
    <button
        type="button"
        className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
    >
        <span className="text-white font-medium group-hover:scale-110 transition-transform duration-300">{icon}</span>
    </button>
);

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const completeOnboarding = useAppStore((state) => state.completeOnboarding);
    const navigate = useNavigate();

    const toggleAuth = () => setIsLogin(!isLogin);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login/signup logic
        setTimeout(() => {
            completeOnboarding();
            navigate('/dashboard');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] bg-emerald-500/10 rounded-full blur-[100px] animate-float opacity-30" />
                <div className="absolute top-1/2 -right-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow opacity-30" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass-card rounded-2xl p-8 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
                            <span className="text-2xl font-display font-bold text-white tracking-tight">
                                Salary<span className="text-emerald-400">Pilot</span>
                            </span>
                        </Link>
                        <h2 className="text-2xl font-semibold text-white mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-slate-400 text-sm">
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

                        <Button type="submit" className="w-full mt-6 shadow-lg shadow-emerald-500/20 py-3" variant="primary">
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#112240] px-2 text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <SocialButton icon="G" label="Google" />
                            <SocialButton icon="" label="Apple" />
                            <SocialButton icon="GH" label="GitHub" />
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm">
                        <p className="text-slate-400">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                onClick={toggleAuth}
                                className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                                {isLogin ? 'Sign up' : 'Log in'}
                            </button>
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center opacity-60 hover:opacity-100 transition-opacity">
                    <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
                        <span>🔒 Bank-grade encryption</span>
                        <span>•</span>
                        <span>256-bit SSL secure</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
