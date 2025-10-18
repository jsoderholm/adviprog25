import type { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../ui/button";
import type { ForecastRow } from "./forecast-table";

export const useForecastColumns = (): ColumnDef<ForecastRow>[] =>
  useMemo(
    () => [
      {
        id: "expander",
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={row.getToggleExpandedHandler()}
            >
              {row.getIsExpanded() ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </Button>
          ) : null;
        },
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("date")}</div>
        ),
      },
      {
        accessorKey: "temperature",
        header: "Temperature",
        cell: ({ row }) => <div>{row.getValue("temperature")}</div>,
      },
      {
        accessorKey: "precipitation",
        header: "Precipitation",
        cell: ({ row }) => <div>{row.getValue("precipitation")}</div>,
      },
      {
        accessorKey: "windSpeed",
        header: "Wind Speed",
        cell: ({ row }) => <div>{row.getValue("windSpeed")}</div>,
      },
      {
        accessorKey: "sunriseSunset",
        header: "Daylight Hours",
        cell: ({ row }) => <div>{row.getValue("sunriseSunset")}</div>,
      },
    ],
    [],
  );
