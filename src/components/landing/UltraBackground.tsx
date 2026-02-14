import { useEffect, useRef } from 'react';
import bullVsBearImage from '../../assets/bull_vs_bear.png';

const UltraBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles: Particle[] = [];
        const particleCount = Math.min(width * 0.05, 40);
        const mouse = { x: 0, y: 0, active: false };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            type: 'bull' | 'bear';
            color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.type = Math.random() > 0.5 ? 'bull' : 'bear';

                if (this.type === 'bull') {
                    this.vy = -(Math.random() * 0.5 + 0.2);
                    this.vx = (Math.random() - 0.5) * 0.2;
                    this.color = 'rgba(16, 185, 129, 0.6)'; // Emerald-500, higher opacity for pop
                } else {
                    this.vy = (Math.random() * 0.5 + 0.2);
                    this.vx = (Math.random() - 0.5) * 0.2;
                    this.color = 'rgba(244, 63, 94, 0.6)'; // Rose-500, higher opacity for pop
                }

                this.size = Math.random() * 2 + 0.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;

                if (this.type === 'bull' && this.y < -50) {
                    this.y = height + 50;
                    this.x = Math.random() * width;
                }
                if (this.type === 'bear' && this.y > height + 50) {
                    this.y = -50;
                    this.x = Math.random() * width;
                }

                if (mouse.active) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const maxDistance = 200;
                    const force = (maxDistance - distance) / maxDistance;

                    if (distance < maxDistance) {
                        this.vx -= forceDirectionX * force * 0.5;
                        this.vy -= forceDirectionY * force * 0.5;
                    }
                }
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.translate(this.x, this.y);

                ctx.beginPath();
                if (this.type === 'bull') {
                    ctx.moveTo(0, -this.size);
                    ctx.lineTo(this.size, this.size);
                    ctx.lineTo(-this.size, this.size);
                } else {
                    ctx.moveTo(0, this.size);
                    ctx.lineTo(this.size, -this.size);
                    ctx.lineTo(-this.size, -this.size);
                }
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0 bg-navy-950">
            {/* Main Background Image - Vibrant and Visible */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
                style={{
                    backgroundImage: `url(${bullVsBearImage})`,
                    filter: 'contrast(1.1) brightness(0.8)'
                }}
            />

            {/* Vignette Overlay: Clear center, Dark edges */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#02040a_100%)] opacity-90" />

            {/* Subtle Gradient from bottom to blend into content */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />

            {/* Canvas Overlay for Particles */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-70"
            />
        </div>
    );
};

export default UltraBackground;
