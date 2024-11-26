import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleFormtTime = (created: number) => {
  const now = new Date();
  const eventDate = new Date(created * 1000); // Convert Unix timestamp to milliseconds
  const diff = now.getTime() - eventDate.getTime();

  if (diff < 0) {
    return "The event is in the future!";
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const map = new Map<string, number>([
    ["seconds", seconds],
    ["minutes", minutes],
    ["hours", hours],
    ["days", days],
    ["months", months],
    ["years", years],
  ]);

  let min = Number.MAX_SAFE_INTEGER;
  let name;
  for (const [unit, value] of map) {
    if (value < min && value > 0) {
      min = value;
      name = unit;
    }
  }
  return `${min} ${name} ago`; //
};
