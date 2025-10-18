import { createFileRoute } from "@tanstack/react-router";
import { LandingPagePresenter } from "@/presenters/landing.presenter";

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LandingPagePresenter />;
}
