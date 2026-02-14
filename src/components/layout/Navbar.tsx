import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-white/70 border-b border-slate-200/60"
        >
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
                    <span className="font-bold text-white text-lg">S</span>
                </div>
                <span className="text-xl font-display font-bold text-navy-900 tracking-tight">
                    Salary<span className="text-emerald-600">Pilot</span>
                </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                {['Features', 'Pricing', 'Security', 'Contact'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="hover:text-emerald-600 transition-colors relative group"
                    >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-slate-600 hover:text-navy-900 hover:bg-slate-100">Log In</Button>
                </Link>
                <Link to="/signup">
                    <Button variant="primary" size="sm" className="hidden sm:inline-flex shadow-md shadow-emerald-500/20">
                        Get Started
                    </Button>
                </Link>
            </div>
        </motion.nav>
    );
}
