import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-navy-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,34,64,0.7),rgba(2,12,27,1))]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Animated Particles/Glow */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl mix-blend-screen"
                />
                <motion.div
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl mix-blend-screen"
                />
            </div>

            <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
                >
                    Smarter Finance. <br />
                    <span className="text-emerald-400">Effortless Control.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
                >
                    Experience the future of wealth management with AI-powered insights,
                    automated salary splitting, and institutional-grade security.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/signup">
                        <Button size="lg" className="w-full sm:w-auto shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                            Get Started Now
                        </Button>
                    </Link>
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                        Explore Features
                    </Button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
            >
                <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent"
                />
            </motion.div>
        </section>
    );
};

const FeatureCard = ({ title, description, icon }: { title: string, description: string, icon: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-card p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all duration-300"
    >
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 text-2xl">
            {icon}
        </div>
        <h3 className="text-xl font-display font-semibold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed font-light">{description}</p>
    </motion.div>
);

const Features = () => (
    <section className="py-24 bg-navy-900 relative">
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                    Institutional-Grade Power
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto">
                    Built for serious investors who demand precision, speed, and intelligence.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                    title="AI Wealth Coach"
                    description="Real-time portfolio analysis and personalized investment strategies powered by advanced machine learning models."
                    icon="🤖"
                />
                <FeatureCard
                    title="Smart Salary Split"
                    description="Automate your savings and investments the moment your salary hits your account with intelligent routing."
                    icon="💸"
                />
                <FeatureCard
                    title="Triple Guard Risk"
                    description="Proprietary risk management system that protects your capital against market volatility and emotional decisions."
                    icon="🛡️"
                />
            </div>
        </div>
    </section>
);

export default function LandingPage() {
    return (
        <div className="bg-navy-900 min-h-screen text-white selection:bg-emerald-500/30">
            <Navbar />
            <main>
                <Hero />
                <Features />
            </main>
            <footer className="py-8 bg-navy-800 text-center text-slate-500 text-sm border-t border-white/5">
                <p>&copy; {new Date().getFullYear()} SalaryPilot. All rights reserved.</p>
            </footer>
        </div>
    );
}
