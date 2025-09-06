import FormField from "./field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { AuthFieldData, AuthFormData } from "@/features/auth"
import { UseFormReturn } from "react-hook-form"

type ComponentParams = {
  form: UseFormReturn<AuthFormData>
  fields: AuthFieldData[]
  handleSubmit: (field: AuthFormData) => void
}

export default function FormBody({
  form,
  fields,
  handleSubmit,
}: ComponentParams) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {fields.map((field) => (
          <FormField key={field.label} form={form} field={field} />
        ))}

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
