"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  ChevronUp,
  Home,
  Link,
  User2,
  QrCode,
  PaperclipIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import shortstack from "../public/shortstack-logo.png";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { SignOut } from "@/app/actions/sign-out";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Link",
    url: "/dashboard/link",
    icon: Link,
  },
  {
    title: "QR Code",
    url: "/dashboard/qr-code",
    icon: QrCode,
  },
  {
    title: "Page",
    url: "/dashboard/pgge",
    icon: PaperclipIcon,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState({ firstName: "", lastName: "" });

  // Fetch user details from the backend
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        // Decode the token to get the user ID
        const decodedToken = jwtDecode(token);
        const userId = (decodedToken as { userId: string }).userId;

        // Fetch user details using the getUser endpoint
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        console.log("User details response:", data);
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to fetch user details");
      }
    };

    fetchUserDetails();
  }, []);

  const { firstName, lastName } = user;

  const handleLogout = async () => {
    toast.info("Logging out...");
    await SignOut();
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="p-6">
            <Image
              src={shortstack || "/placeholder.svg"}
              alt="shortstack logo"
              width={150}
              className="dark:invert"
            />
          </SidebarGroupLabel>
          <SidebarSeparator />
          <SidebarGroupContent className="px-2 py-4">
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={`
                          flex items-center gap-3 px-4 py-2.5 rounded-md
                          transition-colors duration-200
                          ${
                            isActive
                              ? "bg-primary/10 text-primary hover:bg-primary/15"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }
                        `}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            isActive ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <User2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                      <span className="font-medium">
                        {firstName} {lastName}
                      </span>
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-[--radix-dropdown-menu-trigger-width]"
              >
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Logging out..." : "Log out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
