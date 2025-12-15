"use client";

import { useAuth } from "@/store";
import { useDisclosure } from "@/hooks";
import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Skeleton } from "@repo/ui/components/skeleton";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/config";
import { profileProps } from "@/types";
import { useRouter } from "next/navigation";

const urlApiDoc = `${env.api.next_public_api_url}/docs`;

export function Profile({ icons }: profileProps) {
  const { user, loading } = useAuth();

  return (
    <div className="flex gap-3">
      <div className="flex items-center">
        <Image
          src={
            "https://images.unsplash.com/photo-1655993810480-c15dccf9b3a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580"
          }
          alt="saya"
          height={30}
          width={30}
          className="rounded-full"
        />
      </div>
      <div className="leading-tight flex items-center max-w-[150px]">
        <div className="font-bold truncate">
          {loading ? <Skeleton className="h-4 w-[100px]" /> : user?.fullname}
        </div>
      </div>
      <div className="md:flex items-center hidden">{icons}</div>
    </div>
  );
}

export function NavbarProfile() {
  const { logout } = useAuth();
  const { isOpen, open, close } = useDisclosure();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(setIsOpen) => (setIsOpen ? open() : close())}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 h-9 w-9 rounded-full overflow-hidden md:h-auto md:w-auto md:rounded-md md:px-2 cursor-pointer"
        >
          {/* mobile: avatar doang, md: seluruh profile */}
          <span className="md:hidden block h-full w-full">
            <Image
              src="https://images.unsplash.com/photo-1655993810480-c15dccf9b3a0?auto=format&fit=crop&q=80&w=580"
              alt="saya"
              height={36}
              width={36}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="hidden md:block">
            {isOpen
              ? Profile({ icons: <ChevronUp /> })
              : Profile({ icons: <ChevronDown /> })}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem> */}
        <DropdownMenuItem>
          <Link href={urlApiDoc} target="_blank">
            API
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
