pragma solidity ^0.4.18;

import './LionCoin.sol';

contract LionBase is LionCoin {

  event NewLion(uint lionId, uint dna);
  event NewLionOnMarket(uint lionId, uint price);
  event LionSold(uint lionId, uint price, address oldOwner, address newOwner);
  event LionPriceChanged(uint lionId, uint price);

  address public owner;

  uint dnaDigits = 16;
  uint dnaModulus = 10 ** dnaDigits;

  uint marketLionCount;
  uint purchaseCost = 5 * 10 ** 15; // 0.005 ether

  struct Lion {
    uint dna;
    uint price;
    bool onMarket;
    address owner;
  }

  Lion[] public lions;

  mapping (uint => address) public lionToOwner;
  mapping (address => uint) ownerLionCount;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier onlyLionOwner(uint _lionId) {
    require(msg.sender == lionToOwner[_lionId]);
    _;
  }

  modifier costs(uint _price) {
    require(msg.value >= _price);
    _;
  }

  function LionBase() public {
    owner = msg.sender;
    createRandomLions(24);
  }

  function getLionsCount() public view returns (uint) {
    return lions.length;
  }

  function _createLion(uint _dna) internal {
    uint id = lions.push(Lion(_dna, 1 * 10 ** decimals, true, msg.sender)) - 1;
    lionToOwner[id] = msg.sender;
    ownerLionCount[msg.sender]++;
    marketLionCount++;
    NewLion(id, _dna);
  }

  function _generateRandomDna() private view returns (uint) {
    uint rand = uint(keccak256(block.timestamp, lions.length));
    return rand % dnaModulus;
  }

  function createRandomLions(uint _amount) public onlyOwner {
    for (uint i = 0; i < _amount; i++) {
      uint randDna = _generateRandomDna();
      _createLion(randDna);
    }
  }

  function getLionsByOwner(address _owner) external view returns(uint[]) {
    uint[] memory result = new uint[](ownerLionCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < lions.length; i++) {
      if (lionToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  function setLionPrice(uint _lionId, uint _price) public onlyLionOwner(_lionId) {
    require (_price >= 0);
    lions[_lionId].price = _price;
    LionPriceChanged(_lionId, _price);
  }

  function putLionOnMarket(uint _lionId, uint _price) public onlyLionOwner(_lionId) {
    require (_price > 0);
    marketLionCount++;
    lions[_lionId].price = _price;
    lions[_lionId].onMarket = true;
    lions[_lionId].price = _price;
    NewLionOnMarket(_lionId, _price);
  }

  function cancelLionOnMarket(uint _lionId) public onlyLionOwner(_lionId) {
    lions[_lionId].onMarket = false;
    marketLionCount--;
  }

  function buyLion(uint _lionId) public payable costs(purchaseCost) {
    address oldOwner = lionToOwner[_lionId];
    uint price = lions[_lionId].price;
    require(balances[msg.sender] >= price);

    balances[msg.sender] -= price;
    balances[oldOwner] += price;
    lions[_lionId].onMarket = false;
    lions[_lionId].owner = msg.sender;
    marketLionCount--;
    ownerLionCount[oldOwner]--;
    lionToOwner[_lionId] = msg.sender;
    ownerLionCount[msg.sender]++;
    LionSold(_lionId, price, oldOwner, msg.sender);
  }

  function getLionsOnMarket() external view returns(uint[]) {
    uint[] memory result = new uint[](marketLionCount);
    uint counter = 0;
    for (uint i = 0; i < lions.length; i++) {
      if (lions[i].onMarket) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }
}
