import * as htmlToImage from "html-to-image"
import { DateTime } from "luxon"
import { RefObject } from "react"

export function exportCalendarToJpeg(
  date: DateTime,
  tableRef: RefObject<HTMLTableElement | null>,
) {
  const currentYear = date.year
  const currentWeek = date.weekNumber
  const exportFileName = `planbord_${currentYear}W${currentWeek}`

  htmlToImage
    .toPng(tableRef.current!, { quality: 1, skipFonts: true })
    .then(function (dataUrl) {
      const link = document.createElement("a")
      link.download = `${exportFileName}.jpeg`
      link.href = dataUrl
      link.click()
    })
}
