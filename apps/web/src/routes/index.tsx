import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col space-y-4 items-center justify-center">
      <h1 className="text-2xl font-bold">adviprog25</h1>
    </div>
  );
}
