import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

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
      <SidebarInset className="m-2">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  ),
});
