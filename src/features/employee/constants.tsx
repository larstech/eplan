import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { EmployeeField } from "@/features/employee"
import { strToBool } from "@/utils/boolean"
import z from "zod"

export const employeeFields: EmployeeField[] = [
  {
    name: "firstName",
    label: "Voornaam",
    input: ({ field }) => <Input required {...field} />,
  },
  {
    name: "lastName",
    label: "Achternaam",
    input: ({ field }) => <Input required {...field} />,
  },
  {
    name: "freelancer",
    label: "ZZP'er",
    input: ({ field }) => {
      const selected = strToBool(field.value)

      return (
        <div className="flex items-center gap-1">
          <Checkbox
            checked={field.value === "true"}
            onCheckedChange={(checked) =>
              field.onChange(checked ? "true" : "false")
            }
            {...field}
          />
          <span className="italic text-sm font-normal">
            (Geselecteerd: {selected ? "Ja" : "Nee"})
          </span>
        </div>
      )
    },
  },
]

export const employeeSchema = z.object({
  firstName: z.string().min(3, { error: "Gebruik minimaal 3 tekens" }),
  lastName: z.string().min(3, { error: "Gebruik minimaal 3 tekens" }),
  freelancer: z.string(),
})
