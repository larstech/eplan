"use client"

import { Employee, EmployeeDTO } from "@/app/v2/features/employee"
import {
  isToday,
  ScheduleWeek,
  ScheduleWeekDTO,
} from "@/app/v2/features/schedule"
import { localDateString } from "@/app/v2/helpers/date"
import { route, routes } from "@/app/v2/helpers/routes"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { use } from "react"
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Row,
  Stack,
  Table,
} from "react-bootstrap"

interface ScheduleViewProps {
  employeeDTOs: Promise<EmployeeDTO[]>
  scheduleWeekDTO: Promise<ScheduleWeekDTO>
}

interface ScheduleHeaderProps {
  scheduleWeek: ScheduleWeek
}

interface DataTableBodyProps {
  employees: Employee[]
  scheduleWeek: ScheduleWeek
}

interface DataTableEntryProps {
  employee: Employee
  scheduleWeek: ScheduleWeek
}

function DataTableHeader({ scheduleWeek }: ScheduleHeaderProps) {
  const router = useRouter()
  const showWeek = (y: number, w: number) => {
    router.push(route(routes.schedule, `${y}/${w}`))
  }

  return (
    <Row className="g-3">
      {/* Display the current week range */}
      <Col md="auto" className="d-flex align-items-center me-auto">
        <div>
          {localDateString(scheduleWeek.start(), { dateStyle: "medium" })} -{" "}
          {localDateString(scheduleWeek.end(), { dateStyle: "medium" })}
        </div>
      </Col>

      <Col md="auto">
        {/* Week navigation (previous, next, and current) */}
        <ButtonToolbar>
          <ButtonGroup className="me-2">
            {/* Go to the previous week */}
            <Button
              variant="outline-primary"
              onClick={() => {
                showWeek(
                  scheduleWeek.previous().year,
                  scheduleWeek.previous().week,
                )
              }}
            >
              <ChevronLeft />
            </Button>

            {/* Go to the next week */}
            <Button
              variant="outline-primary"
              onClick={() => {
                showWeek(scheduleWeek.next().year, scheduleWeek.next().week)
              }}
            >
              <ChevronRight />
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button
              variant="outline-primary"
              onClick={() => {
                showWeek(ScheduleWeek.today().year, ScheduleWeek.today().week)
              }}
            >
              Vandaag
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Col>
    </Row>
  )
}

function DataTableBody({ employees, scheduleWeek }: DataTableBodyProps) {
  return (
    <Table bordered responsive>
      <thead>
        <tr>
          <th>Medewerker</th>

          {/* Each day of the week is a column to create a weekly overview */}
          {scheduleWeek.datesInRange().map((date, index) => {
            return (
              <th
                key={index}
                className={isToday(date) ? "bg-body-tertiary" : ""}
              >
                {localDateString(date, {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <DataTableEntry
              key={employee.id}
              employee={employee}
              scheduleWeek={scheduleWeek}
            />
          ))
        ) : (
          <tr>
            <td colSpan={7}>
              <i>Geen medewerkers gevonden</i>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

function DataTableEntry({ employee, scheduleWeek }: DataTableEntryProps) {
  return (
    <tr>
      <td>{employee.fullName()}</td>

      {/* Each day of the week is a column */}
      {scheduleWeek.datesInRange().map((date, index) => {
        return (
          <td key={index} className={isToday(date) ? "bg-body-tertiary" : ""}>
            {/* Keep blank for now */}
          </td>
        )
      })}
    </tr>
  )
}

export default function ScheduleView({
  employeeDTOs,
  scheduleWeekDTO,
}: ScheduleViewProps) {
  // Map employee DTOs to Employee instances so that complementary methods can be called on them
  const employees = use(employeeDTOs).map((dto) => Employee.fromDTO(dto))
  // Map schedule week DTOs to ScheduleWeek instances so that complementary methods can be called on them
  const scheduleWeek = ScheduleWeek.fromDTO(use(scheduleWeekDTO))

  // Sort employees by full name
  const sortedEmployees = employees.sort((a, b) =>
    a.fullName().localeCompare(b.fullName()),
  )

  return (
    <Stack gap={3} className="mt-3">
      <DataTableHeader scheduleWeek={scheduleWeek} />
      <DataTableBody employees={sortedEmployees} scheduleWeek={scheduleWeek} />
    </Stack>
  )
}
