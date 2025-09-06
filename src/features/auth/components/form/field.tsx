import {
  FormControl,
  FormField as CnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthFieldData, AuthFormData } from "@/features/auth"
import { UseFormReturn } from "react-hook-form"

type ComponentParams = {
  form: UseFormReturn<AuthFormData>
  field: AuthFieldData
}

export default function FormField({ form, field }: ComponentParams) {
  const { label, name, placeholder, type } = field

  return (
    <CnFormField
      key={name}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} required {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
