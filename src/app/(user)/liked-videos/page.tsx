import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import type { Metadata } from "next";
import { LikedVideos } from "./LikedVideos";

export const metadata: Metadata = {
  title: 'Liked',
  ...NO_INDEX_PAGE
}

export default function LikedVideosPage() {
  return (
    <LikedVideos />
  );
}