import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  isLight?: boolean;
}

export default function Logo({ className = "", isLight = false }: LogoProps) {
  // Use blending modes to make the image blend into its container
  // If isLight is true (dark background), we might want to invert or use screen blend mode
  // If isLight is false (light background), multiply is usually best for dark logos on light bg
  
  const blendClass = isLight 
    ? "mix-blend-screen filter brightness-200 contrast-125" // Assuming it needs to be visible on dark
    : "mix-blend-multiply"; // Good for dark logo on light bg

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex items-center justify-center bg-transparent">
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src="/images/g.png" 
          alt="Villa Dacanay Resort" 
          className={`w-full h-full object-cover ${blendClass}`}
        />
      </div>
    </div>
  );
}
