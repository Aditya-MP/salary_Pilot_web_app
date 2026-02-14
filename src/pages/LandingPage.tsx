import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/ui/GlassCard';
import UltraBackground from '../components/landing/UltraBackground';

const FloatingParticle = ({ delay }: { delay: number }) => (
    <motion.div
        animate={{
            y: [0, -100],
            opacity: [0, 0.5, 0],
            scale: [0.5, 1.5, 0.5]
        }}
        transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: delay,
            ease: "linear"
        }}
        style={{
            left: `${Math.random() * 100}%`,
            top: '100%'
        }}
        className="absolute w-1 h-1 bg-emerald-400 rounded-full blur-[1px]"
    />
);

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

    const springX = useSpring(0, { stiffness: 100, damping: 30 });
    const springY = useSpring(0, { stiffness: 100, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX - innerWidth / 2) / 50;
            const y = (e.clientY - innerHeight / 2) / 50;
            springX.set(x);
            springY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [springX, springY]);

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-mesh-gradient opacity-30 animate-pulse-slow mix-blend-multiply" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f8fafc_100%)]" />

                {/* Grid Overlay - Dark lines for light mode */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <FloatingParticle key={i} delay={i * 0.5} />
                ))}
            </div>

            <UltraBackground />

            <motion.div
                style={{ y, opacity, scale, x: springX, rotateX: springY, perspective: 1000 }}
                className="relative z-10 container mx-auto px-6 text-center"
            >
                {/* Subtle Text Backdrop - Light/White for contrast against aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-white/80 via-white/50 to-transparent blur-3xl -z-10 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="inline-block mb-4 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-white/50 backdrop-blur-md shadow-sm"
                >
                    <span className="text-emerald-700/80 text-xs font-semibold tracking-wider uppercase flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        AI-Powered Wealth Management
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight leading-none text-navy-900"
                >
                    <span className="block">
                        Smarter Finance.
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 pb-2">
                        Effortless Control.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
                >
                    Experience the <span className="text-navy-900 font-medium">next generation</span> of wealth management with real-time AI insights,
                    automated salary routing, and institutional-grade security.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link to="/signup">
                        <Button size="xl" className="group relative overflow-hidden bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-10 py-5 shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-105 border border-emerald-400/20 rounded-xl">
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started Now
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Button>
                    </Link>
                    <Button variant="outline" size="xl" className="group border-slate-200 hover:bg-slate-50 hover:border-slate-300 px-10 py-5 shadow-sm rounded-xl">
                        <span className="text-slate-600 font-medium group-hover:text-navy-900 transition-colors">Explore Features</span>
                    </Button>
                </motion.div>
            </motion.div>

            {/* Cinematic Overlay Vignette - Light Mode */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#f8fafc_100%)] opacity-60" />
        </section>
    );
};

const Features = () => (
    <section className="py-32 relative overflow-hidden bg-slate-50">
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-24"
            >
                <h2 className="text-4xl md:text-6xl font-display font-bold text-navy-900 mb-6 tracking-tight">
                    Institutional-Grade Power
                </h2>
                <p className="text-slate-600 text-xl max-w-2xl mx-auto font-light">
                    Built for serious investors who demand precision, speed, and intelligence.
                    Powered by advanced algorithms and secure infrastructure.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
                <GlassCard delay={0.1}>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center mb-8 border border-emerald-200 shadow-sm">
                        <span className="text-4xl">🤖</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-navy-900 mb-4">AI Wealth Coach</h3>
                    <p className="text-slate-600 leading-relaxed font-light">
                        Real-time portfolio analysis and personalized investment strategies powered by
                        advanced machine learning models that adapt to market conditions.
                    </p>
                </GlassCard>

                <GlassCard delay={0.2}>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mb-8 border border-blue-200 shadow-sm">
                        <span className="text-4xl">💸</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-navy-900 mb-4">Smart Salary Split</h3>
                    <p className="text-slate-600 leading-relaxed font-light">
                        Automate your savings and investments the moment your salary hits your account
                        with intelligent routing rules and tax-optimization strategies.
                    </p>
                </GlassCard>

                <GlassCard delay={0.3}>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center mb-8 border border-purple-200 shadow-sm">
                        <span className="text-4xl">🛡️</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-navy-900 mb-4">Triple Guard Risk</h3>
                    <p className="text-slate-600 leading-relaxed font-light">
                        Proprietary risk management system that protects your capital against market
                        volatility, emotional decisions, and downside risks.
                    </p>
                </GlassCard>
            </div>
        </div>
    </section>
);

export default function LandingPage() {
    return (
        <div className="bg-slate-50 min-h-screen text-navy-950 selection:bg-emerald-500/30 overflow-x-hidden">
            <Navbar />
            <main>
                <Hero />
                <Features />
            </main>
            <footer className="py-12 bg-white text-center text-slate-500 text-sm border-t border-slate-200">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div className="text-2xl font-display font-bold text-navy-900 mb-4 md:mb-0">
                            Salary<span className="text-emerald-500">Pilot</span>
                        </div>
                        <div className="flex gap-8">
                            {['Privacy', 'Terms', 'Security', 'Contact'].map((item) => (
                                <a key={item} href="#" className="hover:text-emerald-600 transition-colors">{item}</a>
                            ))}
                        </div>
                    </div>
                    <p className="font-light">&copy; {new Date().getFullYear()} SalaryPilot. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
