import { NavItem } from '../lib/types';
import { Calendar, LayoutGrid, Mail, User } from 'lucide-react';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutGrid,
    isActive: false,
    items: [],
  },
  {
    title: 'Calendar',
    url: '/calendar',
    icon: Calendar,
    isActive: false,
    items: [],
  },
  {
    title: 'Student',
    url: '#', // Since it's a dropdown menu there is no direct link for the parent
    icon: User,
    isActive: true,
    items: [
      {
        title: 'Profile',
        url: '/profile',
      },
      {
        title: 'Subjects',
        url: '/subjects',
      },
      {
        title: 'Grades',
        url: '/grades',
      },
      {
        title: 'Subject Enrolled',
        url: '/subject-enrolled',
      },
    ],
  },
  {
    title: 'Messages',
    url: '/messages',
    icon: Mail,
    isActive: false,
  },
];
