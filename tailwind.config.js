/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                navy: {
                    900: '#020c1b',
                    800: '#0a192f',
                    700: '#112240',
                },
                emerald: {
                    400: '#64ffda',
                    500: '#10b981', // Keeping standard emerald for compatibility
                },
                gold: {
                    400: '#ffd700',
                    500: '#e6c200',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
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
                }
            },
        },
    },
    plugins: [],
};
