/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                navy: {
                    950: '#02040a', // Ultra dark for depth
                    900: '#050a14', // Primary background
                    800: '#0b1221', // Secondary background
                    700: '#152035', // Tertiary background
                    600: '#202f46', // Lighter for hover states
                },
                emerald: {
                    400: '#34d399', // Classic emerald
                    500: '#10b981',
                    glow: '#00ff9d', // Neon green for accents
                },
                gold: {
                    400: '#fbbf24',
                    500: '#f59e0b',
                    glow: '#ffd700', // Gold glow
                },
                blue: {
                    glow: '#3b82f6', // Neon blue
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'mesh-gradient': 'radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.1) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(16, 185, 129, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.1) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.1) 0px, transparent 50%)',
                'glass-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
            },
            boxShadow: {
                'glow-sm': '0 0 10px rgba(16, 185, 129, 0.2)',
                'glow-md': '0 0 20px rgba(16, 185, 129, 0.4)',
                'glow-lg': '0 0 30px rgba(16, 185, 129, 0.6)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.37)',
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'marquee': 'marquee 25s linear infinite',
                'marquee-reverse': 'marquee-reverse 25s linear infinite',
                'scan': 'scan 4s ease-in-out infinite',
                'blink': 'blink 1s step-end infinite',
                'spin': 'spin 40s linear infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                'marquee-reverse': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
                scan: {
                    '0%, 100%': { opacity: '0.2' },
                    '50%': { opacity: '1' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
                spin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(100, 255, 218, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(100, 255, 218, 0.6), 0 0 10px rgba(100, 255, 218, 0.4)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                }
            },
        },
    },
    plugins: [],
};
