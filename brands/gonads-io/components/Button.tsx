'use client';

import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold rounded-lg
    transition-all duration-300
    cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-br from-[#9333EA] to-[#7C3AED]
      text-white
      hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]
      hover:scale-105
      active:scale-95
    `,
    secondary: `
      bg-gradient-to-br from-[#14B8A6] to-[#0D9488]
      text-white
      hover:shadow-[0_0_20px_rgba(20,184,166,0.5)]
      hover:scale-105
      active:scale-95
    `,
    accent: `
      bg-gradient-to-br from-[#F97316] to-[#EA580C]
      text-white
      hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]
      hover:scale-105
      active:scale-95
    `,
    ghost: `
      bg-transparent
      text-[#9333EA]
      border-2 border-[#9333EA]
      hover:bg-[#9333EA]
      hover:text-white
      hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]
    `,
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
