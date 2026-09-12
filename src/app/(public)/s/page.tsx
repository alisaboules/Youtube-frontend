import SearchPage from "./SearchPage";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Search',
  ...NO_INDEX_PAGE
}

export default function Page() {
  return <SearchPage />
}