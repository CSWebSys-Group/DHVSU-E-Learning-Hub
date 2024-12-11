import { NavItem } from "../lib/types";
import { Calendar, LayoutGrid, Mail, User } from "lucide-react";

export const navItemsStudent: NavItem[] = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: LayoutGrid,
    isActive: false,
    items: [],
  },
  {
    title: "Calendar",
    url: "/user/calendar",
    icon: Calendar,
    isActive: false,
    items: [],
  },
  {
    title: "Student",
    url: "#", // Since it's a dropdown menu there is no direct link for the parent
    icon: User,
    isActive: true,
    items: [
      {
        title: "Profile",
        url: "/user/profile",
      },
      {
        title: "Subjects",
        url: "/user/subjects",
      },
      {
        title: "Grades",
        url: "/user/grades",
      },
    ],
  },
];

export const navItemsAdmin: NavItem[] = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: LayoutGrid,
    isActive: false,
    items: [],
  },
  {
    title: "Calendar",
    url: "/user/calendar",
    icon: Calendar,
    isActive: false,
    items: [],
  },
  {
    title: "Teacher",
    url: "#", // Since it's a dropdown menu there is no direct link for the parent
    icon: User,
    isActive: true,
    items: [
      {
        title: "Profile",
        url: "/user/profile",
      },
      {
        title: "Teachers",
        url: "/user/admin/teachers",
      },
      {
        title: "Students",
        url: "/user/admin/students",
      },
      {
        title: "Courses",
        url: "/user/admin/courses",
      },

      {
        title: "Sections",
        url: "/user/admin/sections",
      },
      {
        title: "Subjects",
        url: "/user/admin/subjects",
      },
      {
        title: "Valid IDs",
        url: "/user/admin/valid-ids",
      },
      {
        title: "Audit Logs",
        url: "/user/admin/audit-logs",
      },
    ],
  },
  {
    title: "Messages",
    url: "/user/messages",
    icon: Mail,
    isActive: false,
  },
];

export const navItemsTeacher: NavItem[] = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: LayoutGrid,
    isActive: false,
    items: [],
  },
  {
    title: "Calendar",
    url: "/user/calendar",
    icon: Calendar,
    isActive: false,
    items: [],
  },
  {
    title: "Teacher",
    url: "#", // Since it's a dropdown menu there is no direct link for the parent
    icon: User,
    isActive: true,
    items: [
      {
        title: "Profile",
        url: "/user/profile",
      },
      {
        title: "Subjects",
        url: "/user/subjects",
      },
    ],
  },
  {
    title: "Messages",
    url: "/user/messages",
    icon: Mail,
    isActive: false,
  },
];
