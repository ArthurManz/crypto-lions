import * as LionBaseArtifacts from '../contracts/LionBase.json'

const ADDRESS = '0x2961d03f82865459c634ca5659a96e8aff9580db'

// create contracts
export default function LionContract () {
  return new window.web3.eth.Contract(LionBaseArtifacts.abi, ADDRESS)
}
