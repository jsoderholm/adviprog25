import { authClient } from "@repo/api";
import { Link, useMatch, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAppForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const authenticationSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const AuthenticationForm = () => {
  const isLogin = useMatch({ from: "/(auth)/login", shouldThrow: false });
  const navigate = useNavigate();

  const form = useAppForm({
    validators: {
      onSubmit: authenticationSchema,
    },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      const options: Parameters<typeof authClient.signIn.email>[1] = {
        onSuccess: () => navigate({ to: "/" }),
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      };

      if (isLogin) authClient.signIn.email(value, options);
      else
        authClient.signUp.email(
          {
            ...value,
            name: value.email,
          },
          options,
        );
    },
  });

  return (
    <div className="grid min-h-svh">
      <div className="flex justify-center px-4 py-20">
        <div className="flex flex-col justify-center w-full max-w-sm gap-8">
          <h1 className="text-3xl font-medium">
            {isLogin ? "Log in" : "Create your account"}
          </h1>
          <form.AppForm>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="grid gap-4"
            >
              <Button
                variant="outline"
                type="button"
                className="w-full"
                disabled
              >
                <Icons.google />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                type="button"
                className="w-full"
                disabled
              >
                <Icons.gitHub />
                Continue with Github
              </Button>

              <div className="relative text-sm text-center after:border-border after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="relative z-10 px-2 text-xs bg-background text-muted-foreground">
                  OR
                </span>
              </div>

              <form.AppField
                name="email"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Email</field.FormLabel>
                    <field.FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        autoComplete="username"
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </field.FormControl>
                  </field.FormItem>
                )}
              />

              <form.AppField
                name="password"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Password</field.FormLabel>
                    <field.FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="current-password"
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </field.FormControl>
                  </field.FormItem>
                )}
              />

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full"
                  >
                    {isSubmitting && (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    )}
                    {isLogin ? "Log in" : "Continue"}
                  </Button>
                )}
              />

              <div className="text-center">
                <span className="text-sm">
                  {isLogin ? "Don't" : "Already"} have an account?&nbsp;
                  <Link
                    to={isLogin ? "/signup" : "/login"}
                    className="underline"
                  >
                    {isLogin ? "Create your account" : "Log in"}
                  </Link>
                </span>
              </div>
            </form>
          </form.AppForm>
        </div>
      </div>
    </div>
  );
};
