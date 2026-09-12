import { Suspense } from "react";
import { Auth } from "./Auth";

export default function Page() {
  return (
  <Suspense fallback={<div>Loading...</div>}>
    <Auth />
  </Suspense>);
}