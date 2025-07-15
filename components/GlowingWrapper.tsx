
import React from 'react';

interface GlowingWrapperProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
}

const GlowingWrapper: React.FC<GlowingWrapperProps> = ({ children, className = '', borderRadius = 'rounded-lg' }) => {
  return (
    <div className={`p-px bg-gradient-to-br from-blue-500 to-purple-500 ${borderRadius} ${className}`}>
      {children}
    </div>
  );
};

export default GlowingWrapper;
