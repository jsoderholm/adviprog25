import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../-components/header";

export const Route = createFileRoute("/_authenticated/searchresults")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full">
      <Header></Header>
      <div className="grid grid-cols-20 grid-rows-4 gap-4 p-2 pb-4 pr-4 h-10/12">
        <div className="col-start-2 col-span-7 row-span-4 bg-gradient-to-t from-gray-600 to-background rounded-xl"></div>
        <div className="col-start-10 col-span-5 row-span-4 bg-gradient-to-b from-gray-600 to-background rounded-l-xl">
          7 day forecast
        </div>
        <div className="col-span-5 row-span-4 bg-gradient-to-b from-gray-600 to-background rounded-r-xl">
          Find popular points of interest
        </div>
      </div>
    </div>
  );
}

//border-[width-1px]
/**
        <div className="col-span-13 col-start-1 row-span-2 gap-4 bg-gradient-to-r from-gray-600 to-background rounded-l-xl"></div>
        <div className="row-start-3 col-span-6 row-span-2 bg-gradient-to-r from-gray-400 to-background rounded-l-xl"></div>
        <div className="row-start-3 col-span-9 row-span-2 bg-gradient-to-r from-background to-gray-600"></div>
        <div className="col-span-7 row-span-2 bg-gradient-to-r from-background to-gray-400 rounded-r-xl"></div>
        <div className="col-span-5 row-span-2 bg-gradient-to-r from-gray-500 to-background rounded-r-xl"></div>
 */
