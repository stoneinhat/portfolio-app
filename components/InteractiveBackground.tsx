'use client';

import React, { useRef, useEffect } from 'react';

// Colors from the provided palette (module scope for stable reference)
const colors = {
    background: '#001011',
    dotColors: ['#618985', '#414535', '#DFBD88', '#E8E3E3']
};

interface InteractiveBackgroundProps {
    isInteractive?: boolean;
    viewMode?: 'mac' | 'terminal';
    isMinimized?: boolean;
    interactionRadius?: number;
    ballCount?: number;
}

const InteractiveBackground = ({ isInteractive = false, viewMode = 'mac', isMinimized = false, interactionRadius = 75, ballCount = 400 }: InteractiveBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isInteractiveRef = useRef(isInteractive);
    const viewModeRef = useRef(viewMode);
    const isMinimizedRef = useRef(isMinimized);
    const prevViewModeRef = useRef(viewMode);
    const prevMinimizedRef = useRef(isMinimized);
    const interactionRadiusRef = useRef(interactionRadius);
    const ballCountRef = useRef(ballCount);

    // Update the ref whenever isInteractive changes
    useEffect(() => {
        isInteractiveRef.current = isInteractive;
    }, [isInteractive]);

    // Update the ref whenever viewMode changes
    useEffect(() => {
        prevViewModeRef.current = viewModeRef.current;
        viewModeRef.current = viewMode;
    }, [viewMode]);

    // Update the ref whenever isMinimized changes
    useEffect(() => {
        prevMinimizedRef.current = isMinimizedRef.current;
        isMinimizedRef.current = isMinimized;
    }, [isMinimized]);

    // Update the ref whenever interactionRadius changes
    useEffect(() => {
        interactionRadiusRef.current = interactionRadius;
    }, [interactionRadius]);

    // Update the ref whenever ballCount changes
    useEffect(() => {
        ballCountRef.current = ballCount;
    }, [ballCount]);

    // colors are defined at module scope to avoid effect deps noise

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let dots: Dot[] = [];
        let animationFrameId: number;
        let lastScrollY = window.scrollY;
        let mouseX = -1000;
        let mouseY = -1000;

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
            initialTargetX: number;
            initialTargetY: number;
            bouncesRemaining: number;
            shouldBounce: boolean;

            constructor(x: number, y: number, vx: number, vy: number, radius: number, color: string, targetX: number, targetY: number) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.radius = radius;
                this.color = color;
                this.targetX = targetX;
                this.targetY = targetY;
                this.initialTargetX = targetX;
                this.initialTargetY = targetY;
                this.friction = 0.96;
                this.bouncesRemaining = 0;
                this.shouldBounce = false;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }

            setTarget(newTargetX: number, newTargetY: number, shouldBounce: boolean = false) {
                this.targetX = newTargetX;
                this.targetY = newTargetY;
                if (shouldBounce) {
                    this.shouldBounce = true;
                    this.bouncesRemaining = 3; // Number of bounces before settling
                    
                    // Give an initial velocity boost toward the target for better bouncing effect
                    const dx = newTargetX - this.x;
                    const dy = newTargetY - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 0) {
                        const speed = 2; // Initial speed toward target
                        this.vx += (dx / distance) * speed;
                        this.vy += (dy / distance) * speed;
                    }
                }
            }

            applyExplosionForce(centerX: number, centerY: number, force: number) {
                const dx = this.x - centerX;
                const dy = this.y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 0) {
                    const angle = Math.atan2(dy, dx);
                    this.vx += Math.cos(angle) * force;
                    this.vy += Math.sin(angle) * force;
                }
            }

            update(mouseX: number, mouseY: number, isInteractive: boolean, windowBounds: WindowBounds | null = null, currentInteractionRadius: number = 75) {
                if (!canvas) return;
                
                // Calculate distance to target
                const dxToTarget = this.targetX - this.x;
                const dyToTarget = this.targetY - this.y;
                const distanceToTarget = Math.sqrt(dxToTarget * dxToTarget + dyToTarget * dyToTarget);
                
                // Calculate velocity magnitude
                const velocityMagnitude = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                
                // If very close to target and moving slowly, snap to position and stop
                if (windowBounds && distanceToTarget < 2 && velocityMagnitude < 0.5) {
                    this.x = this.targetX;
                    this.y = this.targetY;
                    this.vx *= 0.3;
                    this.vy *= 0.3;
                    this.draw();
                    return;
                }
                
                // Mouse interaction when interactive mode is enabled
                if (isInteractive) {
                    const dx = this.x - mouseX;
                    const dy = this.y - mouseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDistance = currentInteractionRadius;

                    if (distance < minDistance) {
                        const force = (minDistance - distance) / minDistance;
                        const angle = Math.atan2(dy, dx);
                        this.vx += Math.cos(angle) * force * 2;
                        this.vy += Math.sin(angle) * force * 2;
                    }
                }
                
                // Add a slight wiggle for a floating effect, but eliminate it when close to target
                // This prevents jitter when balls are settled
                const wiggleStrength = windowBounds ? Math.max(0, Math.min((distanceToTarget - 5) / 20, 1)) : 1;
                this.vx += (Math.random() - 0.5) * 0.015 * wiggleStrength;
                this.vy += (Math.random() - 0.5) * 0.015 * wiggleStrength;

                // Attract to the target position
                // Use stronger attraction when bouncing is enabled for more momentum
                const attractionStrength = this.shouldBounce && this.bouncesRemaining > 0 ? 0.001 : 0.0005;
                const ax = dxToTarget * attractionStrength;
                const ay = dyToTarget * attractionStrength;

                this.vx += ax;
                this.vy += ay;

                // Apply friction, stronger when close to target
                const targetFriction = windowBounds && distanceToTarget < 30 ? 0.82 : this.friction;
                this.vx *= targetFriction;
                this.vy *= targetFriction;

                // Update position
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off screen edges
                if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                    this.vx = -this.vx * 0.8;
                    if (this.x + this.radius > canvas.width) {
                        this.x = canvas.width - this.radius;
                    }
                    if (this.x - this.radius < 0) {
                        this.x = this.radius;
                    }
                }
                if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                    this.vy = -this.vy * 0.8;
                    if (this.y + this.radius > canvas.height) {
                        this.y = canvas.height - this.radius;
                    }
                    if (this.y - this.radius < 0) {
                        this.y = this.radius;
                    }
                }

                // Collision with MacWindow (solid barrier)
                if (windowBounds) {
                    const padding = this.radius + 2; // Slight buffer
                    
                    // Check if ball is inside or intersecting the window
                    const isIntersecting = (
                        this.x + padding > windowBounds.left &&
                        this.x - padding < windowBounds.right &&
                        this.y + padding > windowBounds.top &&
                        this.y - padding < windowBounds.bottom
                    );
                    
                    if (isIntersecting) {
                        // Check if the target is on the border (within 10 pixels of any edge)
                        const targetOnBorder = (
                            Math.abs(this.targetX - windowBounds.left) < 10 ||
                            Math.abs(this.targetX - windowBounds.right) < 10 ||
                            Math.abs(this.targetY - windowBounds.top) < 10 ||
                            Math.abs(this.targetY - windowBounds.bottom) < 10
                        );
                        
                        // If close to target on border and should bounce
                        if (targetOnBorder && distanceToTarget < 15) {
                            if (this.shouldBounce && this.bouncesRemaining > 0) {
                                // Perform controlled bounces
                                const distToLeft = Math.abs(this.x - windowBounds.left);
                                const distToRight = Math.abs(this.x - windowBounds.right);
                                const distToTop = Math.abs(this.y - windowBounds.top);
                                const distToBottom = Math.abs(this.y - windowBounds.bottom);
                                
                                const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
                                
                                // Calculate bounce strength that decreases with each bounce
                                const bounceStrength = 0.5 * (this.bouncesRemaining / 3);
                                const minBounceVelocity = 3 * bounceStrength; // Minimum velocity for visible bounce
                                
                                // Bounce perpendicular to the border
                                if (minDist === distToLeft || minDist === distToRight) {
                                    // If moving toward border or moving too slowly, create bounce
                                    if (Math.abs(this.vx) > 0.05 || distanceToTarget < 5) {
                                        // Ensure minimum velocity for bounce
                                        const newVx = Math.abs(this.vx) < minBounceVelocity ? minBounceVelocity : Math.abs(this.vx);
                                        this.vx = -Math.sign(this.vx || (this.x > this.targetX ? 1 : -1)) * newVx * bounceStrength;
                                        this.bouncesRemaining--;
                                    }
                                } else {
                                    // If moving toward border or moving too slowly, create bounce
                                    if (Math.abs(this.vy) > 0.05 || distanceToTarget < 5) {
                                        // Ensure minimum velocity for bounce
                                        const newVy = Math.abs(this.vy) < minBounceVelocity ? minBounceVelocity : Math.abs(this.vy);
                                        this.vy = -Math.sign(this.vy || (this.y > this.targetY ? 1 : -1)) * newVy * bounceStrength;
                                        this.bouncesRemaining--;
                                    }
                                }
                                
                                // Stop bouncing after all bounces are done
                                if (this.bouncesRemaining <= 0) {
                                    this.shouldBounce = false;
                                }
                            } else {
                                // Gradually reduce velocity instead of bouncing
                                this.vx *= 0.7;
                                this.vy *= 0.7;
                            }
                        } else {
                            // Normal bounce behavior when not settling
                            // Determine which edge is closest
                            const distToLeft = Math.abs(this.x - windowBounds.left);
                            const distToRight = Math.abs(this.x - windowBounds.right);
                            const distToTop = Math.abs(this.y - windowBounds.top);
                            const distToBottom = Math.abs(this.y - windowBounds.bottom);
                            
                            const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
                            
                            // Bounce off the closest edge
                            if (minDist === distToLeft) {
                                // Left edge
                                this.x = windowBounds.left - padding;
                                this.vx = -Math.abs(this.vx) * 0.8; // Bounce left
                            } else if (minDist === distToRight) {
                                // Right edge
                                this.x = windowBounds.right + padding;
                                this.vx = Math.abs(this.vx) * 0.8; // Bounce right
                            } else if (minDist === distToTop) {
                                // Top edge
                                this.y = windowBounds.top - padding;
                                this.vy = -Math.abs(this.vy) * 0.8; // Bounce up
                            } else {
                                // Bottom edge
                                this.y = windowBounds.bottom + padding;
                                this.vy = Math.abs(this.vy) * 0.8; // Bounce down
                            }
                        }
                    }
                }

                this.draw();
            }
        }

        // Initialize dots
        const init = () => {
            dots = [];
            const numberOfDots = ballCountRef.current; 
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

        // Type for window bounds
        type WindowBounds = {
            left: number;
            right: number;
            top: number;
            bottom: number;
            width: number;
            height: number;
            centerX: number;
            centerY: number;
        };

        // Function to get MacWindow border positions
        const getMacWindowBounds = (): WindowBounds | null => {
            const macWindow = document.querySelector('.mac-window-content');
            if (macWindow) {
                const rect = macWindow.getBoundingClientRect();
                return {
                    left: rect.left,
                    right: rect.right,
                    top: rect.top,
                    bottom: rect.bottom,
                    width: rect.width,
                    height: rect.height,
                    centerX: rect.left + rect.width / 2,
                    centerY: rect.top + rect.height / 2
                };
            }
            return null;
        };

        // Function to calculate border target position
        const calculateBorderTarget = (index: number, total: number, bounds: WindowBounds | null) => {
            if (!bounds) return { x: canvas.width / 2, y: canvas.height / 2 };
            
            const perimeter = 2 * (bounds.width + bounds.height);
            const spacing = perimeter / total;
            const position = index * spacing;
            
            let x: number, y: number;
            
            if (position < bounds.width) {
                // Top edge
                x = bounds.left + position;
                y = bounds.top;
            } else if (position < bounds.width + bounds.height) {
                // Right edge
                x = bounds.right;
                y = bounds.top + (position - bounds.width);
            } else if (position < 2 * bounds.width + bounds.height) {
                // Bottom edge
                x = bounds.right - (position - bounds.width - bounds.height);
                y = bounds.bottom;
            } else {
                // Left edge
                x = bounds.left;
                y = bounds.bottom - (position - 2 * bounds.width - bounds.height);
            }
            
            return { x, y };
        };

        // Track mode changes and apply effects
        let lastCheckedMode = viewModeRef.current;
        let lastCheckedMinimized = isMinimizedRef.current;
        let lastWindowBounds: WindowBounds | null = null;
        let lastBallCount = ballCountRef.current;

        // Animation loop
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (!ctx) return;
            
            const currentMode = viewModeRef.current;
            const currentMinimized = isMinimizedRef.current;
            const currentBallCount = ballCountRef.current;
            
            // Check if ball count changed
            if (currentBallCount !== lastBallCount) {
                const difference = currentBallCount - lastBallCount;
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const largeDotRadius = Math.min(canvas.width, canvas.height) / 2.3;
                
                if (difference > 0) {
                    // Add new balls
                    for (let i = 0; i < difference; i++) {
                        const radius = Math.random() * 5 + 1;
                        const x = Math.random() * (canvas.width - radius * 2) + radius;
                        const y = Math.random() * (canvas.height - radius * 2) + radius;
                        const vx = (Math.random() - 0.5) * 2;
                        const vy = (Math.random() - 0.5) * 2;
                        const color = colors.dotColors[Math.floor(Math.random() * colors.dotColors.length)];
                        
                        const angle = Math.random() * 2 * Math.PI;
                        const r = largeDotRadius * Math.sqrt(Math.random());
                        const targetX = centerX + r * Math.cos(angle);
                        const targetY = centerY + r * Math.sin(angle);
                        
                        dots.push(new Dot(x, y, vx, vy, radius, color, targetX, targetY));
                    }
                    
                    // If in terminal mode and not minimized, update border targets for all dots
                    if (currentMode === 'terminal' && !currentMinimized) {
                        const bounds = getMacWindowBounds();
                        if (bounds) {
                            dots.forEach((dot, index) => {
                                const target = calculateBorderTarget(index, dots.length, bounds);
                                dot.setTarget(target.x, target.y, false);
                            });
                        }
                    }
                } else if (difference < 0) {
                    // Remove balls
                    dots.splice(0, Math.abs(difference));
                    
                    // If in terminal mode and not minimized, update border targets for remaining dots
                    if (currentMode === 'terminal' && !currentMinimized) {
                        const bounds = getMacWindowBounds();
                        if (bounds) {
                            dots.forEach((dot, index) => {
                                const target = calculateBorderTarget(index, dots.length, bounds);
                                dot.setTarget(target.x, target.y, false);
                            });
                        }
                    }
                }
                
                lastBallCount = currentBallCount;
            }
            
            // Check if minimize state changed
            if (currentMinimized !== lastCheckedMinimized) {
                if (currentMinimized) {
                    // Minimized - always return to center circle targets without bouncing
                    dots.forEach(dot => {
                        dot.setTarget(dot.initialTargetX, dot.initialTargetY, false);
                        dot.shouldBounce = false;
                        dot.bouncesRemaining = 0;
                    });
                } else if (currentMode === 'terminal') {
                    // Un-minimized while in terminal mode - go to border with bouncing
                    const bounds = getMacWindowBounds();
                    if (bounds) {
                        dots.forEach((dot, index) => {
                            const target = calculateBorderTarget(index, dots.length, bounds);
                            dot.setTarget(target.x, target.y, true);
                        });
                        lastWindowBounds = bounds;
                    }
                }
                lastCheckedMinimized = currentMinimized;
            }
            
            // Check if mode changed (only when not minimized)
            if (currentMode !== lastCheckedMode && !currentMinimized) {
                if (currentMode === 'terminal') {
                    // Smoothly transition to border with bouncing effect
                    const bounds = getMacWindowBounds();
                    if (bounds) {
                        dots.forEach((dot, index) => {
                            const target = calculateBorderTarget(index, dots.length, bounds);
                            // Enable bouncing when setting border targets
                            dot.setTarget(target.x, target.y, true);
                        });
                        lastWindowBounds = bounds;
                    }
                } else {
                    // Back to mac mode - restore original targets without bouncing
                    dots.forEach(dot => {
                        dot.setTarget(dot.initialTargetX, dot.initialTargetY, false);
                        dot.shouldBounce = false;
                        dot.bouncesRemaining = 0;
                    });
                    lastWindowBounds = null;
                }
                lastCheckedMode = currentMode;
            }
            
            // Determine if we should use border targets and window collision
            const shouldUseBorder = currentMode === 'terminal' && !currentMinimized;
            
            // Check for window resize and update border targets
            let currentBounds: WindowBounds | null = null;
            if (shouldUseBorder) {
                currentBounds = getMacWindowBounds();
                if (currentBounds && lastWindowBounds) {
                    // Only update if window dimensions actually changed significantly
                    // Increased threshold to prevent jittering from small position changes
                    const widthChanged = Math.abs(currentBounds.width - lastWindowBounds.width) > 10;
                    const heightChanged = Math.abs(currentBounds.height - lastWindowBounds.height) > 10;
                    const posChanged = Math.abs(currentBounds.left - lastWindowBounds.left) > 10 ||
                                      Math.abs(currentBounds.top - lastWindowBounds.top) > 10;
                    
                    if (widthChanged || heightChanged || posChanged) {
                        dots.forEach((dot, index) => {
                            const target = calculateBorderTarget(index, dots.length, currentBounds!);
                            dot.setTarget(target.x, target.y);
                        });
                        lastWindowBounds = currentBounds;
                    }
                } else if (currentBounds && !lastWindowBounds) {
                    // First time setting bounds
                    lastWindowBounds = currentBounds;
                }
            }
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Determine which radius to use: 75 for terminal mode, adjustable for minimized mode
            const effectiveRadius = currentMode === 'terminal' && !currentMinimized ? 75 : interactionRadiusRef.current;
            
            dots.forEach(dot => {
                // Pass window bounds only in terminal mode when not minimized
                dot.update(mouseX, mouseY, isInteractiveRef.current, shouldUseBorder ? currentBounds : null, effectiveRadius);
            });
        };

        // Mouse/Touch move handlers
        const handleMouseMove = (e: MouseEvent) => {
            if (!isInteractiveRef.current) return;
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isInteractiveRef.current) return;
            if (e.touches.length > 0) {
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
            }
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        const handleTouchEnd = () => {
            // Reset interaction point so the exclusion radius doesn't stick on mobile
            mouseX = -1000;
            mouseY = -1000;
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
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
        window.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup function
        return () => {
            if (currentScrollContainer) {
                currentScrollContainer.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchcancel', handleTouchEnd);
            window.removeEventListener('mouseleave', handleMouseLeave);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };

    }, []); // Empty dependency array - only initialize once

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
                pointerEvents: isInteractive ? 'auto' : 'none',
                cursor: isInteractive ? 'crosshair' : 'default',
                transition: 'cursor 0.2s ease'
            }} 
        />
    );
};

export default InteractiveBackground;

