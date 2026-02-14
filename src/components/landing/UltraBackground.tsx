import { useEffect, useRef } from 'react';

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
        const particleCount = Math.min(width * 0.15, 150); // Responsive count
        const connectionDistance = 150;
        const mouse = { x: 0, y: 0, active: false };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                // Mix of Emerald, Cyan, and White for a tech/fintech feel
                const colors = ['rgba(16, 185, 129, 0.7)', 'rgba(56, 189, 248, 0.7)', 'rgba(255, 255, 255, 0.5)'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction
                if (mouse.active) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const maxDistance = 200;
                    const force = (maxDistance - distance) / maxDistance;

                    if (distance < maxDistance) {
                        this.vx -= forceDirectionX * force * 0.05;
                        this.vy -= forceDirectionY * force * 0.05;
                    }
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const drawGrid = () => {
            if (!ctx) return;
            // Perspective Grid at the bottom
            const gridSize = 50;
            const time = Date.now() * 0.0005;
            const gridPerspectiveY = height * 0.75;

            ctx.save();
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
            ctx.lineWidth = 1;

            // Vertical lines with perspective
            for (let i = 0; i < width; i += gridSize) {
                const x = i + (Math.sin(time + i) * 10); // Slight wave effect
                ctx.beginPath();
                ctx.moveTo(x, gridPerspectiveY); // Start fading in from middle
                ctx.lineTo(x - (width / 2 - x) * 1.5, height); // Perspective flare out
                ctx.stroke();
            }

            // Horizontal lines moving forward
            const offset = (Date.now() * 0.02) % gridSize;
            for (let i = 0; i < height - gridPerspectiveY; i += gridSize) {
                const y = gridPerspectiveY + i + offset;
                if (y > height) continue;

                const progress = (y - gridPerspectiveY) / (height - gridPerspectiveY);
                ctx.globalAlpha = progress * 0.3; // Fade in as it gets closer

                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
            ctx.restore();
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Draw faint connections first (behind particles)
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(16, 185, 129, ${1 - distance / connectionDistance})`; // Fade based on distance
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw Perspective Grid
            drawGrid();

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
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
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};

export default UltraBackground;
