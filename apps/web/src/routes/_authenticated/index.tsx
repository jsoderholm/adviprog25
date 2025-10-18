import { LandingPagePresenter } from "@/presenters/landing.presenter";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LandingPagePresenter />;
}
