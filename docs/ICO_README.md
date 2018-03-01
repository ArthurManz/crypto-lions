# Ethereum ICO Workshop

Learn how to deploy your own token/coin on Ethereum

## Prerequisites

- Install [MetaMask] Web browser extension
- Create a wallet using MetaMask

> Basic programming knowledge is expected to follow this workshop

## Ethereum

### Basic explanation of Distributed Systems

With most websites, information is stored on a server, which is basically just a computer 
with a database in it that has all of the site's information. If that computer is damaged, 
all the data and the website is gone. With distributed ledger technology, a database is 
distributed among a great number of people's computers, so that all information in the 
database is public and the database can't really be shut down as long as computers are 
still contributing to it.

### Distributed ledger

You can think of a distributed ledger as a shared Excel spreadsheet. Ledger is nothing else 
but a store of somehow organised information that could be financial transactions or events, 
but potentially anything else that you can categorise.

### Consensus

Consesus is a way of agreeing on the latest version of distributed ledger (or our shared spreadsheet) 
amongst participants - what updates are valid, and what is the order of those updates.

In blockchain technology, ledger updates are called transactions, and they are grouped in blocks to 
achieve consensus in a more efficient manner. Once a block is agreed upon and consensus has been 
reached, it becomes immutable and can never be changed. Blocks are stacked in a chain and together 
they contain a full history of all transactions.

### Smart Contracts (Ethereum)

Smart contracts are just like functions or macros in a spreadsheet. You can use them to manage more complex operations and updates on entries in your ledger. You're able to execute those functions in a distributed manner, making Ethereum more advanced than for example Bitcoin, that supports only basic transactions.

### Ether Gas

Gas is a price you pay in Ether (Ethereum cryptocurrency) for performing transactions or executing the code on Ethereum network. In fact it's a reward for the nodes who group transactions in blocks and validate them. You can specify how much gas you're willing to pay, and potentially incentivise validating nodes to verify your transaction sooner.

As a measure of protection against erroneous or malicious calculations (for example infinite loops), gas limit is specified for each transaction. Once the limit is reached and calculation is not complete, the transaction is cancelled. Gas price is however paid in full.

### Ethereum Test networks

Besides main Ethereum network, there are a few test networks that smart contract developers use to verify their code. Current test networks are:
  - [Ropsten] - default test network
  - [Rinkeby] - simplified test network with "free" Ether
  - [Kovan] - test network with a different consensus mechanism

## Tokens

### ERC20

[ERC20] is one of the token standard interfaces. It is most commonly used when you use token as a coin - they don't have special properties, they're transfarrable and can be re-used by other applications, such as wallets, exchanges, or third party smart contracts.

To be compliant with ERC20, smart contract must implement this interface:

```javascript
  contract ERC20Interface {
      function totalSupply() public constant returns (uint);
      function balanceOf(address tokenOwner) public constant returns (uint balance);
      function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
      function transfer(address to, uint tokens) public returns (bool success);
      function approve(address spender, uint tokens) public returns (bool success);
      function transferFrom(address from, address to, uint tokens) public returns (bool success);
  
      event Transfer(address indexed from, address indexed to, uint tokens);
      event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
  }
```

## How to deploy your own token

### MetaMask setup and free Rinkeby ether

  - Install and configure [MetaMask] in your favourite browser
  - Click on MetaMask button, switch the network to Rinkeby (at the top) and copy your address to clipboard
  - Go to [Rinkeby Faucet] and follow instructions to get Ether

### Token creation

  - Download files from [OpenZeppelin] - an open source framework to build secure smart contracts on Ethereum:
    - [Basic Token.sol]
    - [ERC20.sol]
    - [ERC20Basic.sol]
    - [StandardToken.sol]
    - [SafeMath.sol]
  - Open [Remix Solidity] - official Ethereum web IDE
  - Click on folder button in top-left corner and add all *.sol files you've downloaded
  - Click + in the top-left corner, create MyBestToken.sol and copy-paste the content below (based on [SimpleToken.sol]):

```javascript
  pragma solidity ^0.4.18;
  
  import "./StandardToken.sol";
  
  /**
   * @title SimpleToken
   * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
   * Note they can later distribute these tokens as they wish using `transfer` and other
   * `StandardToken` functions.
  */
  contract MyBestToken is StandardToken {
  
    string public constant name = "MyBestToken";
    string public constant symbol = "MBT";
    uint8 public constant decimals = 18;
  
    uint256 public constant INITIAL_SUPPLY = 1000000000000000000000000 * (10 ** uint256(decimals));
  
    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    function MyBestToken() public {
      totalSupply_ = INITIAL_SUPPLY;
      balances[msg.sender] = INITIAL_SUPPLY;
      Transfer(0x0, msg.sender, INITIAL_SUPPLY); // Record event
    }
  }
```

- Click "Auto compile" checkbox and then "Start to compile"
- Go to Run tab on the right, select MyBestToken from dropdown menu and click on "Create"
- MetaMask window should pop up to sign the transaction, click OK
- Congratulations, you've created a token!

### Add Token to MetaMask

- Click on MetaMask and click on the contract creation in Sent tab
- Copy contract address from To: field on Etherscan
- In MetaMask click on Token tab and "Add Token"
- Paste in the address
- Token should now be visible to MetaMask


[MetaMask]: https://metamask.io/
[Ehtereum]: https://www.ethereum.org/ 
[Remix Solidity]: https://remix.ethereum.org/
[OpenZeppelin]: https://github.com/OpenZeppelin/zeppelin-solidity
[Kovan]: https://kovan-testnet.github.io/website/
[Rinkeby]: https://www.rinkeby.io/
[Rinkeby Faucet]: https://www.rinkeby.io/#faucet
[Ropsten]: https://github.com/ethereum/ropsten
[ERC20]: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
[SimpleToken.sol]: https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/examples/SimpleToken.sol
[Basic Token.sol]: https://raw.githubusercontent.com/OpenZeppelin/zeppelin-solidity/master/contracts/token/ERC20/BasicToken.sol
[ERC20.sol]: https://raw.githubusercontent.com/OpenZeppelin/zeppelin-solidity/master/contracts/token/ERC20/ERC20.sol
[ERC20Basic.sol]: https://raw.githubusercontent.com/OpenZeppelin/zeppelin-solidity/master/contracts/token/ERC20/ERC20Basic.sol
[StandardToken.sol]: https://raw.githubusercontent.com/OpenZeppelin/zeppelin-solidity/master/contracts/token/ERC20/StandardToken.sol
[SafeMath.sol]: https://raw.githubusercontent.com/OpenZeppelin/zeppelin-solidity/master/contracts/math/SafeMath.sol
