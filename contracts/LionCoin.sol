pragma solidity ^0.4.18;

import "./StandardToken.sol";

/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `StandardToken` functions.
 */
contract LionCoin is StandardToken {

  string public constant name = "LionCoin";
  string public constant symbol = "LC";
  uint256 public constant decimals = 18;

  uint256 public constant INITIAL_SUPPLY = 1000000000000000000000000 * (10 ** uint256(decimals));
  uint256 public constant FREE_TOKEN_AMOUNT = 5 * (10 ** uint256(decimals));

  address tokenOwner;
  mapping (address => bool) receivedFreeTokens;

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  function LionCoin() public {
    totalSupply_ = INITIAL_SUPPLY;
    tokenOwner = msg.sender;
    balances[msg.sender] = INITIAL_SUPPLY;
    Transfer(0x0, msg.sender, INITIAL_SUPPLY); // Record event
  }

  function getTokens() public {
    require(!receivedFreeTokens[msg.sender]);
    receivedFreeTokens[msg.sender] = true;
    allowed[tokenOwner][msg.sender] = FREE_TOKEN_AMOUNT;
    transferFrom(tokenOwner, msg.sender, FREE_TOKEN_AMOUNT);
  }
}
