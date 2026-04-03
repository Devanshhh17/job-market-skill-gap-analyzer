import { motion } from 'framer-motion';

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-dark opacity-100" />
      
      {/* Animated Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Subtly moving gradient blocks */}
      <motion.div
        animate={{
          x: [0, 50, 0, -50, 0],
          y: [0, -50, 0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-900/40 mix-blend-screen blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -80, 0, 80, 0],
          y: [0, 80, 0, -80, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-500/20 mix-blend-screen blur-[150px]"
      />

      {/* Subtle center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-primary-500/5 blur-[200px]" />

      {/* Light vignette */}
      <div className="absolute inset-0 bg-black/40 xl:bg-black/20" style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.9)' }} />
    </div>
  );
};

export default BackgroundEffects;
