import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

// Combine Framer Motion props with HTML Button props
type MotionButtonProps = ButtonProps & HTMLMotionProps<"button">;

const Button = forwardRef<HTMLButtonElement, MotionButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {

        const variants = {
            primary: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 hover:shadow-emerald-400/40 border-0',
            secondary: 'bg-transparent border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]',
            ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-white/5',
            glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-lg',
        };

        const sizes = {
            sm: 'h-9 px-4 text-sm',
            md: 'h-11 px-6 text-base',
            lg: 'h-14 px-8 text-lg',
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02, translateY: -1 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    'relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:pointer-events-none overflow-hidden',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : null}
                <span className={cn("flex items-center gap-2", isLoading && "opacity-0")}>
                    {children}
                </span>

                {variant === 'primary' && (
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 transition-opacity duration-300 hover:opacity-100" />
                )}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

export { Button, cn };
