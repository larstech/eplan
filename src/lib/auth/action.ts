import { auth } from "@/lib/auth/server"

export async function authAction<T>(action: (userId: string) => Promise<T>) {
  const { data: session } = await auth.getSession()

  if (!session) {
    return
  }

  return await action(session.user.id)
}

export async function adminAction<T>(action: () => Promise<T>) {
  const { data: session } = await auth.getSession()

  if (!session || session.user.role !== "admin") {
    return
  }

  return await action()
}
