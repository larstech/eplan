"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getPathnameData } from "@/utils/pathname"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export default function NavHeader() {
  const pathname = usePathname()
  const pathnameData = getPathnameData(pathname)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />

      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />

      <Breadcrumb>
        <BreadcrumbList>
          {pathnameData.map((data, index) => {
            if (data.current) {
              return (
                <BreadcrumbItem>
                  <BreadcrumbPage>{data.section}</BreadcrumbPage>
                </BreadcrumbItem>
              )
            }

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={data.url}>{data.section}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
