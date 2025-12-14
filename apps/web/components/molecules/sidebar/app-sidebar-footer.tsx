"use client";

import { useDisclosure } from "@/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { Skeleton } from "@repo/ui/components/skeleton";
import { ChevronDown, ChevronUp, User2 } from "lucide-react";
import { useAuth } from "@/store";

export function AppSidebarFooter() {
  const { isOpen, open, close } = useDisclosure();
  const { user, loading, logout } = useAuth();

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu
            open={isOpen}
            onOpenChange={(setIsOpen) => (setIsOpen ? open() : close())}
          >
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="flex justify-between">
                <div className="flex items-center gap-3 truncate">
                  <User2 />{" "}
                  {loading ? (
                    <Skeleton className="h-4 w-[150px]" />
                  ) : (
                    user?.fullname
                  )}
                </div>
                <div className="flex flex-col">
                  {isOpen === true ? (
                    <ChevronDown className="translate-y-1" size={15} />
                  ) : (
                    <ChevronUp className="translate-y-1" size={15} />
                  )}
                  {isOpen === true ? (
                    <ChevronUp className="-translate-y-1" size={15} />
                  ) : (
                    <ChevronDown className="-translate-y-1" size={15} />
                  )}
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span onClick={logout}>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
