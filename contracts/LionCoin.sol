pragma solidity ^0.4.19;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract LionCoin is MintableToken {
	string public name = "Lion Coin";
	string public symbol = "LION";
	uint8 public decimals = 18;
}