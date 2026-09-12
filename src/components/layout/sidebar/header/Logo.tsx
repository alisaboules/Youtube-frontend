import Youtube from '@/assets/youtube.svg';
import Link from "next/link";
import { PUBLIC_PAGE } from "@/config/public-page.config";

export function Logo() {
  return (
    <Link href={PUBLIC_PAGE.HOME} className="flex justify-start items-center gap-1">
      <Youtube className="" />
      <span className="font-medium text-lg">YouTube</span>
    </Link>
  );
}
