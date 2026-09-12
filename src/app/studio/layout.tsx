import { Layout } from "@/components/layout/Layout";
import type { PropsWithChildren } from "react";

export default function StudioLayout({ children }: PropsWithChildren<unknown>) {
  return <Layout>{children}</Layout>
}