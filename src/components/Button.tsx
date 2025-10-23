import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

/**
 * Reusable button component with primary and secondary variants
 */
const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  const styles = variant === 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-700'
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300';

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold ${styles}`}
    >
      {children}
    </button>
  );
};

export default Button;