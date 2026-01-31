"use client"

import { Contact, ContactDTO } from "@/features/contact"
import { Employee, EmployeeDTO } from "@/features/employee"
import { Organization, OrganizationDTO } from "@/features/organization"
import { isToday, ScheduleItem, ScheduleItemDTO } from "@/features/schedule"
import ScheduleItemCreateView from "@/features/schedule/components/create"
import ScheduleItemDetailsView from "@/features/schedule/components/details"
import ScheduleItemEditView from "@/features/schedule/components/edit"
import { WorkOrder, WorkOrderDTO } from "@/features/work-order"
import { route } from "@/helpers/routes"
import { authClient } from "@/lib/auth/client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DateTime } from "luxon"
import { useRouter } from "next/navigation"
import { createContext, use, useContext, useState } from "react"
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  Col,
  Row,
  Stack,
  Table,
} from "react-bootstrap"

interface ScheduleViewProps {
  currentDate: string
  contactDTOs: Promise<ContactDTO[]>
  employeeDTOs: Promise<EmployeeDTO[]>
  organizationDTOs: Promise<OrganizationDTO[]>
  scheduleItemDTOs: Promise<ScheduleItemDTO[]>
  workOrderDTOs: Promise<WorkOrderDTO[]>
}

interface DataTableEntryProps {
  employee: Employee
  scheduleItems: ScheduleItem[]
}

export const CurrentDateContext = createContext<DateTime>(DateTime.now())
export const ContactsContext = createContext<Contact[]>([])
export const EmployeesContext = createContext<Employee[]>([])
export const ScheduleItemsContext = createContext<ScheduleItem[]>([])
export const OrganizationsContext = createContext<Organization[]>([])
export const WorkOrdersContext = createContext<WorkOrder[]>([])

function DataTableHeader() {
  const currentDate = useContext(CurrentDateContext)

  const [showCreateModal, setShowCreateModal] = useState(false)

  const router = useRouter()
  const showWeek = (y: number, w: number) => {
    router.push(route.schedule + `/${y}/${w}`)
  }

  const previousWeek = currentDate.minus({ weeks: 1 })
  const nextWeek = currentDate.plus({ weeks: 1 })

  const { data: session } = authClient.useSession()

  return (
    <>
      <Row className="g-3">
        <Col md="auto">
          {/* Week navigation (previous, next, and current) */}
          <ButtonToolbar>
            <ButtonGroup className="me-3">
              <Button
                onClick={() =>
                  showWeek(DateTime.now().year, DateTime.now().weekNumber)
                }
              >
                Vandaag
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              {/* Go to the previous week */}
              <Button
                variant="outline-primary"
                onClick={() =>
                  showWeek(previousWeek.weekYear, previousWeek.weekNumber)
                }
              >
                <ChevronLeft />
              </Button>

              {/* Go to the next week */}
              <Button
                variant="outline-primary"
                onClick={() => showWeek(nextWeek.weekYear, nextWeek.weekNumber)}
              >
                <ChevronRight />
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>

        <Col md="auto" className="d-flex align-items-center me-auto">
          {/* Display the current week range + the week number */}
          <div>
            {currentDate.startOf("week").toLocaleString({ dateStyle: "long" })}{" "}
            - {currentDate.endOf("week").toLocaleString({ dateStyle: "long" })}{" "}
            (Week {currentDate.weekNumber})
          </div>
        </Col>

        {session?.user && session?.user.role === "admin" && (
          <Col md="auto">
            {/* Open view to add new schedule item */}
            <Button className="w-100" onClick={() => setShowCreateModal(true)}>
              Werkorder inplannen
            </Button>
          </Col>
        )}
      </Row>

      {session?.user && session?.user.role === "admin" && (
        <ScheduleItemCreateView
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
        />
      )}
    </>
  )
}

