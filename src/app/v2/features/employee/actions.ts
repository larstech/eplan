import { EmployeeDTO } from "@/app/v2/features/employee/types"

export const fetchEmployees = async (): Promise<EmployeeDTO[]> => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  return [
    { id: 1, firstName: "Employee", lastName: "A" },
    { id: 2, firstName: "Employee", lastName: "B" },
    { id: 3, firstName: "Employee", lastName: "C" },
    { id: 4, firstName: "Employee", lastName: "D" },
    { id: 5, firstName: "Employee", lastName: "E" },
    { id: 6, firstName: "Employee", lastName: "F" },
    { id: 7, firstName: "Employee", lastName: "G" },
    { id: 8, firstName: "Employee", lastName: "H" },
  ]
}
