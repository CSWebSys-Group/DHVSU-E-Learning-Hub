import { Home } from 'lucide-react';
import { FloatingDock } from '@/components/ui/floating-nav';

const links = [
    {
        title: 'Home',
        icon: <Home className="h-full w-full text-brand dark:text-neutral-300" />,
        href: '/',
    },
];

const FloatingNav = () => {
    return (
        <div className="absolute bottom-4 right-4">
            <FloatingDock
                mobileClassName="translate-y-20" // only for demo, remove for production
                items={links}
            />
        </div>
    );
};
export default FloatingNav;
