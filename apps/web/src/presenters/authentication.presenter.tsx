import { authClient } from "@repo/api";
import { useMatch, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { toast } from "sonner";
import z from "zod";
import { useAppForm } from "@/components/ui/form";
import { AuthenticationView } from "@/views/authentication.view";

const authenticationSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type UseAuthenticationFormParams = {
  isLogin: ReturnType<typeof useMatch>;
};

export function AuthenticationPresenter() {
  const isLogin = useMatch({ from: "/(auth)/login", shouldThrow: false });
  const form = useAuthenticationForm({ isLogin });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form],
  );

  return (
    <AuthenticationView isLogin={isLogin} onSubmit={handleSubmit} form={form} />
  );
}

export const useAuthenticationForm = ({
  isLogin,
}: UseAuthenticationFormParams) => {
  const navigate = useNavigate();

  const form = useAppForm({
    validators: {
      onSubmit: authenticationSchema,
    },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const options: Parameters<typeof authClient.signIn.email>[1] = {
        onSuccess: () => {
          if (!isLogin)
            toast.success("Please check your email to confirm your account.");

          navigate({
            to: isLogin ? "/" : "/login",
            replace: true,
          });
        },
        onError: (ctx) => {
          if (ctx.error.message) toast.error(ctx.error.message);
        },
      };

      const { signIn, signUp } = authClient;

      if (isLogin) await signIn.email(value, options);
      else
        await signUp.email(
          {
            ...value,
            name: value.email,
          },
          options,
        );
    },
  });

  return form;
};
