import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import type { Metadata } from "next";
import { PlayLists } from "./PlayLists";

export const metadata: Metadata = {
  title: 'Playlists',
  ...NO_INDEX_PAGE
}

export default function WatchHistoryPage() {
  return (
    <PlayLists />
  );
}