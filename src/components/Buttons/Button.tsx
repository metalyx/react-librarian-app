import React from 'react';

interface iButton {
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

const Button: React.FC<iButton> = ({
    className = '',
    disabled = false,
    onClick,
    type = 'button',
    children,
}) => {
    return (
        <button
            type={type}
            className={`border-dashed border-2 border-indigo-600 hover:border-solid ${
                disabled ? 'opacity-[0.5]' : ''
            } ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
