import { Home } from "lucide-react";
import { FloatingDock } from "@/components/ui/floating-nav";

const links = [
  {
    title: "Home",
    icon: <Home className="h-full w-full text-brand dark:text-neutral-300" />,
    href: "/",
  },
];

const FloatingNav = () => {
  return (
    <div className="absolute bottom-4 right-4 md:block">
      <FloatingDock items={links} />
    </div>
  );
};
export default FloatingNav;
