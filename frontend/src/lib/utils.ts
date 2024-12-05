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
