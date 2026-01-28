"use client"

import { Employee, EmployeeDTO } from "@/features/employee"
import EmployeeCreateView from "@/features/employee/components/create"
import EmployeeDeleteView from "@/features/employee/components/delete"
import EmployeeEditView from "@/features/employee/components/edit"
import { PencilIcon, Search, TrashIcon } from "lucide-react"
import { use, useEffect, useState } from "react"
import { Stack } from "react-bootstrap"
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap"
import { Table } from "react-bootstrap"

type EmployeeViewProps = {
  employeeDTOs: Promise<EmployeeDTO[]>
}

type DataTableHeaderProps = {
  setSearchText: (text: string) => void
}

type DataTableBodyProps = {
  employees: Employee[]
}

type DataTableEntryProps = {
  employee: Employee
}

function DataTableHeader({ setSearchText }: DataTableHeaderProps) {
  const [showCreateView, setShowCreateView] = useState(false)

  return (
    <>
      <Row className="g-3">
        <Col md="auto" className="me-auto">
          {/* Search for employees by name */}
          <InputGroup>
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              placeholder="Medewerker zoeken"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col md="auto">
          {/* Open view to add new employee */}
          <Button className="w-100" onClick={() => setShowCreateView(true)}>
            Medewerker toevoegen
          </Button>
        </Col>
      </Row>

      <EmployeeCreateView
        show={showCreateView}
        onHide={() => setShowCreateView(false)}
      />
    </>
  )
}

function DataTableBody({ employees }: DataTableBodyProps) {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th className="w-75">Naam</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <DataTableEntry key={employee.id} employee={employee} />
          ))
        ) : (
          <tr>
            <td colSpan={2}>
              <i>Geen medewerkers gevonden</i>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

function DataTableEntry({ employee }: DataTableEntryProps) {
  const [showEditView, setShowEditView] = useState(false)
  const [showDeleteView, setShowDeleteView] = useState(false)

  return (
    <>
      <tr>
        {/* Employee name column */}
        {employee.freelancer ? (
          <td>
            {employee.fullName()} <i>(zzp&apos;er)</i>
          </td>
        ) : (
          <td>{employee.fullName()}</td>
        )}

        {/* Employee actions column */}
        <td className="align-top">
          <div className="d-flex gap-2">
            {/* Open view to edit employee details */}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => setShowEditView(true)}
            >
              <PencilIcon />
            </Button>

            {/* Open view to delete employee */}
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => setShowDeleteView(true)}
            >
              <TrashIcon />
            </Button>
          </div>
        </td>
      </tr>

      <EmployeeEditView
        employee={employee}
        show={showEditView}
        onHide={() => setShowEditView(false)}
      />
      <EmployeeDeleteView
        employee={employee}
        show={showDeleteView}
        onHide={() => setShowDeleteView(false)}
      />
    </>
  )
}

export default function EmployeeView({ employeeDTOs }: EmployeeViewProps) {
  // Sorted employees is set in the useEffect to refresh itself when the employees are modified in any way
  const [sortedEmployees, setSortedEmployees] = useState<Employee[]>([])

  // Used for searching for employees by their full name
  const [searchText, setSearchText] = useState("")

  // Map employee DTOs to Employee instances so that complementary methods can be called on them
  const employees = use(employeeDTOs).map((dto) => Employee.fromDTO(dto))

  // Filter employees on their full name
  const filteredEmployees = employees.filter((employee) =>
    employee.fullName().toLowerCase().includes(searchText.toLowerCase()),
  )

  useEffect(() => {
    setSortedEmployees(
      // Sort employees by full name
      filteredEmployees.sort((a, b) =>
        a.fullName().localeCompare(b.fullName()),
      ),
    )
  }, [employeeDTOs, searchText])

  return (
    <Stack gap={3} className="mt-3">
      <h1>Medewerkersoverzicht</h1>

      <DataTableHeader setSearchText={setSearchText} />
      <DataTableBody employees={sortedEmployees} />
    </Stack>
  )
}
