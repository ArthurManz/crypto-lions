pragma solidity ^0.4.19;

contract LionBase {

    event NewLion(uint lionId, string name, uint dna);
    event NewLionOnMarket(uint lionId, uint price);

    address public owner;

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Lion {
      string name;
      uint dna;
      uint price = 0;
      bool onMarket = false;
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

    function LionBase() public {
        owner = msg.sender;
    }

    function _createLion(string _name, uint _dna) internal {
        uint id = lions.push(Lion(_name, _dna)) - 1;
        lionToOwner[id] = msg.sender;
        ownerLionCount[msg.sender]++;
        NewLion(id, _name, _dna);
    }

    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }

    // build something here to generate multiple lions and put them on the market

    // function createRandomLion(string _name) public {
    //     require(ownerLionCount[msg.sender] == 0);
    //     uint randDna = _generateRandomDna(_name);
    //     randDna = randDna - randDna % 100;
    //     _createLion(_name, randDna);
    // }


    function changeName(uint _lionId, string _newName) external onlyLionOwner(_lionId) {
        lions[_lionId].name = _newName;
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

    function putLionOnMarket(uint _lionId, uint _price) public onlyLionOwner(_lionId) {
        require (_price > 0);
        lions[_lionId].onMarket = true;
        NewLionOnMarket(_lionId, _price);
    }

    function cancelLionOnMarket(uint _lionId) public onlyLionOwner(_lionId) {
        _removeLionFromMarket(uint _lionId);
    }

    function _removeLionFromMarket(uint _lionId) internal {
        lions[_lionId].onMarket = false;
    }

    // build the token first
    function buyLion(uint _lionId) public {
    }
}

