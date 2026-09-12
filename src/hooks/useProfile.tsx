import { userService } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.getProfile(),
    refetchInterval: 1800000
  })
  
  return { profile: data?.data, isLoading, isSuccess, refetch};
}