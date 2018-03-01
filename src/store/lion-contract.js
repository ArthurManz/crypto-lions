import * as LionBaseArtifacts from '../contracts/LionBase.json'

const ADDRESS = '0x51737Ae3a869bFEbC383Da73449C0be939748659'

// create contracts
export default function LionContract () {
  if (typeof window.web3 === 'undefined') return
  return new window.web3.eth.Contract(LionBaseArtifacts.abi, ADDRESS)
}
