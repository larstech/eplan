import { getGreetingByTime } from "@/lib/greeting"

export default function FormHeader() {
  const timeBasedGreeting = getGreetingByTime()

  return (
    <div className="space-y-2">
      <h1 className="text-xl text-center font-bold">{timeBasedGreeting}!</h1>
      <p className="text-sm text-center text-muted-foreground">
        Log in op het Elektronisch Planbord
      </p>
    </div>
  )
}
