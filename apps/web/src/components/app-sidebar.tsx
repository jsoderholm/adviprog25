import { authClient } from "@repo/api";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useCallback } from "react";
import { authQueryOptions } from "@/lib/query/auth-queries";
import { Button } from "./ui/button";
import { Sidebar, SidebarContent, SidebarFooter } from "./ui/sidebar";

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
      <SidebarContent className="flex-1" />
      <SidebarFooter>
        <Button
          size="icon"
          variant="ghost"
          className="w-full"
          onClick={handleSignOut}
        >
          <LogOut />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
