import { AppSidebar } from "@/components/nav/app-sidebar"
import NavHeader from "@/components/nav/nav-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import "@/styles/globals.css"

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
