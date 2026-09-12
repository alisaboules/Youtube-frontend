import { useUpload } from '@/hooks/useUpload';
import { useId } from 'react';
import type { FieldError } from 'react-hook-form';
import { SkeletonLoader } from '../SkeletonLoader';
import Image from 'next/image';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Props {
  folder?: string;
  value?: string;
  onChange: (url: string) => void;
  label: string;
  error?: FieldError;
  className?: string;
  isImage?: boolean;
  aspectRation?: '16:9' | '1:1';
  overlay?: string;
}

export function UploadField({
  label,
  onChange,
  className,
  error,
  folder,
  isImage = true,
  value,
  aspectRation = '1:1',
  overlay,
}: Props) {
  const { isLoading, uploadFile } = useUpload({ onChange, folder });
  const inputId = useId();
  const isWideScreenRation = aspectRation == '16:9';
  const width = isWideScreenRation ? 446 : 100;
  const height = isWideScreenRation ? 250 : 100;
  return (
    <div className="">
      <label htmlFor={inputId} className="block text-gray-400 font-semibold mb-2">
        {label}
      </label>
      <label
        htmlFor={inputId}
        className="flex hover:bg-primary/90 border-2 transition-colors duration-700 border-primary mb-3 py-1 w-fit items-center px-3 cursor-pointer text-foreground rounded-lg">
        <UploadCloud className="mr-2" />
        Загрузить
      </label>
      <input id={inputId} type="file" onChange={event => {
        const file = event.target.files?.[0];
        if (file) {
          uploadFile(file);
        }}}
        accept="image/*" className="hidden" />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      {isImage && (
        <div>
          {isLoading ? (
            <SkeletonLoader
              style={{
                width,
                height,
              }}
            />
          ) : (
            !!value && (
              <div className="relative" style={{ width, height }}>
                {!!overlay && (
                  <Image
                    alt="Overlay"
                    className={cn('absolute top-0 left-0 w-full h-full object-cove')}
                    src={overlay}
                    fill
                    priority
                  />
                )}
                <Image
                  alt="Upload file"
                  className={className}
                  src={value}
                  width={width}
                  height={height}
                  priority
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
