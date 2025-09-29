import { authClient } from "@repo/api";
import { queryOptions } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

type UseCreateAccountParams = Parameters<typeof authClient.signUp.email>[0];

export const useCreateAccount = ({
  email,
  password,
}: UseCreateAccountParams) => {
  const navigate = useNavigate();
  authClient.signUp.email(
    {
      email,
      name: email,
      password,
    },
    {
      onSuccess: () => navigate({ to: "/" }),
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    },
  );
};

export const authQueryOptions = queryOptions({
  queryKey: ["auth"],
  queryFn: () => authClient.getSession(),
  staleTime: Number.POSITIVE_INFINITY,
});
