import { Link, type useMatch } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { useAuthenticationForm } from "@/presenters/authentication.presenter";

type AuthenticationViewProps = {
  isLogin: ReturnType<typeof useMatch>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  form: ReturnType<typeof useAuthenticationForm>;
};

export const AuthenticationView = ({
  isLogin,
  onSubmit,
  form,
}: AuthenticationViewProps) => {
  return (
    <div className="grid min-h-svh">
      <div className="flex justify-center px-4 py-20">
        <div className="flex flex-col justify-center w-full max-w-sm gap-8">
          <h1 className="text-3xl font-medium">
            {isLogin ? "Log in" : "Create your account"}
          </h1>
          <form.AppForm>
            <form onSubmit={onSubmit} className="grid gap-4">
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
