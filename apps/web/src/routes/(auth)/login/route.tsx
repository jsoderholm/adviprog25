import { createFileRoute } from "@tanstack/react-router";
import { AuthenticationForm } from "../-components/authentication-form";

export const Route = createFileRoute("/(auth)/login")({
  component: () => <AuthenticationForm />,
});
