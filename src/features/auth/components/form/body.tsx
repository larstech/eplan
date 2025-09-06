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
  handleSubmit: (data: AuthFormData) => void
}

export default function FormBody({ form, fields, handleSubmit }: PageParams) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {fields.map((data) => {
          const { label, name, placeholder, type } = data

          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">{label}</FormLabel>
                  <FormControl>
                    <Input
                      type={type}
                      placeholder={placeholder}
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        })}

        <Button loading={form.formState.isSubmitting} className="w-full">
          Inloggen
        </Button>

        {form.formState.errors.root && (
          <span className="text-sm text-red-500">
            {form.formState.errors.root.message}
          </span>
        )}
      </form>
    </Form>
  )
}
