import * as React from 'react';
import Icon from './icon';
import { cn } from '@/lib/utils';
import { Label } from './label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  icon?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, required, icon, ...props }, ref) => {
    return (
      <div className="flex flex-row gap-2 bg-background-secondary p-4 rounded-2xl">
        <div className="flex-col gap-2 flex items-center justify-center mr-2">
          {icon && <Icon iconSrc={icon} />}
        </div>
        <div className="flex-1 flex-col gap-2">
          {label && <Label className={cn(required && 'required')}>{label}</Label>}
          <input
            type={type}
            className="w-full bg-transparent font-poppins text-base font-bold leading-6 outline-none border-none focus:ring-0"
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
