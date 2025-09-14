import { Employee } from "@/features/employee/types"

export function getFullName(employee: Employee): string {
  return `${employee.firstName} ${employee.lastName}`
}

export function formatFirstName(firstName: string): string {
  const lowerCaseFirstName = firstName.toLowerCase()
  const capitalizedFirstName =
    lowerCaseFirstName.charAt(0).toUpperCase() + lowerCaseFirstName.slice(1)
  return capitalizedFirstName
}

export function formatLastName(lastName: string): string {
  const lowerCaseLastName = lastName.toLowerCase()
  const lastNameParts = lowerCaseLastName.split(" ")

  const formattedLastNameParts = lastNameParts.map((part) => {
    const lowerCaseParticles = ["van", "de", "der", "den"]
    if (lowerCaseParticles.includes(part)) {
      return part
    }
    return part.charAt(0).toUpperCase() + part.slice(1)
  })

  return formattedLastNameParts.join(" ")
}

export function sortEmployeesByName(employees: Employee[]) {
  return employees.sort((a, b) => {
    const firstNameComparison = a.firstName.localeCompare(b.firstName)

    if (firstNameComparison !== 0) {
      return firstNameComparison
    }

    return a.lastName.localeCompare(b.lastName)
  })
}
