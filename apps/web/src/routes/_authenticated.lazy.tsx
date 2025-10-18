import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Route = createLazyFileRoute("/_authenticated")({
  component: () => (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "5rem",
          "--sidebar-width-mobile": "5rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  ),
});
