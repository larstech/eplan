"use client"

import { signIn } from "@/features/auth/actions"
import { AuthFormData } from "@/features/auth/types"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { Button, Container, Form, Spinner } from "react-bootstrap"

const initialFormData: AuthFormData = {
  email: "",
  password: "",
}

export default function SignInView() {
  const router = useRouter()
  const [formData, setFormData] = useState<AuthFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use the partial data object to update the form state, since not all fields may contain a value yet
  const updateFormData = (data: Partial<AuthFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const success = await signIn(formData)
      if (success) {
        router.push("/")
        router.refresh()
      }
    } catch {}

    setIsSubmitting(false)
  }

  return (
    <Container className="mt-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => updateFormData({ email: e.target.value })}
            value={formData.email}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Wachtwoord</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => updateFormData({ password: e.target.value })}
            value={formData.password}
            required
            autoComplete="current-password"
          />
        </Form.Group>

        {/* Confirm creating the contact details */}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <Spinner animation="border" as="span" size="sm" role="status" />
          ) : (
            "Opslaan"
          )}
        </Button>
      </Form>
    </Container>
  )
}
