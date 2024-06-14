/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React, { type ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
}

const Button = ({ children, className, isLoading, disabled, ...props }: ButtonProps) => {
    const combinedClassName = [
        'btn',
        className,
        (isLoading || disabled) ? 'btn-disabled' : ''
    ].filter(Boolean).join(' ');
    return (
        <button className={combinedClassName}
            disabled={disabled || isLoading} {...props}>
            {isLoading && <span className="loading loading-spinner"></span>}
            {children}
        </button>
    )
}

export default Button;