/**
 * DISCLAIMER: All data is AI-generated and not representative of real entities.
 */
import { PrismaClient } from "@/generated/prisma/client"
import { Calendar } from "@/types/calendar"
import type { Address, Customer, CustomerContact } from "@/types/customer"
import type { Employee } from "@/types/employee"
import type { Job } from "@/types/job"
import { fakerNL as faker } from "@faker-js/faker"
import { DateTime, Interval } from "luxon"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

const EMPLOYEE_COUNT = 25
const CUSTOMER_COUNT = 300
const JOB_COUNT = 900
const CALENDAR_COUNT = EMPLOYEE_COUNT * 15

function generateEmployees(count: number): Employee[] {
  return Array.from({ length: count }, () => ({
    id: uuidv4(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }))
}

function generateCustomers(count: number): Customer[] {
  return Array.from({ length: count }, () => {
    const address: Address = {
      id: uuidv4(),
      country: "NEDERLAND",
      postalCode: faker.location.zipCode(),
      houseNumber: String(faker.number.int({ min: 1, max: 200 })),
      street: faker.location.street(),
      city: faker.location.city().toUpperCase(),
    }

    const contact: CustomerContact = {
      id: uuidv4(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phoneNumber: faker.phone.number(),
    }

    return {
      id: uuidv4(),
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
    id: uuidv4(),
    orderId: 100 + i,
    customer: customers[(CUSTOMER_COUNT + i) % CUSTOMER_COUNT],
    title: faker.lorem.slug({ min: 2, max: 4 }),
    description: faker.lorem.sentences(),
  }))
}

function generateCalendars(
  count: number,
  jobs: Job[],
  employees: Employee[],
): Calendar[] {
  const dateRange = Interval.after(
    DateTime.local().startOf("week").minus({ week: 1 }),
    { month: 1 },
  )
  const datesInRange = dateRange.splitBy({ day: 1 })

  return Array.from({ length: count }, (_, i) => ({
    id: uuidv4(),
    job: jobs[(jobs.length + i) % jobs.length],
    employee: employees[(employees.length + i) % employees.length],
    date: datesInRange[
      (datesInRange.length + i) % datesInRange.length
    ].start?.toJSDate()!,
    startTime: DateTime.local().toJSDate(),
    endTime: DateTime.local().toJSDate(),
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

async function seedCalendars(calendars: Calendar[]) {
  const transactions = calendars.map((calendar) =>
    prisma.calendar.create({
      data: {
        ...calendar,
        job: {
          connect: { id: calendar.job.id },
        },
        employee: {
          connect: { id: calendar.employee.id },
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
    const calendars = generateCalendars(CALENDAR_COUNT, jobs, employees)

    await seedEmployees(employees)
    await seedCustomers(customers)
    await seedJobs(jobs)
    await seedCalendars(calendars)

    console.log("Database seeded successfully.")
  } catch (error) {
    console.error("Failed to seed database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
