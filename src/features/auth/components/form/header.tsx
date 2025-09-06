import getTimeBasedGreeting from "@/lib/greeting"

export default function FormHeader() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-xl font-bold">{getTimeBasedGreeting()}!</h1>
      <p className="text-sm text-muted-foreground">
        Log in op het Elektronisch Planbord
      </p>
    </div>
  )
}
