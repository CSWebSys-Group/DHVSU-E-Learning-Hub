"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UsersType } from "@/lib/types";

export function NavUser({
  user,
  token,
  setUser,
  setToken,
}: {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: UsersType;
  setUser: React.Dispatch<React.SetStateAction<UsersType | null>>;
}) {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();

  const userAvatar = user?.user_creds.profile_picture || "/avatars/shadcn.jpg";

  async function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const res = await fetch("/api/logout", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // const data = await res.json();
      // console.log(data);

      if (res.ok) {
        setUser(null);
        setToken(null);
        Cookies.remove("authToken");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={userAvatar}
                  alt={user?.user_creds.id.toString()}
                />
                <AvatarFallback className="rounded-lg">
                  {user.user_creds.fn[0].toUpperCase() +
                    user.user_creds.ln[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.user_creds.fn!}
                </span>
                <span className="truncate text-xs">{user?.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border-dhvsu-light"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={userAvatar}
                    alt={user?.user_creds.id.toString()}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.user_creds.fn[0].toUpperCase() +
                      user.user_creds.ln[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight text-white">
                  <span className="truncate font-semibold">
                    {user?.user_creds.fn}
                  </span>
                  <span className="truncate text-xs">{user?.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to="/user/profile">
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </Link>
              <Link to="/user/subjects">
                <DropdownMenuItem>Subjects</DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <button className="w-full" onClick={handleLogout}>
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
