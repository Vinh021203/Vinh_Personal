// components/Button.tsx
import React from 'react';
import { cn } from '../libs/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-indigo-700 bg-white rounded-full shadow-md transition duration-300 hover:bg-gray-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:scale-95',
        className
      )}
    >
      {children}
    </button>
  );
};
