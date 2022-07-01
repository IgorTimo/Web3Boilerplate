//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}

contract ManyArgs {
    string public str;
    uint256 public number;

    constructor(string memory _str, uint256 _number) {
        str = _str;
        number = _number;
    }
}
