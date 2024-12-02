import { NavItem } from "../lib/types";
import { Calendar, LayoutGrid, Mail, User } from "lucide-react";

export const navItems: NavItem[] = [
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
  {
    title: "Messages",
    url: "/user/messages",
    icon: Mail,
    isActive: false,
  },
];
