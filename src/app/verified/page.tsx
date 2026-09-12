'use client'
import { useQueryClient } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

export default function VerifiedPage() {
  const queryClient = useQueryClient()
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['profile']
    })
  }, [queryClient])
  return (
    <div className="mt-24 flex flex-col items-center gap-10">
      <div className="flex items-start gap-1 text-center">
        <Check size={50} className="shrink-0 mt-1 text-green-500" />
        <span className="max-w-[500px] text-5xl font-bold leading-tight">
          Email successfully verified!
        </span>
      </div>
      <Image src="/cat.webp" width={300} height={300} alt="cat" className='text-center'/>
    </div>
  );
}
