import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  isLight?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  className = "",
  isLight = false,
  size = "md",
}: LogoProps) {
  const blendClass = isLight ? "brightness-110" : "";

  const sizeMap = {
    sm: "w-20 h-20",
    md: "w-30 h-40",
    lg: "w-40 h-50",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div
        className={`
          relative ${sizeMap[size]} rounded-full overflow-hidden
          flex items-center justify-center
          ring-2 ring-white/20
          shadow-md
          bg-white
        `}
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src="/images/the-grove-logo.jpg"
          alt="The Grove by Six Marys"
          className={`w-full h-full object-cover ${blendClass}`}
        />
      </div>
    </div>
  );
}
