const errorTranslationsMap: Record<string, string> = {
  "Invalid login credentials": "Ongeldige inloggevegens",
}

const translatedError = (error: string): string => {
  return errorTranslationsMap[error] || "Er is een onbekende fout opgetreden"
}

export { translatedError }
