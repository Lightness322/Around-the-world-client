import countries from 'i18n-iso-countries'
import localeCountries from 'i18n-iso-countries/langs/en.json'

countries.registerLocale(localeCountries)

export function getCountryFullName(shortName: string) {
  return countries.getName(shortName, 'en', { select: 'alias' })
}
