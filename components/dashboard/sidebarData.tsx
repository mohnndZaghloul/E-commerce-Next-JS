import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  BoxIcon,
  User2,
  ListOrderedIcon,
  LayoutDashboard,
} from "lucide-react";
import { routes } from "@/lib/centralized-routes";
import { JSX } from "react";

export const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: <BotIcon />,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export type Role = "ADMIN" | "USER";

type SidebarLink = {
  label: string;
  url: string;
  icon?: JSX.Element;
  roles: Role[];
};

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard />,
    roles: ["ADMIN", "USER"],
  },
  {
    label: "Products",
    url: "/dashboard/products",
    icon: <BoxIcon />,
    roles: ["ADMIN", "USER"],
  },
  {
    label: "Customers",
    url: routes.customers,
    icon: <User2 />,
    roles: ["ADMIN"],
  },
  {
    label: "My Orders",
    url: "/dashboard/orders",
    icon: <ListOrderedIcon />,
    roles: ["ADMIN", "USER"],
  },
];
