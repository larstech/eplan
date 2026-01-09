import Sidebar from "@/app/v2/components/sidebar"
import BootstrapClient from "@/app/v2/providers/bootstrap-client"
import "@/app/v2/styles/globals.css"
import { ReactNode } from "react"

type LayoutParams = Readonly<{ children: ReactNode }>

export default async function Layout({ children }: LayoutParams) {
  return (
    <>
      <BootstrapClient />

      <div className="container-fluid">
        <div className="row">
          <aside className="col-md-3 col-lg-2 border-end">
            <Sidebar />
          </aside>

          <main className="col-md-9 col-lg-10">{children}</main>
        </div>
      </div>
    </>
  )
}
