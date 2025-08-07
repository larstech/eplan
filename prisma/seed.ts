/**
 * DISCLAIMER: All data is AI-generated and not representative of real entities.
 */
import { PrismaClient } from "@/generated/prisma/client"
import type { Address, Customer, CustomerContact } from "@/types/customer"
import type { Employee } from "@/types/employee"
import type { Job } from "@/types/job"
import { fakerNL as faker } from "@faker-js/faker"
import { createId } from "@paralleldrive/cuid2"

const prisma = new PrismaClient()

const EMPLOYEE_COUNT = 25
const CUSTOMER_COUNT = 300
const JOB_COUNT = 900

function generateEmployees(count: number): Employee[] {
  return Array.from({ length: count }, () => ({
    id: createId(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }))
}

function generateCustomers(count: number): Customer[] {
  return Array.from({ length: count }, () => {
    const address: Address = {
      id: createId(),
      country: "NEDERLAND",
      postalCode: faker.location.zipCode(),
      houseNumber: String(faker.number.int({ min: 1, max: 200 })),
      street: faker.location.street(),
      city: faker.location.city().toUpperCase(),
    }

    const contact: CustomerContact = {
      id: createId(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phoneNumber: faker.phone.number(),
    }

    return {
      id: createId(),
      companyName: faker.company.name(),
      address,
      contact,
      travelTimeMinutes: faker.number.int({ min: 5, max: 120, multipleOf: 5 }),
      breakTimeMinutes: 15,
      notes: faker.lorem.sentence({ min: 3, max: 7 }),
    }
  })
}

function generateJobs(count: number, customers: Customer[]): Job[] {
  return Array.from({ length: count }, (_, i) => ({
    id: createId(),
    orderId: 100 + i,
    customer: customers[(CUSTOMER_COUNT + i) % CUSTOMER_COUNT],
    title: faker.lorem.slug({ min: 2, max: 4 }),
    description: faker.lorem.sentences(),
  }))
}

async function seedEmployees(employees: Employee[]) {
  await prisma.employee.createMany({ data: employees })
}

async function seedCustomers(customers: Customer[]) {
  const transactions = customers.map((customer) =>
    prisma.customer.create({
      data: {
        id: customer.id,
        companyName: customer.companyName,
        travelTimeMinutes: customer.travelTimeMinutes,
        breakTimeMinutes: customer.breakTimeMinutes,
        notes: customer.notes,
        address: {
          create: { ...customer.address },
        },
        contact: {
          create: { ...customer.contact },
        },
      },
    }),
  )

  await prisma.$transaction(transactions)
}

async function seedJobs(jobs: Job[]) {
  const transactions = jobs.map((job) =>
    prisma.job.create({
      data: {
        id: job.id,
        orderId: job.orderId,
        title: job.title,
        description: job.description,
        customer: {
          connect: { id: job.customer.id },
        },
      },
    }),
  )

  await prisma.$transaction(transactions)
}

async function main() {
  try {
    const employees = generateEmployees(EMPLOYEE_COUNT)
    const customers = generateCustomers(CUSTOMER_COUNT)
    const jobs = generateJobs(JOB_COUNT, customers)

    await seedEmployees(employees)
    await seedCustomers(customers)
    await seedJobs(jobs)

    console.log("Database seeded successfully.")
  } catch (error) {
    console.error("Failed to seed database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
