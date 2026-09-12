import Image from "next/image";
import Link from "next/link";
import { STUDIO_PAGE } from "@/config/studio-page";
import { useProfile } from "@/hooks/useProfile";

export function HeaderAvatar() {
  const { profile } = useProfile();

  return (
    <div className="relative"> 
      <Link href={STUDIO_PAGE.SETTINGS}>
        <Image alt="avatar" width={40} height={40} src={profile?.channel?.avatarUrl || '/default_avatar.jpeg'} className="rounded-full object-cover"/>
      </Link>
      {profile?.verificationToken && 
      <div className="absolute -left-4 -bottom-3.5 bg-primary/90 p-0.5 rounded text-xs w-max">
        Not verified!
      </div>}
    </div>
  );
}