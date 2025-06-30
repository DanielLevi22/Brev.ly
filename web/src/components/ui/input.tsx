import { ComponentProps, forwardRef } from 'react';
import { Warning } from "@phosphor-icons/react";

interface InputProps extends Omit<ComponentProps<'input'>, 'className'> {
  label: string;
  error?: string;
  className?: string;
  prefix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, prefix, ...props }, ref) => {
    const baseClasses = 'w-full py-2 border-[2px] outline-none transition-colors text-grayscale-600';
    
    const stateClasses = error 
      ? 'border-danger bg-red-50' 
      : 'border-grayscale-300 bg-white focus:border-blue-base focus:bg-white focus:outline-none [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[0_0_0_30px_white_inset]';

    const prefixStateClasses = error 
      ? 'border-danger bg-red-50' 
      : 'border-grayscale-300 bg-white group-focus-within:border-blue-base group-focus-within:bg-white';

    const labelClasses = error 
      ? 'text-danger' 
      : 'text-grayscale-500 group-focus-within:text-blue-base';

    return (
      <div className={`space-y-2 group ${className || ''}`}>
        <label className={`uppercase text-xs font-medium transition-colors ${labelClasses}`}>
          {label}
        </label>
        <div className="flex items-stretch">
          {prefix && (
            <span className={`pl-3 py-2 border-[2px] border-r-0 rounded-l-lg text-grayscale-400 text-sm select-none ${prefixStateClasses} flex items-center`}>
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            className={
              baseClasses +
              ' ' +
              stateClasses +
              ' ' +
              (prefix
                ? 'rounded-l-none rounded-r-lg border-l-0 '
                : 'rounded-lg px-3')
            }
            {...props}
          />
        </div>
        
        {error && (
          <div className="flex items-center gap-1 text-sm text-grayscale-500">
            <Warning size={16} className="text-danger flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';