import useSWR, { SWRConfiguration } from "swr";
import { AuthorizationService } from "services";

const authService = new AuthorizationService();

function useLoginStatus(opts?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/users/me`,
    async () => {
      const res = await authService.getUsersData();
      return res;
    },
    {
      ...opts,
      revalidateOnFocus: false,
    }
  );

  return {
    loginStatus: !isLoading ? (error ? ("loggedOut" as const) : ("loggedIn" as const)) : "loading",
    isLoading: isLoading,
    user: data,
    mutate,
  };
  // return {
  //   loginStatus: error
  //     ? ("loggedOut" as const)
  //     : !data
  //     ? ("loading" as const)
  //     : ("loggedIn" as const),
  //   user: data,
  //   mutate,
  // };
}

export default useLoginStatus;
