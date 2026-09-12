'use client'
import { useEffect, useState, type PropsWithChildren } from "react";
import { Content } from "./content/Content";
import { Sidebar } from "./sidebar/Sidebar";
import { cn } from "@/utils/cn";

export function Layout({ children }: PropsWithChildren<unknown>) {
  const [isShowedSidebar, setIsShowedSidebar] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-open');

    if (saved !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsShowedSidebar(saved === 'true');
    }
  }, []);
  const toggleSidebar = () => {
     setIsShowedSidebar(prev => {
      const next = !prev;

      localStorage.setItem('sidebar-open', String(next));

      return next;
    });
  }
  return (
    <main className={cn('flex initialSidebar', isShowedSidebar ? 'showedSidebar' : 'hidedSidebar')}>
      <Sidebar toggleSidebar={toggleSidebar}/>
      <Content>{children}</Content>
    </main>
  );
}