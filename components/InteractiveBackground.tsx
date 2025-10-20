'use client';

import React, { useRef, useEffect } from 'react';

const InteractiveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Colors from the provided palette
    const colors = {
        background: '#001011',
        dotColors: ['#618985', '#414535', '#DFBD88', '#E8E3E3']
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let dots: Dot[] = [];
        let animationFrameId: number;
        let lastScrollY = window.scrollY;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasSize();

        // Dot class
        class Dot {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            color: string;
            targetX: number;
            targetY: number;
            friction: number;

            constructor(x: number, y: number, vx: number, vy: number, radius: number, color: string, targetX: number, targetY: number) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.radius = radius;
                this.color = color;
                this.targetX = targetX;
                this.targetY = targetY;
                this.friction = 0.96;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }

            update() {
                if (!canvas) return;
                
                // Add a slight wiggle for a floating effect
                this.vx += (Math.random() - 0.5) * 0.015;
                this.vy += (Math.random() - 0.5) * 0.015;

                // Bounce off edges
                if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                    this.vx = -this.vx * 0.8;
                }
                if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                    this.vy = -this.vy * 0.8;
                     if (this.y + this.radius > canvas.height) {
                        this.y = canvas.height - this.radius;
                    }
                }

                // Attract to the target position
                const ax = (this.targetX - this.x) * 0.0005;
                const ay = (this.targetY - this.y) * 0.0005;

                this.vx += ax;
                this.vy += ay;

                // Apply friction
                this.vx *= this.friction;
                this.vy *= this.friction;


                this.x += this.vx;
                this.y += this.vy;

                this.draw();
            }
        }

        // Initialize dots
        const init = () => {
            dots = [];
            const numberOfDots = Math.floor((canvas.width * canvas.height) / 715); 
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const largeDotRadius = Math.min(canvas.width, canvas.height) / 2.3;

            for (let i = 0; i < numberOfDots; i++) {
                const radius = Math.random() * 5 + 1;
                const x = Math.random() * (canvas.width - radius * 2) + radius;
                const y = Math.random() * (canvas.height - radius * 2) + radius;
                const vx = (Math.random() - 0.5) * 2;
                const vy = (Math.random() - 0.5) * 2;
                const color = colors.dotColors[Math.floor(Math.random() * colors.dotColors.length)];

                // Calculate a target position within the large dot
                const angle = Math.random() * 2 * Math.PI;
                const r = largeDotRadius * Math.sqrt(Math.random());
                const targetX = centerX + r * Math.cos(angle);
                const targetY = centerY + r * Math.sin(angle);

                dots.push(new Dot(x, y, vx, vy, radius, color, targetX, targetY));
            }
        };

        // Animation loop
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dots.forEach(dot => {
                dot.update();
            });
        };

        // Scroll event handler
        const handleScroll = (e: Event) => {
            const target = e.target as HTMLElement;
            const currentScrollY = target.scrollTop || window.scrollY;
            const deltaY = currentScrollY - lastScrollY;

            dots.forEach(dot => {
                // Apply a force based on scroll speed/direction
                dot.vy += deltaY * 0.02;
            });

            lastScrollY = currentScrollY;
        };
        
        // Resize event handler
        const handleResize = () => {
            setCanvasSize();
            init();
        };


        init();
        animate();

        // Store reference to current scroll container
        let currentScrollContainer: HTMLElement | null = null;

        // Function to attach scroll listener to the container
        const attachScrollListener = () => {
            const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLElement | null;
            
            // Only attach if we found a new container
            if (scrollContainer && scrollContainer !== currentScrollContainer) {
                // Remove listener from old container if it exists
                if (currentScrollContainer) {
                    currentScrollContainer.removeEventListener('scroll', handleScroll);
                }
                
                // Attach to new container
                scrollContainer.addEventListener('scroll', handleScroll);
                currentScrollContainer = scrollContainer;
                
                // Reset scroll position tracking
                lastScrollY = scrollContainer.scrollTop || 0;
            }
        };

        // Initial attachment
        attachScrollListener();

        // Use MutationObserver to detect when scroll container is added/removed
        const observer = new MutationObserver(() => {
            attachScrollListener();
        });

        // Observe changes to the document body
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-scroll-container']
        });

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            if (currentScrollContainer) {
                currentScrollContainer.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };

    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                backgroundColor: colors.background,
                zIndex: -1,
                pointerEvents: 'none'
            }} 
        />
    );
};

export default InteractiveBackground;

