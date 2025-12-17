"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui/components/sidebar";
import {
  Activity,
  Brain,
  Building2,
  CalendarClock,
  FileWarning,
  Home,
} from "lucide-react";
import { cn } from "@repo/ui/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  {
    title: "Prediksi Rehabilitasi",
    url: "/dashboard/prediksi-rehabilitas",
    icon: Brain,
  },
  {
    title: "Fasilitas Overview",
    url: "/dashboard/fasilitas-overview",
    icon: Building2,
  },
  { title: "Follow Up", url: "/dashboard/follow-up", icon: CalendarClock },
  {
    title: "Analisis Risiko",
    url: "/dashboard/analisis-risiko",
    icon: Activity,
  },
  { title: "Log Sistem", url: "/dashboard/log-sistem", icon: FileWarning },
];

export function AppSidebarContent() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarContent>
      <SidebarGroup className="flex items-center justify-center gap-2">
        <SidebarGroupLabel>Badan Narkotika Nasional</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="flex gap-3">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title} className="mx-3">
                <SidebarMenuButton
                  className="hover:bg-sidebar-accent dark:hover:bg-sidebar-accent"
                  asChild
                >
                  <Link
                    href={item.url}
                    onClick={handleMenuClick}
                    className={cn(
                      "px-4",
                      pathname === item.url
                        ? "dark:bg-sidebar-accent bg-sidebar-accent"
                        : ""
                    )}
                  >
                    <item.icon size={10} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
