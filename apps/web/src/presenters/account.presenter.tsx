import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useDeleteAccount } from "@/models/account.model";
import { authQueryOptions } from "@/lib/query/auth-queries";
import { AccountView } from "@/views/account.view";

export const AccountPagePresenter = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteAccount = useDeleteAccount({
    onSuccess: async () => {
      toast.success("Your account has been deleted.");
      await queryClient.invalidateQueries({
        queryKey: authQueryOptions.queryKey,
      });
      navigate({ to: "/login" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <AccountView
      onDelete={() => deleteAccount.mutate()}
      isDeleting={deleteAccount.isPending}
    />
  );
};
