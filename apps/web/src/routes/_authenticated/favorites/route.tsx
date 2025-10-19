import { createFileRoute } from "@tanstack/react-router";
import { FavoritesPresenter } from "@/presenters/favorites.presenter";

export const Route = createFileRoute("/_authenticated/favorites")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FavoritesPresenter />;
}
