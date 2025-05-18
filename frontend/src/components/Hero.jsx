import React, { useEffect, useState } from 'react';
import Button from './Button';
import { motion } from 'framer-motion';

export default function Hero() {
    const [scrollY, setScrollY] = useState(0);
    
    // Handle parallax effect on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Text animation variants
    const titleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.8, 
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const buttonVariants = {
        initial: { scale: 1 },
        hover: { 
            scale: 1.05,
            boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.6)",
            transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 10 
            }
        },
        tap: { scale: 0.95 }
    };

    return (
        <div 
            className="relative w-screen h-screen overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col gap-10 items-center justify-center text-center"
            style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
                backgroundAttachment: "fixed",
                backgroundPosition: `center ${scrollY * 0.2}px` 
            }}
        >
            {/* Dynamic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>

            {/* Animated particles background */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-blue-400"
                        initial={{ 
                            x: Math.random() * window.innerWidth, 
                            y: Math.random() * window.innerHeight,
                            opacity: Math.random() * 0.7 + 0.3
                        }}
                        animate={{ 
                            y: [null, Math.random() * -100, null],
                            opacity: [null, Math.random() * 0.5 + 0.5, null]
                        }}
                        transition={{ 
                            duration: Math.random() * 10 + 10, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{ width: `${Math.random() * 4 + 2}px`, height: `${Math.random() * 4 + 2}px` }}
                    />
                ))}
            </div>

            {/* Main content with staggered animations */}
            <motion.div 
                className="relative z-10 flex flex-col gap-6 p-8 rounded-lg"
                initial="hidden"
                animate="visible"
                variants={titleVariants}
            >
                <motion.p 
                    className="text-white text-lg md:text-xl lg:text-2xl font-semibold tracking-wide"
                    variants={childVariants}
                >
                    IT'S TIME TO 
                </motion.p>
                <motion.h1 
                    className="uppercase font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-lg"
                    variants={childVariants}
                >
                    Be Active <span className="text-blue-400 inline-block transform hover:scale-105 transition-transform duration-300">Buddy</span>
                </motion.h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="relative z-10 max-w-3xl backdrop-blur-sm bg-black/40 px-6 py-8 rounded-2xl shadow-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-500"
            >
                <motion.span 
                    className="block text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    WARNING: You're About to Become
                </motion.span>
                
                <motion.span 
                    className="block text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                >
                    The Local <span className="text-blue-400">Powerhouse</span>! 
                    <motion.span
                        animate={{ 
                            rotateZ: [0, 20, 0, 20, 0],
                            scale: [1, 1.3, 1, 1.3, 1]
                        }}
                        transition={{ delay: 2.2, duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
                        className="inline-block ml-2"
                    >
                        💪
                    </motion.span>
                </motion.span>
                
                <motion.p
                    className="text-xs md:text-lg font-light text-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.8 }}
                >
                    Get ready for some serious gains. Side effects may include <br />
                    <span className="font-bold text-blue-300 inline-block relative">
                        extreme muscle growth
                        <motion.span 
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 2.5, duration: 0.8 }}
                        />
                    </span>, unstoppable confidence, <br />
                    and the inability to stop flexing in public.
                </motion.p>
            </motion.div>
        </div>
    );
}