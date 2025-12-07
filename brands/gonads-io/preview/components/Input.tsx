'use client';

import React from 'react';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  disabled = false,
  fullWidth = false,
  className = '',
  icon,
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-[#CBD5E1] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-4 py-3 ${icon ? 'pl-12' : ''}
            bg-[#1E293B]
            border-2 border-[#334155]
            rounded-lg
            text-white
            placeholder:text-[#64748B]
            font-medium
            transition-all duration-300
            focus:outline-none
            focus:border-[#9333EA]
            focus:shadow-[0_0_20px_rgba(147,51,234,0.3)]
            disabled:opacity-50
            disabled:cursor-not-allowed
            ${error ? 'border-[#EF4444]' : ''}
          `}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-[#EF4444] font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
