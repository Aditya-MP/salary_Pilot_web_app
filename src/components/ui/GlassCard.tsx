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
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)',
                borderColor: 'rgba(16, 185, 129, 0.3)'
            } : {}}
            className={`glass-card p-6 border border-white/5 bg-navy-900/40 backdrop-blur-md rounded-2xl ${className}`}
        >
            {children}
        </motion.div>
    );
};
