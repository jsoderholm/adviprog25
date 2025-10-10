import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Header } from "../-components/header";

export function LandingpageView(props: {
  isDisabled: boolean;
  inputChange: (value: string) => void;
  buttonPress: () => void;
}) {
  function handleSearch() {
    props.buttonPress();
  }

  function handleInputChange(event: { target: { value: string } }) {
    props.inputChange(event.target.value);
  }

  return (
    <div className="w-full">
      <Header></Header>
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
                  onChange={handleInputChange}
                  className="rounded-none placeholder:text-primary placeholder:text-[1.1rem]"
                />
                <Button
                  type="button"
                  variant="default"
                  className="rounded-none text-[1.05rem]"
                  onClick={handleSearch}
                  disabled={props.isDisabled}
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
        <div className="col-span-5 row-span-2 bg-gradient-to-r from-gray-500 to-background rounded-r-xl"></div>
        {/*border-[width-1px]  */}
      </div>
    </div>
  );
}
