import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ElementRef, InputHTMLAttributes, forwardRef } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  icon?: string;
  label?: string;
  error?: string;
  fieldClassName?: string;
};

const Field = forwardRef<ElementRef<'input'>, Props>(
  ({ icon, label, required, error, fieldClassName, ...field }, ref) => {
    return (
      <div className={cn('flex flex-col gap-2', fieldClassName)}>
        <div className="space-y-1">
          <Input icon={icon} ref={ref} {...field} label={label} required={required} />
          <FieldError error={error} />
        </div>
      </div>
    );
  }
);

Field.displayName = 'Field';

export default Field;

export function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return <div className="ml-0.5 text-sm text-destructive">{error}</div>;
}
