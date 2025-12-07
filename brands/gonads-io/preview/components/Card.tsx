'use client';

import React from 'react';

export interface CardProps {
  variant?: 'default' | 'gradient' | 'glow';
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  hoverable = false,
}) => {
  const baseStyles = `
    rounded-2xl p-6
    transition-all duration-300
    ${hoverable ? 'cursor-pointer hover:scale-105' : ''}
  `;

  const variantStyles = {
    default: `
      bg-[#1E293B]
      border border-[#334155]
      ${hoverable ? 'hover:border-[#9333EA]' : ''}
    `,
    gradient: `
      bg-gradient-to-br from-[#1E293B] to-[#0F172A]
      border border-[#334155]
      ${hoverable ? 'hover:border-[#9333EA]' : ''}
    `,
    glow: `
      bg-[#1E293B]
      border border-[#9333EA]
      shadow-[0_0_20px_rgba(147,51,234,0.3)]
      ${hoverable ? 'hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]' : ''}
    `,
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <h3 className={`text-2xl font-bold bg-gradient-to-r from-[#9333EA] to-[#14B8A6] bg-clip-text text-transparent ${className}`}>
      {children}
    </h3>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`text-[#CBD5E1] ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`mt-6 pt-4 border-t border-[#334155] ${className}`}>
      {children}
    </div>
  );
};

export default Card;
