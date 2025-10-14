// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import type { AppModel } from "@/model";

// export function WeatherInfoCard(props: {
//   dailyData: AppModel["apiTestResponse"]["weather"]["daily"];
//   hourlyData: AppModel["apiTestResponse"]["weather"]["hourly"];
// }) {
//   function formatDate(dateString: string): string {
//     const date = new Date(dateString);
//     const options: Intl.DateTimeFormatOptions = {
//       weekday: "long",
//       month: "short",
//       day: "numeric",
//     };
//     return date.toLocaleDateString("en-US", options);
//   }

//   function extractHourMinute(dateString: string): string {
//     const date = new Date(dateString);
//     const hours = date.getHours().toString().padStart(2, "0");
//     const minutes = date.getMinutes().toString().padStart(2, "0");
//     return `${hours}:${minutes}`;
//   }

//   function hourlyDataMap(index: number) {
//     const hour = index * 24;
//     const elements = [];

//     for (let i = hour; i < hour + 24; i++) {
//       elements.push(
//         <tr>
//           <td>{extractHourMinute(props.hourlyData.time[i])}</td>
//           <td>{props.hourlyData.temperature_2m[i]}</td>
//           <td>{props.hourlyData.uv_index[i]}</td>
//         </tr>,
//       );
//     }
//     return elements;
//   }

//   function dailyDataMap() {
//     const numberOfDays = props.dailyData.time.length;
//     const elements = [];

//     for (let i = 0; i < numberOfDays; i++) {
//       elements.push(
//         <AccordionItem key={i} value={String(i)} className="">
//           <AccordionTrigger className="p-2 border rounded-none hover:bg-primary/40 data-[state=open]:bg-primary/40 ">
//             {formatDate(props.dailyData.time[i])}{" "}
//             {props.dailyData.temperature_2m_max[i]}/
//             {props.dailyData.temperature_2m_min[i]}{" "}
//             {props.dailyData.precipitation_sum[i]}{" "}
//             {props.dailyData.precipitation_probability_max[i]}{" "}
//             {props.dailyData.wind_speed_10m_max[i]}{" "}
//             {extractHourMinute(props.dailyData.sunrise[i])}/
//             {extractHourMinute(props.dailyData.sunset[i])}
//           </AccordionTrigger>
//           <AccordionContent className="border p-2">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Header 1</th>
//                   <th>Header 2</th>
//                   <th>Header 3</th>
//                 </tr>
//               </thead>
//               <tbody>{hourlyDataMap(i)}</tbody>
//             </table>
//           </AccordionContent>
//         </AccordionItem>,
//       );
//     }

//     return elements;
//   }

//   return (
//     <Accordion type="single" collapsible className="m-2">
//       <div className="whitespace-pre border p-2">
//         Date Max/Min C Precipitation mm Precipitation % Wind max Sunrise/Sunset
//       </div>
//       {dailyDataMap()}
//     </Accordion>
//   );
// }
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
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  }

  function hourlyDataMap(index: number) {
    const hour = index * 24;
    const rows = [];
    for (let i = hour; i < hour + 24; i++) {
      rows.push(
        <tr key={i} className="border-b border-gray-700 text-sm">
          <td className="p-1">{extractHourMinute(props.hourlyData.time[i])}</td>
          <td className="p-1 text-center">
            {Math.round(props.hourlyData.temperature_2m[i])}°
          </td>
          <td className="p-1 text-center">
            {Math.round(props.hourlyData.uv_index[i])}
          </td>
        </tr>
      );
    }
    return rows;
  }

  function dailyDataMap() {
    const days = props.dailyData.time.length;
    const items = [];
    for (let i = 0; i < days; i++) {
      items.push(
        <AccordionItem
          key={i}
          value={String(i)}
          className="border-b border-gray-700"
        >
          <AccordionTrigger className="grid grid-cols-6 gap-2 text-sm px-3 py-2 text-gray-200 hover:bg-gray-800 data-[state=open]:bg-gray-800">
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
          <AccordionContent className="px-3 py-2 bg-gray-900 border-t border-gray-700">
            <table className="w-full text-gray-300 text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="p-1 text-left">Hour</th>
                  <th className="p-1 text-center">Temp (°C)</th>
                  <th className="p-1 text-center">UV</th>
                </tr>
              </thead>
              <tbody>{hourlyDataMap(i)}</tbody>
            </table>
          </AccordionContent>
        </AccordionItem>
      );
    }
    return items;
  }

  return (
    <div className="m-2 text-gray-200 overflow-scroll">
      {/* header bar aligned with triggers */}
      <div className="grid grid-cols-6 gap-2 text-xs uppercase tracking-wide text-gray-400 border-b border-gray-700 px-3 py-1">
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
