import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/landingpage")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full">
      <header className="h-2/12 content-center">
        <div className="text-7xl text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 inline-block pl-10">
          <h2 className="italic inline-block font-bold">Globe</h2>
          <h2 className="inline-block text-yellow-300 tracking-widest">Cast</h2>
          <p className="text-[1.31rem] pt-2 text-primary tracking-widest font-light italic">
            -traveling made easy
          </p>
        </div>
        <div className="h-1 w-[99%] mx-auto mt-4 bg-gradient-to-r from-yellow-300 to-blue-700 rounded-full"></div>
      </header>

      <div className="grid grid-cols-20 grid-rows-4 gap-4 p-2 pb-4 pr-4 h-10/12">
        <div className="col-span-13 col-start-1 row-span-2 gap-4">
          <Card className="bg-gradient-to-r from-gray-600 to-background border-[width-1px] h-full rounded-r-none">
            <CardHeader>
              <CardTitle className="text-2xl">
                Find your city and weather forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="flex w-[75%] items-center gap-2">
                <Input
                  type="city"
                  placeholder="Search..."
                  className="rounded-none placeholder:text-primary placeholder:text-[1.13rem]"
                />
                <Button
                  type="submit"
                  variant="default"
                  className="rounded-none"
                >
                  Search!
                </Button>
              </div>
              <p className="pt-13 text-xl">Recents:</p>
              <div className="flex pt-2 gap-2">
                <Card className="w-full bg-foreground text-background rounded-none pb-10 hover:bg-primary/90">
                  <CardHeader>
                    <CardTitle>Stockholm</CardTitle>
                    <CardDescription>Sweden</CardDescription>
                    <CardAction>ICON</CardAction>
                  </CardHeader>
                </Card>
                <Card className="w-full bg-foreground text-background rounded-none hover:bg-primary/90">
                  <CardHeader>
                    <CardTitle>Washington</CardTitle>
                    <CardDescription>United States</CardDescription>
                    <CardAction>ICON</CardAction>
                  </CardHeader>
                </Card>
                <Card className="w-full bg-foreground text-background rounded-none hover:bg-primary/90">
                  <CardHeader>
                    <CardTitle>London</CardTitle>
                    <CardDescription>United Kingdom</CardDescription>
                    <CardAction>ICON</CardAction>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="row-start-3 col-span-6 row-span-2 bg-gradient-to-r from-gray-400 to-background rounded-l-xl"></div>
        <div className="row-start-3 col-span-9 row-span-2 bg-gradient-to-r from-background to-gray-600"></div>
        <div className="col-span-7 row-span-2 bg-gradient-to-r from-background to-gray-400 rounded-r-xl"></div>
        <div className="col-span-5 row-span-2 bg-gradient-to-r from-gray-500 to-background rounded-r-xl"></div>{" "}
        {/*border-[width-1px]  */}
      </div>
    </div>
  );
}
//md:min-h-min min-h-[100vh]

// <div className="flex flex-1 flex-col gap-4 p-2 pt-2 grid-rows-4">
//   <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//     <div className="bg-muted/50 aspect-video rounded-xl" />
//   </div>
//   <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//     <div className="bg-muted/60 aspect-video rounded-xl" />
//   </div>
//   <div className="bg-muted/70  flex-1 rounded-xl " />
// </div>

// <div className="h-2/12 content-center px-6 py-2 border mt-2 border-blue-500 rounded-lg inline-block">
//   <h2 className="text-7xl gap-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 uppercase tracking-wider">
//     GlobeCast
//     <p className="text-2xl pt-1 lowercase">~Traveling made easy~</p>
//   </h2>
// </div>
