import web3 from "./web3";

const address = "0x6f61cE9D2C9119F0A405C70A9237F8d5b3b4636A";

const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "enter", outputs: [], stateMutability: "payable", type: "function" },
  { inputs: [], name: "getPlayers", outputs: [{ internalType: "address[]", name: "", type: "address[]" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "manager", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "pickWinner", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ internalType: "uint256", name: "", type: "uint256" }], name: "players", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
];

const lottery = new web3.eth.Contract(abi, address);
export default lottery;
