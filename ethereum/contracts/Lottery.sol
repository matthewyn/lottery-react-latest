// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LotteryFactory {
    address[] public deployedLottery;
    address public manager;

    constructor() {
        manager = msg.sender;
    }

    function createLottery(string memory title, uint deadline, uint minimum) public restrict {
        Lottery newLottery = new Lottery(msg.sender, title, deadline, minimum);
        deployedLottery.push(address(newLottery));
    }

    function getDeployedLottery() public view returns (address[] memory) {
        return deployedLottery;
    }

    modifier restrict {
        require(msg.sender == manager);
        _;
    }
}

contract Lottery {
    struct Details {
        string title;
        uint deadline;
    }
    address public manager;
    address[] public players;
    address public winner;
    uint public minimumContribution;
    Details public details;

    constructor(address sender, string memory title, uint deadline, uint minimum) {
        manager = sender;
        minimumContribution = minimum;
        Details storage newDetails = details;
        newDetails.title = title;
        newDetails.deadline = deadline;
    }

    function enter() public payable minimumPay {
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restrict {
        uint index = random() % players.length;
        winner = players[index];
        payable(winner).transfer(address(this).balance);
        players = new address[](0);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    modifier restrict() {
        require(msg.sender == manager);
        _;
    }

    modifier minimumPay() {
        require(msg.value >= minimumContribution);
        _;
    }
}