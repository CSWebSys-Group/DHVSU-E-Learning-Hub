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
import { Outlet, useLocation } from "react-router-dom";
import KBar from "@/components/kbar";

const RootLayout = () => {
  // Breadcrumb logic
  const { pathname } = useLocation();

  const sample = pathname.split("/").filter(Boolean);

  return (
    <KBar>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {sample.map((crumb, index) => (
                    <>
                      <BreadcrumbItem className="hidden md:block" key={crumb}>
                        <BreadcrumbLink href={crumb}>
                          {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index > 1 && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                    </>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2 px-4">
              <div className="hidden md:flex">
                <SearchInput />
              </div>
              <UserNav />
            </div>
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
};

export default RootLayout;
