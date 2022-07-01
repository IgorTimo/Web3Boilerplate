//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MyDate {
    mapping(address => uint32) public addressToDate;

    function setDate() public {
        addressToDate[msg.sender] = uint32(block.timestamp);
    }
}
