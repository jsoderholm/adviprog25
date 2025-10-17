import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function WeatherInfoCard(props: {
  dailyData: any; // TODO
  hourlyData: any; // TODO
}) {
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  function extractHourMinute(dateString: string): string {
    const date = new Date(dateString);
    const h = date.getUTCHours().toString().padStart(2, "0");
    const m = date.getUTCMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  }

  function hourlyDataMap(index: number) {
    const hour = index * 24;
    const rows = [];
    for (let i = hour; i < hour + 24; i++) {
      rows.push(
        <tr key={i} className="border-b border-gray-700 text-[20px]">
          <td className="p-1">{extractHourMinute(props.hourlyData.time[i])}</td>
          <td className="p-1 text-center">
            {Math.round(props.hourlyData.temperature_2m[i])}°
          </td>
          <td className="p-1 text-center">
            {Math.round(props.hourlyData.uv_index[i])}
          </td>
        </tr>,
      );
    }
    return rows;
  }

  function dailyDataMap() {
    console.log(props.dailyData.sunrise[0]);
    console.log(extractHourMinute(props.dailyData.sunrise[0]));
    const days = props.dailyData.time.length;
    const items = [];
    for (let i = 0; i < days; i++) {
      items.push(
        <AccordionItem
          key={i}
          value={String(i)}
          className="border-b border-gray-700"
        >
          <AccordionTrigger className="grid grid-cols-6 gap-2 text-[20px] px-3 py-2 text-gray-200 hover:border hover:border-yellow-300 data-[state=open]:border data-[state=open]:border-yellow-300 rounded-none hover:cursor-pointer">
            <span>{formatDate(props.dailyData.time[i])}</span>
            <span className="text-center">
              {Math.round(props.dailyData.temperature_2m_max[i])}° /{" "}
              {Math.round(props.dailyData.temperature_2m_min[i])}°
            </span>
            <span className="text-center">
              {Math.round(props.dailyData.precipitation_sum[i])} mm
            </span>
            <span className="text-center">
              {props.dailyData.precipitation_probability_max[i]}%
            </span>
            <span className="text-center">
              {Math.round(props.dailyData.wind_speed_10m_max[i])} m/s
            </span>
            <span className="text-center">
              {extractHourMinute(props.dailyData.sunrise[i])} /
              {extractHourMinute(props.dailyData.sunset[i])}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-3 py-2 bg-primary/1 border-t border-gray-700">
            <table className="w-full text-gray-300 text-[20px]">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-[20px]">
                  <th className="p-1 text-left">Hour</th>
                  <th className="p-1 text-center">Temp (°C)</th>
                  <th className="p-1 text-center">UV</th>
                </tr>
              </thead>
              <tbody>{hourlyDataMap(i)}</tbody>
            </table>
          </AccordionContent>
        </AccordionItem>,
      );
    }
    return items;
  }

  return (
    <div className="m-2 text-gray-200 overflow-scroll">
      <h1 className="text-3xl font-bold mb-1">
        Forecast: {props.dailyData.time.length}-days
      </h1>
      <div className="grid grid-cols-6 gap-2 text-[16px] uppercase tracking-wide text-gray-400 border-b border-gray-700 px-3 py-1">
        <span>Date</span>
        <span className="text-center">Max / Min °C</span>
        <span className="text-center">Precip mm</span>
        <span className="text-center">Precip %</span>
        <span className="text-center">Wind m/s</span>
        <span className="text-center">Sunrise / Sunset</span>
      </div>

      <Accordion type="single" collapsible>
        {dailyDataMap()}
      </Accordion>
    </div>
  );
}
