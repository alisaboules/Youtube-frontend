import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Heading } from "@/ui/Heading";
import { Settings } from "lucide-react";
import type { Metadata } from "next";
import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = {
  title: 'Settings',
  ...NO_INDEX_PAGE
}

export default function SettingsPage() {
  return (
    <section className="px-10">
      <Heading IconMe={Settings} isH1={true}>
        Settings
      </Heading>

      <SettingsForm />
    </section>
  );
}