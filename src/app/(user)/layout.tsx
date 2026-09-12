import { Layout } from "@/components/layout/Layout";
import type { PropsWithChildren } from "react";


export default function UserLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <Layout>{children}</Layout>
  );
}