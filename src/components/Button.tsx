import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'filled' | 'outlined';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'filled',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles =
    'px-6 py-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300 flex items-center justify-center space-x-2 gap-2';

  const variantStyles = clsx({
    'bg-purple-600 text-white hover:bg-purple-700': variant === 'filled' && !disabled,
    'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-100': variant === 'outlined' && !disabled,
    'bg-gray-400 text-gray-700 cursor-not-allowed': disabled,
  });

  // Combine all styles
  const combinedStyles = clsx(baseStyles, variantStyles, className);

  return (
    <button
      className={combinedStyles}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
