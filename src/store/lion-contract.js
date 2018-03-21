import * as LionBaseArtifacts from '../contracts/LionBase.json'

const ADDRESS = '0xa82B356a55Bf0be899036c1a8f076E5DcED5A281'

// create contracts
export default function LionContract () {
  if (typeof window.web3 === 'undefined') return
  return new window.web3.eth.Contract(LionBaseArtifacts.abi, ADDRESS)
}
