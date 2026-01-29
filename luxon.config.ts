import { Settings } from "luxon"

const defaultLocale = "nl-NL"
const defaultZone = "Europe/Amsterdam"

Settings.defaultLocale = process.env.NEXT_PUBLIC_LOCALE ?? defaultLocale
Settings.defaultZone = process.env.NEXT_PUBLIC_TIME_ZONE ?? defaultZone
