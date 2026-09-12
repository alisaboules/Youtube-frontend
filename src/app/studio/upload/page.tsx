import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import type { Metadata } from "next";
import { UploadVideo } from "./UploadVideo";


export const metadata: Metadata = {
  title: 'Upload video',
  ...NO_INDEX_PAGE
}

export default function UploadVideoPage() {
  return (
   <UploadVideo />
  );
}