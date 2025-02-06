import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'filled' | 'outlined'; // Prop to decide button style
  className?: string; // Allows custom additional classes
}

const Button: React.FC<ButtonProps> = ({
  children, // Using children instead of label
  onClick = () => {},
  variant = 'filled', // Default to 'filled' variant
  className = '',
}) => {
  const baseStyles =
    'px-6 py-2 rounded-md focus:outline-none focus:ring-2 transition-all duration-300 flex items-center space-x-2 gap-2';

  const variantStyles =
    variant === 'filled'
      ? 'bg-purple-600 text-white hover:bg-purple-700'
      : 'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-100';

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children} {/* Render children */}
    </button>
  );
};

export default Button;
