import { cn } from '@/utils/cn';
import type { Ref, TextareaHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
  registration?: UseFormRegisterReturn;
  textareaRef?: Ref<HTMLTextAreaElement>;
}

export function Textarea({ error, label, registration, className, textareaRef, ...props }: Props) {
  return (
    <div className={cn('', { 'mb-4': label })}>
      <label>
        {label && <span className="block text-gray-400 font-semibold mb-2">{label}</span>}
        <textarea
          className={cn(
            'w-full h-24 overflow-y-scroll py-2 px-2 border-2 bg-tertiary rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-0 focus:border-border resize-none',
            error ? 'border-red-500' : 'border-transparent',
            className,
          )}
          {...props}
          {...(registration ? registration : {})}
          ref={(element) => {
            if (registration) {
              registration.ref(element);
            }
            if (typeof textareaRef === 'function') {
              textareaRef(element);
            } else if (textareaRef) {
              // eslint-disable-next-line react-hooks/immutability
              textareaRef.current = element;
            }
          }}
        />
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
