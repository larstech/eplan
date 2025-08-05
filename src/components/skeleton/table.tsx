import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "@/components/ui/table"

export default function LoadingTable({ cols }: { cols: number }) {
  const tableRows = 8
  const tableColumnsWidth = 100 / cols

  return (
    <>
      {Array.from({ length: tableRows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: cols }).map((_, cellIndex) => (
            <TableCell
              key={cellIndex}
              style={{ width: `${tableColumnsWidth}%` }}
            >
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
