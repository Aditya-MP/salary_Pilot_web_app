'use client';

import { motion } from 'framer-motion';

type MotionType = 'fade' | 'slide-in' | 'scale' | 'bounce' | 'float';

interface MotionWrapperProps {
  children: React.ReactNode;
  type?: MotionType;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const MotionWrapper = ({
  children,
  type = 'fade',
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className = ''
}: MotionWrapperProps) => {
  const getVariants = () => {
    switch (type) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { delay, duration }
          }
        };
      case 'slide-in':
        const initialPosition = {
          up: { y: 20 },
          down: { y: -20 },
          left: { x: 20 },
          right: { x: -20 }
        }[direction];
        
        return {
          hidden: { ...initialPosition, opacity: 0 },
          visible: { 
            x: 0, 
            y: 0, 
            opacity: 1,
            transition: { delay, duration }
          }
        };
      case 'scale':
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { 
            scale: 1, 
            opacity: 1,
            transition: { delay, duration }
          }
        };
      case 'bounce':
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
              delay, 
              duration,
              type: "spring",
              stiffness: 100,
              damping: 10
            }
          }
        };
      case 'float':
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: { delay, duration }
          },
          animate: {
            y: [-5, 5, -5],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay, duration } }
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      initial="hidden"
      animate={type === 'float' ? "animate" : "visible"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;