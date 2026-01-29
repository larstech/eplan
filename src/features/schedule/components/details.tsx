import { Employee } from "@/features/employee"
import { ScheduleItem } from "@/features/schedule"
import ScheduleItemDeleteView from "@/features/schedule/components/delete"
import ScheduleViewModeEditView from "@/features/schedule/components/edit"
import {
  ContactsContext,
  OrganizationsContext,
} from "@/features/schedule/components/view"
import { WorkOrder } from "@/features/work-order"
import { MailIcon, PhoneIcon } from "lucide-react"
import Link from "next/link"
import { useContext, useState } from "react"
import {
  Badge,
  Button,
  Offcanvas,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap"

type ScheduleViewModeLookViewProps = {
  employee: Employee
  workOrder: WorkOrder
  scheduleItem: ScheduleItem

  // Fields that are used by ModalProps
  show: boolean
  onHide: () => void
}

export default function ScheduleItemDetailsView({
  employee,
  workOrder,
  scheduleItem,
  show,
  onHide,
}: ScheduleViewModeLookViewProps) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const contacts = useContext(ContactsContext)
  const organizations = useContext(OrganizationsContext)

  // The contact that belongs to the work order
  const contact = contacts.find(
    (contact) => contact.id === workOrder?.contactId,
  )

  // The organization that belongs to the work order
  const organization = organizations.find(
    (organization) => organization.id === workOrder?.organizationId,
  )

  // Ensure all data is available, as it should be it. If anything is missing, something has gone wrong
  if (!employee || !workOrder || !scheduleItem || !organization || !contact) {
    // TODO: Display an error instead of silently failing
    return null
  }

  return (
    <>
      <Offcanvas placement="end" show={show} onHide={onHide}>
        {/* Organization and PID */}
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {organization?.name} <Badge bg="info">{workOrder.pid}</Badge>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Stack gap={3}>
            {/* Date and time details */}
            <div className="text-muted">
              {scheduleItem.date.toLocaleString({ dateStyle: "long" })} van{" "}
              {scheduleItem.startTime} tot {scheduleItem.endTime}
            </div>

            {/* Contact details */}
            <Stack gap={2}>
              <div className="fw-bold">Contactpersoon</div>
              <Stack direction="horizontal" gap={3}>
                <div>{contact.fullName()}</div>

                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>{contact.email}</Tooltip>}
                >
                  {/* Open an email client to email the contact */}
                  <Link href={`mailto:${contact.email}`}>
                    <MailIcon />
                  </Link>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>{contact.phone}</Tooltip>}
                >
                  {/* Open the call screen (if available) to call the contact */}
                  <Link href={`tel:${contact.phone}`}>
                    <PhoneIcon />
                  </Link>
                </OverlayTrigger>
              </Stack>
            </Stack>

            {/* Work order details */}
            <Stack gap={2}>
              <div className="fw-bold">Titel</div>
              <div>{workOrder.title}</div>
            </Stack>
            <Stack gap={2}>
              <div className="fw-bold">Omschrijving</div>
              {workOrder.description !== "" ? (
                <div>{workOrder.description}</div>
              ) : (
                <i>[geen]</i>
              )}
            </Stack>

            <hr />

            {/* Optional note for the employee */}
            <Stack gap={2}>
              <div className="fw-bold">Notitie voor de medewerker</div>
              {scheduleItem.note !== "" ? (
                <i>{scheduleItem.note}</i>
              ) : (
                <i>[geen]</i>
              )}
            </Stack>
          </Stack>

          <Stack gap={2} className="mt-3">
            {/* Open view to edit schedule item */}
            <Button
              variant="primary"
              className="w-100"
              onClick={() => setShowEditModal(true)}
            >
              Bewerken
            </Button>

            <Stack direction="horizontal" gap={2}>
              {/* Open view to close details */}
              <Button variant="secondary" className="w-50" onClick={onHide}>
                Sluiten
              </Button>

              {/* Open view to delete schedule item */}
              <Button
                variant="danger"
                className="w-50"
                onClick={() => setShowDeleteModal(true)}
              >
                Verwijderen
              </Button>
            </Stack>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>

      <ScheduleViewModeEditView
        scheduleItem={scheduleItem}
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false)

          // Invoke the onHide callback to prevent showing potential outdated data
          // It's possible that nothing has changed, but in the case it did, this is the
          // simplest solution
          onHide()
        }}
      />
      <ScheduleItemDeleteView
        employee={employee}
        scheduleItem={scheduleItem}
        workOrder={workOrder}
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false)

          // Invoke the onHide callback to prevent showing potential delete schedule item
          // It's possible that the schedule item hasn't been deleted, but in the case it
          // did, this is the simplest solution
          onHide()
        }}
      />
    </>
  )
}
