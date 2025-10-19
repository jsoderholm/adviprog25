import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { authQueryOptions } from "@/lib/query/auth-queries";
import { AccountView } from "@/views/account.view";
import { authClient } from "@repo/api";

export const AccountPagePresenter = () => {
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteAccount = useMutation({
    mutationFn: ({ password }: { password: string }) =>
      authClient.deleteUser({ password }),
    onSuccess: async () => {
      toast.success("Your account has been deleted.");
      await authClient.signOut();
      await queryClient.invalidateQueries({ queryKey: authQueryOptions.queryKey });
      navigate({ to: "/login" });
    },
    onError: (error: any) => {
      const msg = error?.message || error?.error || "Unable to delete account.";
      toast.error(msg);
    },
  });

  const handleDelete = () => {
    if (!password.trim()) {
      toast.error("Enter your password to confirm deletion.");
      return;
    }
    deleteAccount.mutate({ password: password.trim() });
  };

  return (
    <AccountView
      password={password}
      onPasswordChange={setPassword}
      onDelete={handleDelete}
      isDeleting={deleteAccount.isPending}
    />
  );
};
