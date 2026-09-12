import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { SubscriptionsPage } from "./SubscriptionsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Subscriptions',
  ...NO_INDEX_PAGE
}

export default function SubsPage() {
  return (
    <SubscriptionsPage />
  );
}