import { authClient } from "@repo/api";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, HomeIcon, LogOut } from "lucide-react";
import { useCallback } from "react";
import { authQueryOptions } from "@/lib/query/auth-queries";
import { Icons } from "./icons";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSignOut = useCallback(async () => {
    await authClient.signOut();
    await queryClient.invalidateQueries({
      queryKey: authQueryOptions.queryKey,
    });
    navigate({ to: "/login" });
  }, [queryClient, navigate]);

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="md:h-8 md:p-0">
              <Link to="/" className="flex items-center justify-center size-6">
                <Icons.logo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarItem icon={<HomeIcon />} title="Home" to="/" />
              <SidebarItem icon={<Heart />} title="Favorites" to="/favorites" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col items-center">
        <ModeToggle />
        <Button size="icon" variant="ghost" onClick={handleSignOut}>
          <LogOut />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

type SidebarItemProps = {
  icon: React.ReactNode;
  title: string;
  to: React.ComponentProps<typeof Link>["to"];
};

const SidebarItem = ({ icon, title, to }: SidebarItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={{
          children: title,
          hidden: false,
          sideOffset: 10,
        }}
        asChild
      >
        <Link
          to={to}
          className="flex items-center justify-center"
          activeProps={{ className: "bg-muted" }}
        >
          {icon}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
