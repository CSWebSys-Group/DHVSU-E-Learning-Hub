import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UsersType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export function isPastDeadline(deadline: string | Date): boolean {
  // Convert deadline to a Date object if it's a string
  const deadlineDate = new Date(deadline);

  // Get the current date and time
  const now = new Date();

  // Compare the current date with the deadline
  return now > deadlineDate;
}

export function formatDateToUniversal(date: Date) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

export function formatDateTime(dateInput: string): string {
  const date = new Date(dateInput);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Full day name (e.g., "Thursday")
    month: "long", // Full month name (e.g., "December")
    day: "numeric", // Numeric day (e.g., "12")
    year: "numeric", // Full year (e.g., "2024")
    hour: "numeric", // Hour in 12-hour format
    minute: "2-digit", // Two-digit minute
    hour12: true, // AM/PM format
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export const formatDateForInput = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export async function fetchUser(
  token: string | null
): Promise<UsersType | null> {
  if (!token) return null; // Early return if no token is provided

  try {
    const res = await fetch("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Return null on error
  }
}

export function truncateLink(link: string) {
  const lastPart = link.split("/").pop();
  return lastPart!.length > 30 ? lastPart!.substring(0, 30) + "..." : lastPart;
}

export function getFileExtension(url: string): string | null {
  const match = url.match(/\.([a-zA-Z0-9]+)$/);
  return match ? match[1] : null;
}

/**
 * Helper function to format the date from a given deadline.
 * @param deadline The deadline to format, which could be a string, number, or Date object.
 * @returns A formatted date string (YYYY-MM-DD).
 */
export function formatDateForCalendar(
  deadline: string | number | Date
): string {
  const dateObj = new Date(deadline);

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date provided");
  }

  // Format the date as YYYY-MM-DD
  return dateObj.toISOString().split("T")[0];
}

/**
 * Helper function to format the time from a given deadline.
 * @param deadline The deadline to format, which could be a string, number, or Date object.
 * @returns A formatted time string (HH:MM AM/PM).
 */
export function formatTimeForCalendar(
  deadline: string | number | Date
): string {
  const dateObj = new Date(deadline);

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date provided");
  }

  // Format the time as HH:MM AM/PM
  return dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
