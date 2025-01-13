import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './label';
import { useState } from 'react';
import Icon from './icon';
import VisibilityIcon from '../../assets/visibility.svg';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  icon?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, required, icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = label === 'Password';

    return (
      <div className={cn('flex flex-row gap-2 bg-background-secondary p-4 rounded-2xl', className)}>
        {icon && (
          <div className="flex items-center justify-center mr-4">
            <Icon iconSrc={icon} />
          </div>
        )}
        <div className="flex-1 flex-col gap-2">
          {label && <Label className={cn(required && 'required')}>{label}</Label>}
          <input
            type={isPassword && !showPassword ? 'password' : 'text'}
            className="w-full bg-transparent font-poppins text-base font-bold leading-6 outline-none border-none focus:ring-0"
            ref={ref}
            {...props}
          />
        </div>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center"
          >
            <Icon iconSrc={VisibilityIcon} />
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
