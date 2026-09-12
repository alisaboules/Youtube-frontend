import { PUBLIC_PAGE } from "@/config/public-page.config";
import { authService } from "@/services/auth.services";
import type { TAuthForm, TAuthFormData } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation"
import { useRef, useTransition } from "react";
import reCAPTCHA from 'react-google-recaptcha';
import type { SubmitHandler, UseFormReset } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { clearAuthData } from '@/store/auth.slice';
import { useAppDispatch } from '@/store';

export function useAuthForm(type: 'login' | 'register', reset:UseFormReset<TAuthForm>) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();

  const recaptchaRef = useRef<reCAPTCHA>(null)

  // const {mutateAsync, isPending: isAuthPending} = useMutation({
  //   mutationKey: [type],
  //   mutationFn: (data: TAuthFormData) => authService.main(type, data)
  // })
  const { mutateAsync, isPending: isAuthPending } = useMutation({
  mutationKey: [type],
  mutationFn: ({
    data,
    recaptchaToken
  }: {
    data: TAuthFormData
    recaptchaToken: string
  }) => authService.main(type, data, recaptchaToken)
})
  const onSubmit: SubmitHandler<TAuthForm> = ({email, password}) => {
    const token = recaptchaRef.current?.getValue();

    if (!token) {
      toast.error('Pass the captcha!', {
        id: 'recaptcha'
      });
      return;
    }
 
    toast.promise(mutateAsync({data: {email, password}, recaptchaToken: token}), {
      loading: 'Loading...',
      success: () => {
        startTransition(() => {
          reset()
          router.push(PUBLIC_PAGE.HOME)
        })
        return 'Success login!';
      },
      error: e => {
        if (axios.isAxiosError(e)) {
          dispatch(clearAuthData());
          return e.response?.data?.message;
        }
      }
   })
  }
  const isLoading = isPending || isAuthPending;

  return {
    onSubmit, recaptchaRef, isLoading
  };
}