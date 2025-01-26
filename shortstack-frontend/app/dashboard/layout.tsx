import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        <SidebarTrigger />
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">{children}</main>

        {/* Sidebar Trigger (optional for mobile toggling) */}
      </div>
    </SidebarProvider>
  );
}
