import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface PrinterProps {
  onClick: () => void;
  isPrinting?: boolean;
}

export function Printer({ onClick, isPrinting = false }: PrinterProps) {
  const [isIdle, setIsIdle] = useState(true);

  // Play printing sound when printing starts
  useEffect(() => {
    if (isPrinting) {
      // Create audio context for printing sound
      const playPrintingSound = () => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Create mechanical printing sound
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(150, audioContext.currentTime + 0.5);
        oscillator.frequency.linearRampToValueAtTime(180, audioContext.currentTime + 1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
        
        oscillator.type = 'square';
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1.5);
      };
      
      playPrintingSound();
      setIsIdle(false);
      
      // Reset to idle after printing
      const timer = setTimeout(() => setIsIdle(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isPrinting]);

  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      animate={isPrinting ? {
        y: [0, -5, -2, -5, 0],
        rotate: [0, 2, -1, 1, 0]
      } : {
        y: [0, -3, 0],
        rotate: [0, 0.5, -0.5, 0]
      }}
      transition={{
        duration: isPrinting ? 0.5 : 4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }}
    >
      {/* SVG Printer */}
      <motion.div 
        className="relative scale-125"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <svg width="550" height="415" viewBox="0 0 550 415" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
          <g id="printer-frame">
            <rect width="550" height="415" fill="transparent" />
            <g id="printer">
              <g id="side-panel">
                <path id="Rectangle 24" d="M86 226.488C86 222.07 89.5817 218.488 94 218.488H154.727V237.093H86V226.488Z" fill="#50517B" />
                <path id="Rectangle 23" d="M86 235.791C86 231.372 89.5817 227.791 94 227.791H154.727V402.209H94C89.5817 402.209 86 398.628 86 394.209V235.791Z" fill="#383856" />
                <rect id="Rectangle 34" x="86" y="289.419" width="24.0545" height="33.7209" fill="#27283C" />
              </g>
              <g id="body">
                <path id="Rectangle 1" d="M143.273 227.791H464V394.209C464 398.628 460.418 402.209 456 402.209H151.273C146.854 402.209 143.273 398.628 143.273 394.209V227.791Z" fill="#4F517B" />
                <path id="Rectangle 2" d="M143.273 226.488C143.273 222.07 146.854 218.488 151.273 218.488H456C460.418 218.488 464 222.07 464 226.488V227.791H143.273V226.488Z" fill="#AFAADE" />
                <path id="Rectangle 22" d="M110.055 402.209H442.236V407C442.236 411.418 438.655 415 434.236 415H118.055C113.636 415 110.055 411.418 110.055 407V402.209Z" fill="#27283C" />
              </g>
              <g id="left-control">
                <rect id="Rectangle 7" x="159.309" y="315" width="20.6182" height="69.7674" rx="2" fill="#353553" />
                <path id="Rectangle 10" d="M159.309 370.814H179.927V382.767C179.927 383.872 179.032 384.767 177.927 384.767H161.309C160.205 384.767 159.309 383.872 159.309 382.767V370.814Z" fill="#27283C" />
              </g>
              <g id="color-controls">
                <g id="Group 1">
                  <motion.rect 
                    id="Rectangle 7_2" 
                    x="370.073" 
                    y="315" 
                    width="20.6182" 
                    height="69.7674" 
                    rx="2" 
                    fill="#7FBBF3"
                    animate={isPrinting ? { y: [0, -3, 0] } : {}}
                    transition={{ duration: 0.5, repeat: isPrinting ? Infinity : 0 }}
                  />
                  <path id="Rectangle 10_2" d="M370.073 374.302H390.691V383.93C390.691 385.035 389.795 385.93 388.691 385.93H372.073C370.968 385.93 370.073 385.035 370.073 383.93V374.302Z" fill="#288EEB" />
                </g>
                <g id="Group 2">
                  <motion.rect 
                    id="Rectangle 8" 
                    x="397.564" 
                    y="315" 
                    width="20.6182" 
                    height="69.7674" 
                    rx="2" 
                    fill="#F1A9DD"
                    animate={isPrinting ? { y: [0, -3, 0] } : {}}
                    transition={{ duration: 0.5, delay: 0.1, repeat: isPrinting ? Infinity : 0 }}
                  />
                  <path id="Rectangle 11" d="M397.564 374.302H418.182V383.93C418.182 385.035 417.286 385.93 416.182 385.93H399.564C398.459 385.93 397.564 385.035 397.564 383.93V374.302Z" fill="#E665C2" />
                </g>
                <g id="Group 3">
                  <motion.rect 
                    id="Rectangle 9" 
                    x="425.055" 
                    y="315" 
                    width="20.6182" 
                    height="69.7674" 
                    rx="2" 
                    fill="#F1C398"
                    animate={isPrinting ? { y: [0, -3, 0] } : {}}
                    transition={{ duration: 0.5, delay: 0.2, repeat: isPrinting ? Infinity : 0 }}
                  />
                  <path id="Rectangle 12" d="M425.055 374.302H445.673V383.93C445.673 385.035 444.777 385.93 443.673 385.93H427.055C425.95 385.93 425.055 385.035 425.055 383.93V374.302Z" fill="#E89E59" />
                </g>
              </g>
              <g id="buttons">
                <motion.rect 
                  id="Rectangle 4" 
                  x="370.073" 
                  y="289.419" 
                  width="20.6182" 
                  height="11.6279" 
                  rx="2" 
                  fill="#8485B4"
                  animate={isPrinting ? { scale: [1, 0.95, 1] } : {}}
                  transition={{ duration: 0.3, repeat: isPrinting ? Infinity : 0 }}
                />
                <motion.rect 
                  id="Rectangle 5" 
                  x="397.564" 
                  y="289.419" 
                  width="20.6182" 
                  height="11.6279" 
                  rx="2" 
                  fill="#8485B4"
                  animate={isPrinting ? { scale: [1, 0.95, 1] } : {}}
                  transition={{ duration: 0.3, delay: 0.1, repeat: isPrinting ? Infinity : 0 }}
                />
                <motion.rect 
                  id="Rectangle 6" 
                  x="425.055" 
                  y="289.419" 
                  width="20.6182" 
                  height="11.6279" 
                  rx="2" 
                  fill="#8485B4"
                  animate={isPrinting ? { scale: [1, 0.95, 1] } : {}}
                  transition={{ duration: 0.3, delay: 0.2, repeat: isPrinting ? Infinity : 0 }}
                />
              </g>
              <g id="tray">
                <path id="Rectangle 13" d="M198.255 317C198.255 315.895 199.15 315 200.255 315H350.891C351.995 315 352.891 315.895 352.891 317V402.209H198.255V317Z" fill="#27283C" />
                <g id="tray-bottom">
                  <path id="Rectangle 14" d="M198.255 367.326H213.436C214.541 367.326 215.436 368.221 215.436 369.326V402.209H198.255V367.326Z" fill="#8485B4" />
                  <path id="Rectangle 16" d="M335.709 369.326C335.709 368.221 336.605 367.326 337.709 367.326H352.891V402.209H335.709V369.326Z" fill="#8485B4" />
                  <rect id="Rectangle 15" x="214.291" y="385.93" width="121.418" height="16.2791" fill="#8485B4" />
                </g>
              </g>
              <g id="paper">
                <motion.rect 
                  id="paper-bottom" 
                  x="226" 
                  y="315" 
                  width="98" 
                  height="84" 
                  fill="#E5E5E5"
                  animate={isPrinting ? { y: [0, -5, 0] } : {}}
                  transition={{ duration: 1, repeat: isPrinting ? Infinity : 0 }}
                />
                <rect id="square" x="234" y="323" width="23" height="6" fill="#68BAFA" />
                <rect id="signature" width="21.6634" height="2.36312" transform="matrix(1 0 0.142187 0.98984 234 372)" fill="#27283C" />
                <rect id="text-1" x="234" y="351" width="81.3273" height="5.98007" fill="#C4C4C4" />
                <rect id="text-2" x="234" y="335" width="81.3273" height="5.98007" fill="#C4C4C4" />
              </g>
              <g id="panel">
                <path id="Rectangle 18" d="M200.545 251.558C200.545 249.349 202.336 247.558 204.545 247.558H348.891C351.1 247.558 352.891 249.349 352.891 251.558V255.698H200.545V251.558Z" fill="#27283B" />
                <rect id="Rectangle 17" x="200.545" y="255.698" width="152.345" height="43.0233" fill="#393A5A" />
                <path id="Rectangle 19" d="M200.545 291.279H352.891V298.721C352.891 300.93 351.1 302.721 348.891 302.721H204.545C202.336 302.721 200.545 300.93 200.545 298.721V291.279Z" fill="#27283B" />
              </g>
              <g id="display">
                <rect x="200.545" y="255.698" width="152.345" height="43.0233" fill="#393A5A" />
                
                {/* Animated screen glow */}
                <motion.rect
                  x="205"
                  y="260"
                  width="142"
                  height="33"
                  fill="url(#screenGlow)"
                  animate={{
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.rect 
                  x="210" 
                  y="265" 
                  width="40" 
                  height="8" 
                  fill="#4ADE80"
                  animate={isPrinting ? { opacity: [1, 0.3, 1] } : { opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: isPrinting ? 0.5 : 1.5, repeat: Infinity }}
                />
                
                {/* Typing indicator when idle */}
                {!isPrinting && (
                  <motion.rect
                    x="320"
                    y="265"
                    width="2"
                    height="8"
                    fill="#4ADE80"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
                
                <text x="215" y="273" fill="#22C55E" fontSize="6" fontFamily="monospace">
                  {isPrinting ? "PRINTING..." : "READY"}
                </text>
              </g>
              
              {/* Screen gradient definition */}
              <defs>
                <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Status LED */}
              <motion.circle
                cx="180"
                cy="275"
                r="3"
                fill={isPrinting ? "#10B981" : "#3B82F6"}
                animate={{
                  opacity: isPrinting ? [1, 0.3, 1] : [0.4, 1, 0.4],
                  scale: isPrinting ? [1, 1.3, 1] : [1, 1.2, 1]
                }}
                transition={{
                  duration: isPrinting ? 0.3 : 1.5,
                  repeat: Infinity
                }}
              />
              
              {/* Additional blinking lights */}
              <motion.circle
                cx="320"
                cy="240"
                r="2"
                fill="#EF4444"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  repeat: Infinity
                }}
              />
              
              <motion.circle
                cx="340"
                cy="240"
                r="2"
                fill="#F59E0B"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  delay: 1,
                  repeat: Infinity
                }}
              />
              
              {/* Printing indicator */}
              {isPrinting && (
                <motion.rect
                  x="240"
                  y="280"
                  width="70"
                  height="4"
                  fill="#10B981"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </g>
          </g>
        </svg>
        
        {/* Breathing glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles for ambient effect */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              top: `${200 + i * 40}px`,
              left: `${100 + i * 80}px`
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Extra printing effects */}
        {isPrinting && (
          <>
            {/* Ink droplets */}
            <motion.div
              className="absolute top-[250px] left-[400px] w-1 h-1 bg-cyan-400 rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-[250px] left-[420px] w-1 h-1 bg-magenta-400 rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.5, delay: 0.1, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-[250px] left-[440px] w-1 h-1 bg-yellow-400 rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.5, delay: 0.2, repeat: Infinity }}
            />
          </>
        )}
      </motion.div>
      
      {/* Ambient click hint */}
      <motion.div
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
        animate={{
          opacity: [0.5, 1, 0.5],
          y: [0, -2, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
          <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
            <span className="animate-pulse">👆</span>
            Click to start printing
          </p>
        </div>
      </motion.div>
      
    </motion.div>
  );
}