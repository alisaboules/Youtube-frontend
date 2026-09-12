import { Menu } from "lucide-react";
import { Logo } from "./Logo";

export function SidebarHeader({ toggleSidebar}: {toggleSidebar: () => void} ) {
  return (
    <div className="flex gap-5 items-center mt-3 pl-2">
      <button onClick={toggleSidebar} className="opacity-85 hover:opacity-100 transition-opacity" title="Toggle Sidebar">
        <Menu className="stroke-2"/>
      </button>
      <Logo />
    </div>
  );
}