function DataTableBody() {
  const currentDate = useContext(CurrentDateContext)
  const employees = useContext(EmployeesContext)
  const scheduleItems = useContext(ScheduleItemsContext)

  // Map employees to their corresponding schedule items. All schedule items are
  // fetched beforehand, reducing the need for repeated lookups.
  const employeeScheduleItemMapping = new Map<Employee, ScheduleItem[]>()
  employees.forEach((employee) => {
    employeeScheduleItemMapping.set(
      employee,
      scheduleItems.filter((item) => item.employeeId === employee.id),
    )
  })

  const startOfWeek = currentDate.startOf("week")
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.plus({ days: i }),
  )

  return (
    <Table bordered responsive>
      <thead>
        <tr>
          <th>Medewerker</th>

          {/* Each day of the week is a column to create a weekly overview */}
          {weekdays.map((date, index) => {
            return (
              <th
                key={index}
                className={`${isToday(date) ? "bg-body-tertiary" : ""}`}
              >
                <Stack>
                  <div className="fs-6 fw-normal">{date.toFormat("cccc")}</div>
                  <div className="fs-5">{date.toFormat("dd")}</div>
                </Stack>
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
              scheduleItems={employeeScheduleItemMapping.get(employee) ?? []}
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

function DataTableEntry({ employee, scheduleItems }: DataTableEntryProps) {
  const currentDate = useContext(CurrentDateContext)
  const organizations = useContext(OrganizationsContext)
  const workOrders = useContext(WorkOrdersContext)

  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModelModal, setShowViewModelModal] = useState(false)

  const [selectedWorkOrder, setSelectedWorkOrder] = useState<
    WorkOrder | undefined
  >(undefined)
  const [selectedScheduleItem, setSelectedScheduleItem] = useState<
    ScheduleItem | undefined
  >(undefined)

  const startOfWeek = currentDate.startOf("week")
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.plus({ days: i }),
  )

  return (
    <>
      <tr>
        <td>{employee.fullName()}</td>
        {/* Each day of the week is a column */}
        {weekdays.map((date, index) => {
          const scheduleItem = scheduleItems.filter(
            (item) => date.weekday === item.date.weekday,
          )

          if (scheduleItem.length === 0) {
            return (
              <td
                key={index}
                className={isToday(date) ? "bg-body-tertiary" : ""}
              ></td>
            )
          }

          return (
            <td
              key={index}
              className={isToday(date) ? "bg-body-tertiary" : ""}
              style={{ cursor: "pointer" }}
            >
              <Stack gap={2}>
                {scheduleItem.map((item, index) => {
                  const workOrder = workOrders.find(
                    (order) => item.workOrderPid === order.pid,
                  )
                  const organization = organizations.find(
                    (org) => workOrder?.organizationId === org.id,
                  )

                  return (
                    <Card
                      key={index}
                      onClick={() => {
                        setShowViewModelModal(true)
                        setSelectedScheduleItem(item)
                        setSelectedWorkOrder(workOrder)
                      }}
                      className={isToday(date) ? "" : "bg-body-tertiary"}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Body>
                        <Stack direction="horizontal" gap={3}>
                          {organization?.name}
                          <Badge bg="info">{workOrder?.pid}</Badge>
                        </Stack>
                      </Card.Body>
                    </Card>
                  )
                })}
              </Stack>
            </td>
          )
        })}
      </tr>

      {selectedScheduleItem && selectedWorkOrder && (
        <>
          <ScheduleItemDetailsView
            employee={employee}
            scheduleItem={selectedScheduleItem}
            workOrder={selectedWorkOrder}
            show={showViewModelModal}
            onHide={() => setShowViewModelModal(false)}
          />
          <ScheduleItemEditView
            scheduleItem={selectedScheduleItem}
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
          />
        </>
      )}
    </>
  )
}

export default function ScheduleView({
  currentDate,
  contactDTOs,
  employeeDTOs,
  organizationDTOs,
  scheduleItemDTOs,
  workOrderDTOs,
}: ScheduleViewProps) {
  // Map contact DTOs to Contact instances so that complementary methods can be called on them
  const contacts = use(contactDTOs).map((dto) => Contact.fromDTO(dto))

  // Map employee DTOs to Employee instances so that complementary methods can be called on them
  const employees = use(employeeDTOs).map((dto) => Employee.fromDTO(dto))

  // Map organization DTOs to Organization instances so that complementary methods can be called on them
  const organizations = use(organizationDTOs).map((dto) =>
    Organization.fromDTO(dto),
  )

  // Map schedule item DTOs to ScheduleItem instances so that complementary methods can be called on them
  const scheduleItems = use(scheduleItemDTOs).map((dto) =>
    ScheduleItem.fromDTO(dto),
  )

  // Map work order DTOs to WorkOrder instances so that complementary methods can be called on them
  const workOrders = use(workOrderDTOs).map((dto) => WorkOrder.fromDTO(dto))

  // Sort employees by full name
  const sortedEmployees = employees.sort((a, b) =>
    a.fullName().localeCompare(b.fullName()),
  )

  return (
    <CurrentDateContext value={DateTime.fromISO(currentDate)}>
      <ContactsContext value={contacts}>
        <EmployeesContext value={sortedEmployees}>
          <OrganizationsContext value={organizations}>
            <ScheduleItemsContext value={scheduleItems}>
              <WorkOrdersContext value={workOrders}>
                <Stack gap={3} className="mt-3">
                  <DataTableHeader />
                  <DataTableBody />
                </Stack>
              </WorkOrdersContext>
            </ScheduleItemsContext>
          </OrganizationsContext>
        </EmployeesContext>
      </ContactsContext>
    </CurrentDateContext>
  )
}
