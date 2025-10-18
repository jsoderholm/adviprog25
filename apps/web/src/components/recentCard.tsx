import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RecentCardProps = {
  city: string;
  country: string;
  icon: React.ReactNode;
};

export function RecentCard({ city, country, icon }: RecentCardProps) {
  return (
    <Card className="w-full bg-foreground text-background rounded-none pb-10 hover:bg-primary/90">
      <CardHeader>
        <CardTitle>{city}</CardTitle>
        <CardDescription>{country}</CardDescription>
        <CardAction>{icon}</CardAction>
      </CardHeader>
    </Card>
  );
}
