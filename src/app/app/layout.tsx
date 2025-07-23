import "@/styles/globals.css"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/nav/app-sidebar"
import NavHeader from "@/components/nav/nav-header"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <NavHeader />

        <main className="p-2">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
