import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  color?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, color = '#7C3AED', ...props }, ref) => {
    const percentage = Math.min(Math.max(0, value), max) / max * 100;
    
    return (
      <div
        className={cn(
          'relative h-3 w-full overflow-hidden rounded-full bg-white/10 depth-1',
          className
        )}
        ref={ref}
        {...props}
      >
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(to right, ${color}, ${color})`,
          }}
        />
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress };