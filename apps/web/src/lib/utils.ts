import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCardBackgroundStyles() {
  return cn(
    "from-primary/5",
    "to-card",
    "dark:bg-card",
    "bg-gradient-to-t",
    "shadow-xs",
  );
}
