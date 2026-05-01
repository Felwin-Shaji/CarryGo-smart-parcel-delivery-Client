import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [dotCount, setDotCount] = useState(0);

  // Animate dots dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-black text-white overflow-hidden">
      {/* Animated floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-blue-400/20"
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Logo or App Name */}
      <motion.h1
        className="text-5xl font-bold tracking-widest mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        CarryGo
      </motion.h1>

      {/* Loader ring */}
      <motion.div
        className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Dynamic Loading Text */}
      <motion.p
        className="mt-6 text-lg text-gray-300 font-medium"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Loading{".".repeat(dotCount)}
      </motion.p>

      {/* Subtle gradient shine */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
    </div>
  );
}
