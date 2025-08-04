import "@/styles/globals.css"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/nav/app-sidebar"
import NavHeader from "@/components/nav/nav-header"

type LayoutParams = Readonly<{ children: React.ReactNode }>

export default function Layout({ children }: LayoutParams) {
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
