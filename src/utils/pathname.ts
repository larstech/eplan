type PathnameData = {
  /** The part of the pathname after the last slash */
  section: string
  /** The local URL to reach the path, starting from the application base URL */
  url: string
  /** Indicates if this section is the last one in the URL */
  current: boolean
}

export function getPathnameData(pathname: string): PathnameData[] {
  const pathnameSeparator = "/"
  const sections = pathname.split(pathnameSeparator)

  // Filter out leading and/or trailing slashes
  const filteredSections = sections.filter(Boolean)

  return filteredSections.map((section, index) => {
    const urlSections = sections.slice(0, index + 1)
    const url = urlSections.join("/")
    const current = index === filteredSections.length - 1

    return {
      section,
      url,
      current,
    }
  })
}
