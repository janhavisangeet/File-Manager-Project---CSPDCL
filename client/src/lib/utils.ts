import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (err: unknown): string => {
  return (
    (err as { response?: { data?: { message?: string } } })?.response?.data
      ?.message || "Something went wrong."
  );
};
