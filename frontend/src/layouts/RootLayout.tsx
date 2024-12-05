import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import SearchInput from "@/components/search-input";
import { UserNav } from "@/components/header-user";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import KBar from "@/components/kbar";

import { UsersType } from "@/lib/types";
import { Slash } from "lucide-react";

const RootLayout = ({
  user,
  token,
  setUser,
  setToken,
}: {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: UsersType | null;
  setUser: React.Dispatch<React.SetStateAction<UsersType | null>>;
}) => {
  // Breadcrumb logic
  const { pathname } = useLocation();

  const sample = pathname.split("/").filter(Boolean);

  return (
    <KBar user={user!}>
      <SidebarProvider>
        <AppSidebar
          user={user!}
          token={token!}
          setUser={setUser}
          setToken={setToken}
        />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {sample.map((crumb, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink
                          href={`/${sample.slice(0, index + 1).join("/")}`}
                        >
                          {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < sample.length - 1 && (
                        <BreadcrumbSeparator>
                          <Slash />
                        </BreadcrumbSeparator>
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2 px-4">
              <div className="hidden md:flex">
                <SearchInput />
              </div>
              <UserNav
                user={user!}
                setUser={setUser}
                token={token!}
                setToken={setToken}
              />
            </div>
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
};

export default RootLayout;
