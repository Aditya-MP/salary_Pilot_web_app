import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-navy-900/50 border-b border-white/5"
        >
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <span className="font-bold text-white text-lg">S</span>
                </div>
                <span className="text-xl font-display font-bold text-white tracking-tight">
                    Salary<span className="text-emerald-400">Pilot</span>
                </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                {['Features', 'Pricing', 'Security', 'Contact'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="hover:text-emerald-400 transition-colors relative group"
                    >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full" />
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Link to="/login">
                    <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link to="/signup">
                    <Button variant="primary" size="sm" className="hidden sm:inline-flex">
                        Get Started
                    </Button>
                </Link>
            </div>
        </motion.nav>
    );
}
