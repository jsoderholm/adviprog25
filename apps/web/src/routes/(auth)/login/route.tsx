import { createFileRoute } from "@tanstack/react-router";
import { AuthenticationPresenter } from "@/presenters/authentication.presenter";

export const Route = createFileRoute("/(auth)/login")({
  component: () => <AuthenticationPresenter />,
});
