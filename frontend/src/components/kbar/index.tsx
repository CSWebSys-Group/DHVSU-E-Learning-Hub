import { navItemsStudent, navItemsTeacher } from "@/constants/data";
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
} from "kbar";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import RenderResults from "./render-result";
import { UsersType } from "@/lib/types";

export default function KBar({
  user,
  children,
}: {
  user: UsersType;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const navigateTo = (url: string) => {
    navigate(url);
  };

  const actions = useMemo(
    () =>
      (user.user.user_type === "S" ? navItemsStudent : navItemsTeacher).flatMap(
        (navItem) => {
          // Only include base action if the navItem has a real URL and is not just a container
          const baseAction =
            navItem.url !== "#"
              ? {
                  id: `${navItem.title.toLowerCase()}Action`,
                  name: navItem.title,
                  shortcut: navItem.shortcut,
                  keywords: navItem.title.toLowerCase(),
                  section: "Navigation",
                  subtitle: `Go to ${navItem.title}`,
                  perform: () => navigateTo(navItem.url),
                }
              : null;

          // Map child items into actions
          const childActions =
            navItem.items?.map((childItem) => ({
              id: `${childItem.title.toLowerCase()}Action`,
              name: childItem.title,
              shortcut: childItem.shortcut,
              keywords: childItem.title.toLowerCase(),
              section: navItem.title,
              subtitle: `Go to ${childItem.title}`,
              perform: () => navigateTo(childItem.url),
            })) ?? [];

          // Return only valid actions (ignoring null base actions for containers)
          return baseAction ? [baseAction, ...childActions] : childActions;
        }
      ),
    []
  );

  return (
    <KBarProvider actions={actions}>
      <KBarComponent>{children}</KBarComponent>
    </KBarProvider>
  );
}
const KBarComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <KBarPortal>
        <KBarPositioner className="scrollbar-hide fixed inset-0 z-[99999] bg-black/80  !p-0 backdrop-blur-sm">
          <KBarAnimator className="relative !mt-64 w-full max-w-[600px] !-translate-y-12 overflow-hidden rounded-lg border bg-background text-foreground shadow-lg">
            <div className="bg-background">
              <div className="border-x-0 border-b-2">
                <KBarSearch className="w-full border-none bg-background px-6 py-4 text-lg outline-none focus:outline-none focus:ring-0 focus:ring-offset-0" />
              </div>
              <RenderResults />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </>
  );
};
