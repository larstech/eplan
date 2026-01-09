import { Employee } from "@/app/v2/features/employee"
import { ScheduleWeek, isToday } from "@/app/v2/features/schedule"
import { localDateString } from "@/app/v2/helpers/date"

interface DataTableHeaderProps {
  scheduleWeek: ScheduleWeek
}

interface DataTableBodyProps {
  employees: Employee[]
  scheduleWeek: ScheduleWeek
}

interface ScheduleDataTableProps {
  employees: Employee[]
  scheduleWeek: ScheduleWeek
}

function DataTableHeader({ scheduleWeek }: DataTableHeaderProps) {
  return (
    <thead>
      <tr>
        <th>Medewerker</th>

        {/* Each day of the week is a column to create a week view */}
        {scheduleWeek.datesInRange().map((date, index) => {
          return (
            <th key={index} className={isToday(date) ? "bg-light" : ""}>
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
  )
}

function DataTableBody({ employees, scheduleWeek }: DataTableBodyProps) {
  return (
    <tbody>
      {employees.map((employee) => (
        <tr key={employee.id}>
          <td>{employee.fullName()}</td>

          {scheduleWeek.datesInRange().map((date, index) => {
            return (
              <td key={index} className={isToday(date) ? "bg-light" : ""}>
                {/* Keep blank for now */}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  )
}

export default function ScheduleDataTable({
  employees,
  scheduleWeek,
}: ScheduleDataTableProps) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <DataTableHeader scheduleWeek={scheduleWeek} />
        <DataTableBody employees={employees} scheduleWeek={scheduleWeek} />
      </table>
    </div>
  )
}
