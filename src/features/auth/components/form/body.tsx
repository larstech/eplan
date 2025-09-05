import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthFieldData, AuthFormData } from "@/features/auth"
import { UseFormReturn } from "react-hook-form"

type PageParams = {
  form: UseFormReturn<AuthFormData>
  fields: AuthFieldData[]
  attemptLogin: (data: AuthFormData) => void
}

export default function FormBody({ form, fields, attemptLogin }: PageParams) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(attemptLogin)} className="space-y-8">
        {fields.map((data) => (
          <FormField
            key={data.name}
            control={form.control}
            name={data.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">{data.label}</FormLabel>
                <FormControl>
                  <Input
                    type={data.type}
                    placeholder={data.placeholder}
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button loading={form.formState.isSubmitting} className="w-full">
          Inloggen
        </Button>

        {form.formState.errors.root && (
          <span className="text-sm text-red-500">
            Fout: {form.formState.errors.root.message}
          </span>
        )}
      </form>
    </Form>
  )
}
