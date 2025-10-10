import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "../-components/header";

export function SearchresultsView() {
  return (
    <div className="w-full">
      <Header></Header>
      <div className="grid grid-cols-20 grid-rows-4 gap-4 p-2 pb-4 pr-4 h-10/12">
        <div className="col-start-2 col-span-7 row-span-4 bg-gradient-to-t from-gray-600 to-background rounded-xl"></div>
        <div className="col-start-10 col-span-5 row-span-4 bg-gradient-to-b from-gray-600 to-background rounded-l-xl">
          <Accordion type="single" collapsible className="m-2">
            <AccordionItem value="item-1" className="border mb-2">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border mb-2">
              <AccordionTrigger>Is it accessible 2?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border">
              <AccordionTrigger>Is it accessible 3?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="col-span-5 row-span-4 bg-gradient-to-b from-gray-600 to-background rounded-r-xl">
          Find popular points of interest
        </div>
      </div>
    </div>
  );
}
