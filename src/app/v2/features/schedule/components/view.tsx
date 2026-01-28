"use client"

import { Contact, ContactDTO } from "@/app/v2/features/contact"
import { Employee, EmployeeDTO } from "@/app/v2/features/employee"
import { Organization, OrganizationDTO } from "@/app/v2/features/organization"
import {
  isToday,
  ScheduleItem,
  ScheduleItemDTO,
  ScheduleWeek,
  ScheduleWeekDTO,
} from "@/app/v2/features/schedule"
import ScheduleItemCreateView from "@/app/v2/features/schedule/components/create"
import ScheduleItemDetailsView from "@/app/v2/features/schedule/components/details"
import ScheduleItemEditView from "@/app/v2/features/schedule/components/edit"
import { WorkOrder, WorkOrderDTO } from "@/app/v2/features/work-order"
import { localDateString } from "@/app/v2/helpers/date"
import { route, routes } from "@/app/v2/helpers/routes"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
  contactDTOs: Promise<ContactDTO[]>
  employeeDTOs: Promise<EmployeeDTO[]>
  organizationDTOs: Promise<OrganizationDTO[]>
  scheduleItemDTOs: Promise<ScheduleItemDTO[]>
  scheduleWeekDTO: ScheduleWeekDTO
  workOrderDTOs: Promise<WorkOrderDTO[]>
}

interface DataTableEntryProps {
  employee: Employee
  scheduleItems: ScheduleItem[]
}

export const ContactsContext = createContext<Contact[]>([])
export const EmployeesContext = createContext<Employee[]>([])
export const ScheduleWeekContext = createContext(ScheduleWeek.today())
export const ScheduleItemsContext = createContext<ScheduleItem[]>([])
export const OrganizationsContext = createContext<Organization[]>([])
export const WorkOrdersContext = createContext<WorkOrder[]>([])

function DataTableHeader() {
  const scheduleWeek = useContext(ScheduleWeekContext)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const router = useRouter()
  const showWeek = (y: number, w: number) => {
    router.push(route(routes.schedule, `${y}/${w}`))
  }

  return (
    <>
      <Row className="g-3">
        <Col md="auto">
          {/* Week navigation (previous, next, and current) */}
          <ButtonToolbar>
            <ButtonGroup className="me-3">
              <Button
                onClick={() => {
                  showWeek(ScheduleWeek.today().year, ScheduleWeek.today().week)
                }}
              >
                Vandaag
              </Button>
            </ButtonGroup>

            <ButtonGroup>
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
          </ButtonToolbar>
        </Col>

        <Col md="auto" className="d-flex align-items-center me-auto">
          {/* Display the current week range + the week number */}
          <div>
            {localDateString(scheduleWeek.start(), { dateStyle: "long" })} -{" "}
            {localDateString(scheduleWeek.end(), { dateStyle: "long" })} (Week{" "}
            {scheduleWeek.week})
          </div>
        </Col>

        <Col md="auto">
          {/* Open view to add new schedule item */}
          <Button className="w-100" onClick={() => setShowCreateModal(true)}>
            Werkorder inplannen
          </Button>
        </Col>
      </Row>

      <ScheduleItemCreateView
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
      />
    </>
  )
}

function DataTableBody() {
  const employees = useContext(EmployeesContext)
  const scheduleWeek = useContext(ScheduleWeekContext)
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
                className={`${isToday(date) ? "bg-body-tertiary" : ""}`}
              >
                <Stack>
                  <div className="fs-6 fw-normal">
                    {localDateString(date, { weekday: "long" })}
                  </div>
                  <div className="fs-5">
                    {localDateString(date, { day: "2-digit" })}
                  </div>
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
  const scheduleWeek = useContext(ScheduleWeekContext)
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

  return (
    <>
      <tr>
        <td>{employee.fullName()}</td>
        {/* Each day of the week is a column */}
        {scheduleWeek.datesInRange().map((date, index) => {
          const scheduleItem = scheduleItems
            .filter((item) => scheduleWeek.containsDate(item.date))
            .filter((item) => item.date.getDay() === date.getDay())

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
  contactDTOs,
  employeeDTOs,
  organizationDTOs,
  scheduleWeekDTO,
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

  // Map schedule week DTOs to ScheduleWeek instances so that complementary methods can be called on them
  const scheduleWeek = ScheduleWeek.fromDTO(scheduleWeekDTO)

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
    <ContactsContext value={contacts}>
      <EmployeesContext value={sortedEmployees}>
        <OrganizationsContext value={organizations}>
          <ScheduleWeekContext value={scheduleWeek}>
            <ScheduleItemsContext value={scheduleItems}>
              <WorkOrdersContext value={workOrders}>
                <Stack gap={3} className="mt-3">
                  <DataTableHeader />
                  <DataTableBody />
                </Stack>
              </WorkOrdersContext>
            </ScheduleItemsContext>
          </ScheduleWeekContext>
        </OrganizationsContext>
      </EmployeesContext>
    </ContactsContext>
  )
}
