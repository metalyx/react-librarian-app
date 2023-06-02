import React from 'react';

interface iErrorSpan {
    children?: React.ReactNode;
    isVisible?: boolean;
}

const ErrorSpan: React.FC<iErrorSpan> = ({ children, isVisible = true }) => {
    if (isVisible) {
        return <span className='font-bold text-red-600'>{children}</span>;
    } else {
        return <></>;
    }
};

export default ErrorSpan;
