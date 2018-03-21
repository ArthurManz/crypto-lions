import * as LionBaseArtifacts from '../contracts/LionBase.json'

const ADDRESS = '0x9F384658EE024eCE79dB0a72BD98A74cb1676C58'

// create contracts
export default function LionContract () {
  return new window.web3.eth.Contract(LionBaseArtifacts.abi, ADDRESS)
}
