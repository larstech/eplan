import { Employee } from "@/generated/prisma/client";

const sortEmployeesByName = (employees: Employee[]) => {
  return employees.sort((a, b) => {
    const firstNameComparison = a.firstName.localeCompare(b.firstName);

    if (firstNameComparison !== 0) {
      return firstNameComparison;
    }

    return a.lastName.localeCompare(b.lastName);
  });
};

export { sortEmployeesByName }
