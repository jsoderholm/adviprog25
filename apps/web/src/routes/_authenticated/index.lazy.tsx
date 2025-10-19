import { createLazyFileRoute } from "@tanstack/react-router";
import { LandingPagePresenter } from "@/presenters/landing.presenter";

export const Route = createLazyFileRoute("/_authenticated/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LandingPagePresenter />;
}
