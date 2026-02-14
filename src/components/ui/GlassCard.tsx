import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
    delay?: number;
}

export const GlassCard = ({ children, className = '', hoverEffect = true, delay = 0 }: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={hoverEffect ? {
                y: -5,
                boxShadow: '0 10px 30px -10px rgba(16, 185, 129, 0.2)',
                borderColor: 'rgba(16, 185, 129, 0.4)'
            } : {}}
            className={`glass-card p-6 border border-slate-200/50 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm ${className}`}
        >
            {children}
        </motion.div>
    );
};
