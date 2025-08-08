import { motion } from "framer-motion";

export function AnimatedPaper() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
      {/* Single A4 paper emerging from under the printer and flying upward */}
      <motion.div
        className="absolute w-40 h-56 bg-white rounded-sm shadow-xl border border-gray-200"
        initial={{ 
          x: -20, 
          y: 120, // Start from under the printer
          rotate: 0, 
          opacity: 0,
          scale: 0.8
        }}
        animate={{
          x: [-20, -15, -10, 0, 20, 60],
          y: [120, 80, 40, -20, -100, -200], // Move upward and fly away
          rotate: [0, 2, 5, 8, 12, 15],
          opacity: [0, 0.3, 0.8, 1, 0.8, 0],
          scale: [0.8, 0.9, 1, 1.1, 1.2, 1.3]
        }}
        transition={{
          duration: 4,
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          ease: "easeOut"
        }}
      >
        <div className="p-3">
          {/* Printed content lines */}
          <div className="w-full h-1.5 bg-indigo-300 rounded mb-2"></div>
          <div className="w-4/5 h-1.5 bg-gray-300 rounded mb-2"></div>
          <div className="w-full h-1.5 bg-gray-300 rounded mb-2"></div>
          <div className="w-3/5 h-1.5 bg-gray-300 rounded mb-2"></div>
          <div className="w-full h-1.5 bg-gray-300 rounded mb-2"></div>
          <div className="w-2/3 h-1.5 bg-gray-300 rounded mb-2"></div>
          
          {/* More printed content */}
          <div className="mt-4 space-y-1">
            <div className="w-full h-1 bg-blue-200 rounded"></div>
            <div className="w-4/5 h-1 bg-blue-200 rounded"></div>
            <div className="w-full h-1 bg-blue-200 rounded"></div>
            <div className="w-2/3 h-1 bg-blue-200 rounded"></div>
          </div>
          
          {/* Fresh ink effect simulation */}
          <div className="mt-4 space-y-1">
            <div className="w-3/4 h-1 bg-green-200 rounded"></div>
            <div className="w-full h-1 bg-green-200 rounded"></div>
          </div>
        </div>
        
        {/* Paper holes for realism */}
        <div className="absolute left-1 top-8 w-1 h-1 bg-gray-100 rounded-full"></div>
        <div className="absolute left-1 top-16 w-1 h-1 bg-gray-100 rounded-full"></div>
        <div className="absolute left-1 top-24 w-1 h-1 bg-gray-100 rounded-full"></div>
        <div className="absolute left-1 top-32 w-1 h-1 bg-gray-100 rounded-full"></div>
      </motion.div>
      
      {/* Fresh ink droplets following the paper */}
      <motion.div
        className="absolute w-1 h-1 bg-cyan-500 rounded-full"
        initial={{ x: -15, y: 100, opacity: 0 }}
        animate={{ 
          x: [-15, -10, 5, 25],
          y: [100, 60, 20, -40],
          opacity: [0, 1, 0.8, 0],
          scale: [1, 1.5, 1, 0.5]
        }}
        transition={{ duration: 3, delay: 0.5 }}
      />
      <motion.div
        className="absolute w-1 h-1 bg-magenta-500 rounded-full"
        initial={{ x: -25, y: 110, opacity: 0 }}
        animate={{ 
          x: [-25, -20, -5, 15],
          y: [110, 70, 30, -30],
          opacity: [0, 1, 0.7, 0],
          scale: [1, 1.2, 0.8, 0.3]
        }}
        transition={{ duration: 2.8, delay: 0.7 }}
      />
      <motion.div
        className="absolute w-1 h-1 bg-yellow-500 rounded-full"
        initial={{ x: -10, y: 105, opacity: 0 }}
        animate={{ 
          x: [-10, -5, 10, 35],
          y: [105, 65, 25, -35],
          opacity: [0, 1, 0.6, 0],
          scale: [1, 1.3, 0.9, 0.4]
        }}
        transition={{ duration: 3.2, delay: 0.3 }}
      />
    </div>
  );
}
