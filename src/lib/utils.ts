import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

class Utils {
  public static cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
}
export { Utils };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
