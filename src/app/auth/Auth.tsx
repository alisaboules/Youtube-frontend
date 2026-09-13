'use client';

import { Logo } from '@/components/layout/sidebar/header/Logo';
import { useAuthForm } from '@/hooks/useAuthForm';
import type { TAuthForm } from '@/types/auth.types';
import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { SkeletonLoader } from '@/ui/SkeletonLoader';
import { cn } from '@/utils/cn';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

export function Auth() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isLogin = searchParams.get('mode') === 'login';

  const setAuthMode = (login: boolean) => {
    router.replace(`/auth?mode=${login ? 'login' : 'register'}`);
  };
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<TAuthForm>({
    mode: 'onChange',
  });
  const type = isLogin ? 'login' : 'register';
  const { onSubmit, recaptchaRef, isLoading } = useAuthForm(type, reset);
  const [isCaptchaLoaded, setIsCaptchaLoaded] = useState(false);
  useEffect(() => {
  const checkCaptcha = () => {
    const iframe = document.querySelector(
      '.recaptcha iframe'
    );

    if (iframe) {
      setIsCaptchaLoaded(true);
    }
  };

  checkCaptcha();

  const observer = new MutationObserver(checkCaptcha);

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => observer.disconnect();
}, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/4 p-5 border-border border-2 rounded-xl">
        <div className="text-center flex justify-center mb-2">
          <Logo />
        </div>
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={() => setAuthMode(true)}
            className={cn(
              'px-4 py-2 font-semibold border-b-2',
              isLogin ? 'text-primary border-primary' : 'text-gray-600 border-transparent',
            )}>
            Log in
          </button>
          <button
            type="button"
            onClick={() => setAuthMode(false)}
            className={cn(
              'px-4 py-2 font-semibold border-b-2',
              !isLogin ? 'text-primary border-primary' : 'text-gray-600 border-transparent',
            )}>
            Sign up
          </button>
        </div>
        {isLoading ? (
          <SkeletonLoader count={4} className={'h-10'} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field
              label="Email"
              type="email"
              registration={register('email', { required: 'Email is required.' })}
              error={errors.email?.message}
              placeholder="Enter email..."
            />
            <Field
              label="Password"
              type="password"
              registration={register('password', { required: 'Password is required.' })}
              error={errors.password?.message}
              placeholder="Enter password..."
            />
            {!isLogin && (
              <Field
                label="Password confirmation"
                type="password"
                registration={register('confirmPassword', {
                  required: 'Password confirmation is required.',
                  validate: (value) => value == getValues('password') || "Passwords don't match.",
                })}
                error={errors.confirmPassword?.message}
                placeholder="Enter password again..."
              />
            )}
            {/* <ReCAPTCHA ref={recaptchaRef} size='normal' sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string} className="recaptcha"  hl="en"/> */}
            <div className="relative min-h-20 mb-4">
              {!isCaptchaLoaded && <SkeletonLoader className="absolute inset-0 h-20" />}

              <div className={isCaptchaLoaded ? 'opacity-100' : 'opacity-0'}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="normal"
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                  className="recaptcha"
                  hl="en"
                  onLoad={() => setIsCaptchaLoaded(true)}
                />
              </div>
            </div>
            <div className="text-center">
              <Button isLoading={isLoading} type="submit" variant='primary'>
                {isLogin ? 'Log in' : 'Sign up'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
