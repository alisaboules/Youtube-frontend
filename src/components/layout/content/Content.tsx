import type { PropsWithChildren } from "react";
import { Header } from "./header/Header";

export function Content({ children }: PropsWithChildren<unknown>) {
  return (
    <div style={{flex: '1 1 0%'}}>
      <Header />
      <section>{children}</section>
    </div>
  )
}