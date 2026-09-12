'use client'
import { PUBLIC_PAGE } from "@/config/public-page.config";
import { STUDIO_PAGE } from "@/config/studio-page";
import { authService } from "@/services/auth.services"
import { useMutation } from "@tanstack/react-query"
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function Logout() {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      if (pathname.includes(STUDIO_PAGE.HOME) || pathname.includes(STUDIO_PAGE.SETTINGS)) {
        router.push(PUBLIC_PAGE.HOME);
      }
    }
  })

  return (
    <button
      onClick={() => mutate()}
      className={'group py-3 flex items-center gap-5 px-2'}
      title="Log out"
      >
        <LogOut className={'min-w-6 group-hover:text-primary transition group-hover:rotate-6'}/>
        <span className="group-hover:text-primary">{isPending ? 'Please wait...' : 'Log out'}</span>
    </button>
  );
}

