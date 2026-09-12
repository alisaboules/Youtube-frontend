import { STUDIO_PAGE } from "@/config/studio-page";
import { Bell, LayoutGrid, PlusSquare } from "lucide-react";
import Link from "next/link";

export function HeaderLinks() {
  return (
    <div className="flex items-center gap-2">
      <Link href={STUDIO_PAGE.UPLOAD_VIDEO} title='Upload video' className="transition-opacity hover:opacity-100 opacity-50">
        <PlusSquare size={25}/>
      </Link>
      <Link href={STUDIO_PAGE.HOME} title='Studio' className="transition-opacity hover:opacity-100 opacity-50">
        <LayoutGrid size={25}/>
      </Link>
      <Link href={STUDIO_PAGE.HOME} title='Notifications' className="transition-opacity hover:opacity-100 opacity-50">
        <Bell size={25}/>
      </Link>
    </div>
  );
}