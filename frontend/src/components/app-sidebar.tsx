import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Calendar,
  ChevronRight,
  CircleHelp,
  Contact,
  HelpCircle,
  LayoutGrid,
  Settings,
  User,
} from "lucide-react";

import dhvsuLogo from "../assets/icons/dhvsu-logo-v2.svg";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { Link, useLocation } from "react-router-dom";
import { StudentCreds, TeacherCreds, UsersType } from "@/lib/types";
import {
  navItemsAdmin,
  navItemsStudent,
  navItemsTeacher,
} from "@/constants/data";

const items = {
  subMenuList: [
    {
      title: "Student",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Profile",
          url: "/user/profile",
        },
        {
          title: "Grades",
          url: "/user/grades",
        },
        {
          title: "Settings",
          url: "/user/settings",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/user/profile",
      icon: Settings,
    },
    {
      title: "Help",
      url: "/user/help",
      icon: HelpCircle,
    },
  ],
};

export function AppSidebar({
  user,
  token,
  setUser,
  setToken,
}: {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: UsersType;
  setUser: React.Dispatch<React.SetStateAction<UsersType | null>>;
}) {
  const { pathname } = useLocation();
  const user_creds =
    user.user.user_type === "S"
      ? (user.user_creds as StudentCreds)
      : (user.user_creds as TeacherCreds);

  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={"/user/dashboard"}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <img src={dhvsuLogo} loading="lazy" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    DON HONORIO VENTURA STATE UNIVERSITY
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {(user.user.user_type === "S"
              ? navItemsStudent
              : user.user.user_type === "T" &&
                (user_creds as TeacherCreds).isAdmin
              ? navItemsAdmin
              : navItemsTeacher
            ).map((item) => {
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.url}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                            >
                              <Link to={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <Link to={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <NavSecondary items={items.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={user!}
          token={token}
          setToken={setToken}
          setUser={setUser}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
