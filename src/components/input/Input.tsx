import React from 'react';

interface iInput {
    id?: string;
    type?: string;
    value?: string;
    onChange?: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
    isValid?: boolean;
}

const Input: React.FC<iInput> = ({
    id,
    type,
    className,
    isValid = true,
    onChange,
    value,
}) => {
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            className={`bg-slate-300 rounded p-1 font-bold ${
                !isValid ? 'border-solid border-2 border-red-600' : ''
            } ${className}`}
        />
    );
};

export default Input;
