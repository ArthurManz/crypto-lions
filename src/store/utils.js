import firstNames from 'random-name/first-names.json'

export function mapLionProperties (lion) {
  // TODO: From ETH Address to
  console.log(firstNames[lion.dna[0]])
  return Object.assign({}, lion, {firstName: firstNames[lion.dna[0]]})
}
