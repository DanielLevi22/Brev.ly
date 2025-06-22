import { ComponentProps } from 'react';
import { Warning } from "@phosphor-icons/react";

interface InputProps extends Omit<ComponentProps<'input'>, 'className'> {
  label: string;
  error?: string;
  className?: string;
  prefix?: string;
}

export function Input({ label, error, className, prefix, ...props }: InputProps) {
  const baseClasses = 'w-full px-3 py-2 border-[2px] outline-none transition-colors text-grayscale-600';
  
  const stateClasses = error 
    ? 'border-danger bg-red-50' 
    : 'border-grayscale-300 bg-white focus:border-blue-base focus:bg-white focus:outline-none peer-[&:not(:placeholder-shown)]:focus:border-grayscale-300';

  const prefixStateClasses = error 
    ? 'border-danger bg-red-50' 
    : 'border-grayscale-300 bg-white group-focus-within:border-blue-base group-focus-within:bg-white peer-[&:not(:placeholder-shown)]:border-grayscale-300';

  const labelClasses = error 
    ? 'text-danger' 
    : 'text-grayscale-500 group-focus-within:text-blue-base peer-[&:not(:placeholder-shown)]:text-grayscale-500';

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
          className={
            baseClasses +
            ' ' +
            stateClasses +
            ' peer ' +
            (prefix
              ? 'rounded-l-none rounded-r-lg border-l-0 pl-2'
              : 'rounded-lg')
          }
          placeholder=" "
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