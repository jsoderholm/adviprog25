import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RecentCard(props: {
  city: string;
  country: string;
  icon: any; // icon type should be changed once its clear what it is
}) {
  return (
    <Card className="w-full bg-foreground text-background rounded-none pb-10 hover:bg-primary/90">
      <CardHeader>
        <CardTitle>{props.city}</CardTitle>
        <CardDescription>{props.country}</CardDescription>
        <CardAction>{props.icon}</CardAction>
      </CardHeader>
    </Card>
  );
}
