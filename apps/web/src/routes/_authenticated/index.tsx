import { Separator } from "@radix-ui/react-separator";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip } from "@/components/ui/tooltip";
import { AuthenticationForm } from "../(auth)/-components/authentication-form";

export const Route = createFileRoute("/_authenticated/")({
  component: () => (
    <div className="flex ">
      <div>
        Hello "/_authenticated/index"!
        <Card />
        <Card />
        <Card />
        <Card>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At</p>
        </Card>
      </div>
      <div>
        Hello "/_authenticated/index"!
        <Card />
        <Card />
        <Card />
        <Card>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At</p>
        </Card>
      </div>
      <Card>
        <Button>Click me</Button>
      </Card>
      <AuthenticationForm />
    </div>
  ),
});
