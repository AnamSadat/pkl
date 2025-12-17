"use client";

import { Button } from "@repo/ui/components/button";
import { Bell, MessageSquareText } from "lucide-react";
import { ButtonTheme, NavbarProfile } from "@/components/molecules";
import { usePathname } from "next/navigation";
import { AppBreadcrumb } from "@/components/organism";

const baseClassButton =
  "bg-transparent text-black dark:text-white cursor-pointer";

function formatPathSegment(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getBreadcrumbItems(pathname: string) {
  const lastSegment =
    pathname === "/" || !pathname
      ? "Home"
      : pathname.split("/").filter(Boolean).pop()!;

  const formattedTitle = formatPathSegment(lastSegment);

  if (pathname === "/dashboard" || formattedTitle === "Dashboard") {
    return [{ name: "Dashboard", href: "/dashboard" }];
  }

  return [{ name: "Dashboard", href: "/dashboard" }, { name: formattedTitle }];
}

export function AppNavbar() {
  const pathname = usePathname();
  const items = getBreadcrumbItems(pathname);

  return (
    <div className="flex py-3 md:py-5 justify-between w-full px-3">
      {/* Breadcrumb - hidden on mobile, show title only */}
      <div className="flex items-center min-w-0">
        <span className="md:hidden font-medium text-sm truncate">
          {items[items.length - 1]?.name}
        </span>
        <div className="hidden md:block">
          <AppBreadcrumb items={items} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 md:gap-3">
        <Button variant="ghost" size="icon" className={baseClassButton}>
          <MessageSquareText className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className={baseClassButton}>
          <Bell className="h-5 w-5" />
        </Button>
        <ButtonTheme />
        <NavbarProfile />
      </div>
    </div>
  );
}
