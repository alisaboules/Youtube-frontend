import { cn } from "@/utils/cn";
import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  label: string,
  error?: string,
  registration: UseFormRegisterReturn
}

export function Field({error, label, registration, ...props}: Props) {
  return (
    <div className="mb-4">
      <label>
        <span className="block text-gray-400 font-semibold mb-2">{label}</span>
        <input className={cn('w-full py-2 px-2 border-2 bg-tertiary rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-0 focus:border-border', error ? 'border-red-500' : 'border-transparent')}
        {...registration}
        {...props}/>
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}