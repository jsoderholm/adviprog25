import { createFileRoute } from "@tanstack/react-router";
import { AccountPagePresenter } from "@/presenters/account.presenter";

export const Route = createFileRoute("/_authenticated/account")({
  component: AccountPagePresenter,
});
