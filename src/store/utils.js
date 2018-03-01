import firstNames from 'random-name/first-names.json'
import middleNames from 'random-name/middle-names.json'
import lastNames from 'random-name/names.json'
import colors from '../../static/data/colors.json'
import adjectives from '../../static/data/adjectives.json'
import * as cities from '../../static/data/cities.json'

const firstNamesTotal = firstNames.length
const middleNamesTotal = middleNames.length
const lastNamesTotal = lastNames.length
const colorsTotal = colors.length
const citiesTotal = cities.length
const adjectivesTotal = adjectives.length

export function mapLionProperties (lion, index) {
  return Object.assign(
    {}, lion, {
      id: index,
      firstName: firstNames[lion.dna.substring(0, 5) % firstNamesTotal],
      middleName: middleNames[lion.dna.substring(5, 8) % middleNamesTotal],
      lastName: lastNames[lion.dna.substring(3, 7) % lastNamesTotal],
      location: cities[lion.dna % citiesTotal],
      colors: colors[lion.dna % colorsTotal],
      adjective: adjectives[lion.dna % adjectivesTotal]
    }
  )
}
