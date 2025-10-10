import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LandingpageView } from "./-landingpageView";

export const Route = createFileRoute("/_authenticated/landingpage")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const { model } = Route.useRouteContext();

  function handleSearch() {
    console.log(searchLocation);
    console.log(model.apiTestResponse);
    //Perform api call
    navigate({ to: "/searchresults" });
  }

  function inputChange(value: string) {
    setSearchLocation(value);
  }

  return (
    <LandingpageView
      isDisabled={!searchLocation.trim()}
      inputChange={inputChange}
      buttonPress={handleSearch}
    />
  );
}
