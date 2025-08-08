import { DateTime } from "luxon"

export const formatDate = () =>
  DateTime.local({ locale: "nl", zone: "Europe/Amsterdam" })
