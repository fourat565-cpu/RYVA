import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4',
    md: 'h-8',
    lg: 'h-12',
    xl: 'h-24',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg 
        viewBox="0 0 80 40" 
        className={sizeClasses[size]} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <text 
          x="0" 
          y="30" 
          fill="white" 
          fontFamily="Inter, sans-serif" 
          fontWeight="900" 
          fontSize="24" 
          letterSpacing="0.1em"
        >
          RYVA
        </text>
      </svg>
    </div>
  );
};
