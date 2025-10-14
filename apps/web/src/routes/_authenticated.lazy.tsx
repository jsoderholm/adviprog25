import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";

export const Route = createLazyFileRoute("/_authenticated")({
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
      <div className="w-full">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  ),
});
