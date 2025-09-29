import { createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_authenticated/")({
  component: () => (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "6rem",
          "--sidebar-width-mobile": "6rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
    </SidebarProvider>
  ),
});
