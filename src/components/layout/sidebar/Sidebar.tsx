import { usePathname } from "next/navigation";
import { SidebarHeader } from "./header/SidebarHeader";
import { Logout } from "./Logout";
import { SidebarMenu } from "./menus/SidebarMenu";
import { SidebarSubscriptions } from "./menus/subscriptions/SidebarSubscriptions";
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA, STUDIO_SIDEBAR_DATA } from "./sidebar.data";
import { STUDIO_PAGE } from "@/config/studio-page";

export function Sidebar({ toggleSidebar}: {toggleSidebar: () => void}) {
  const pathname = usePathname();
  return (
    <aside className="p-3 flex flex-col border-r border-border whitespace-nowrap overflow-hidden">
      <SidebarHeader toggleSidebar={toggleSidebar}/>
      <div className="bg-border h-px mt-6 mb-2"/>
      <SidebarMenu menu={SIDEBAR_DATA} />
      <div className="bg-border h-px my-3"/>
      <SidebarSubscriptions title="SUBSCRIPTIONS" />
      <div className="bg-border h-px my-3"/>
      <SidebarMenu menu={MORE_SIDEBAR_DATA} title="MORE FROM YOUTUBE"/>
      {!!pathname.includes(STUDIO_PAGE.HOME) && (
        <>
          <div className="bg-border h-px my-3"/>
          <SidebarMenu title="STUDIO" menu={STUDIO_SIDEBAR_DATA}/>
        </>)}
      <Logout />
    </aside>
  )
}