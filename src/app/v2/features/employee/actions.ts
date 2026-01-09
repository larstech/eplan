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
    { id: 9, firstName: "Employee", lastName: "I" },
    { id: 10, firstName: "Employee", lastName: "J" },
    { id: 11, firstName: "Employee", lastName: "K" },
    { id: 12, firstName: "Employee", lastName: "L" },
    { id: 13, firstName: "Employee", lastName: "M" },
    { id: 14, firstName: "Employee", lastName: "N" },
    { id: 15, firstName: "Employee", lastName: "O" },
    { id: 16, firstName: "Employee", lastName: "P" },
    { id: 17, firstName: "Employee", lastName: "Q" },
    { id: 18, firstName: "Employee", lastName: "R" },
    { id: 19, firstName: "Employee", lastName: "S" },
    { id: 20, firstName: "Employee", lastName: "T" },
    { id: 21, firstName: "Employee", lastName: "U" },
    { id: 22, firstName: "Employee", lastName: "V" },
    { id: 23, firstName: "Employee", lastName: "W" },
    { id: 24, firstName: "Employee", lastName: "X" },
    { id: 25, firstName: "Employee", lastName: "Y" },
    { id: 26, firstName: "Employee", lastName: "Z" },
  ]
}
