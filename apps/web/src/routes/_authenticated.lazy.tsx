import {
  createLazyFileRoute,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Route = createLazyFileRoute("/_authenticated")({
  component: () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
      navigate({ to: "/" });
    };

    return (
      <SidebarProvider
        style={
          {
            "--sidebar-width": "6rem",
            "--sidebar-width-mobile": "6rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <div className="w-full flex flex-col h-full">
          <Header handleLogoClick={handleLogoClick} />
          <main>
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    );
  },
});
