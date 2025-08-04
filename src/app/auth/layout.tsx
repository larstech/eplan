type LayoutParams = Readonly<{ children: React.ReactNode }>

export default function Layout({ children }: LayoutParams) {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <main className="max-w-sm">{children}</main>
    </div>
  )
}
