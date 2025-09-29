import { createFileRoute, redirect } from "@tanstack/react-router";
import { authQueryOptions } from "@/lib/query/auth-queries";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location, context: { queryClient } }) => {
    const session = await queryClient.fetchQuery(authQueryOptions);

    if (!session.data) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    return session;
  },
});
