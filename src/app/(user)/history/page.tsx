import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import type { Metadata } from "next";
import { WatchHistory } from "./HistoryPage";

export const metadata: Metadata = {
  title: 'History',
  ...NO_INDEX_PAGE
}

export default function WatchHistoryPage() {
  return (
    <WatchHistory />
  );
}