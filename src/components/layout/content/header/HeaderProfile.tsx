import { PUBLIC_PAGE } from "@/config/public-page.config";
import { useTypedSelector } from "@/store";
import { LinkButton } from "@/ui/button/LinkButton";
import { SkeletonLoader } from "@/ui/SkeletonLoader";
import { HeaderAvatar } from "./HeaderAvatar";

export function HeaderProfile() {
  const { isLoggedIn } = useTypedSelector(state => state.auth);
  	if (isLoggedIn === null) {
		return <SkeletonLoader className="h-10 w-10 mb-0"/>
	}
  return isLoggedIn ? (
   <HeaderAvatar />
  ) : (
    <LinkButton href={PUBLIC_PAGE.AUTH}>Log in</LinkButton>
  );
}