import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// "cn" stands for "class names". It's a utility function commonly used to merge and conditionally join CSS class names, especially in React projects using Tailwind CSS or libraries like shadcn/ui.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
