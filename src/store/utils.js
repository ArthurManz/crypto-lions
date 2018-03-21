import firstNames from 'random-name/first-names.json'
import middleNames from 'random-name/middle-names.json'
import lastNames from 'random-name/names.json'
import places from 'random-name/places.json'

export function mapLionProperties (lion) {
  // TODO: From ETH Address to
  console.log(lion.dna)
  return Object.assign(
    {}, lion, {
      firstName: firstNames[lion.dna.substring(0, 5) % firstNames.length],
      middleName: middleNames[lion.dna.substring(5, 8) % middleNames.length],
      lastName: lastNames[lion.dna.substring(3, 7) % lastNames.length],
      birthPlace: places[lion.dna.substring(7, 10) % places.length],
      maneType: lion.dna[10],
      tailType: lion.dna[11],
      eyesType: lion.dna[12],
      eyesColour: lion.dna[13],
      furColour: lion.dna[14],
      maneColour: lion.dna[15]
    }
  )
}
