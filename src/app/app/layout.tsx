import { AppSidebar } from "@/components/nav/app-sidebar"
import NavHeader from "@/components/nav/nav-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/server"
import "@/styles/globals.css"

type LayoutParams = Readonly<{ children: React.ReactNode }>

export default async function Layout({ children }: LayoutParams) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <SidebarProvider>
      {user?.role === "admin" && <AppSidebar />}

      <SidebarInset className="overflow-hidden">
        {user?.role === "admin" && <NavHeader />}

        <main className="p-2">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
