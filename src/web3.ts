import Web3 from "web3";

let web3: Web3;
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  window.ethereum?.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/62f930c7d4a24b119e87ed21747e679d");
  web3 = new Web3(provider);
}

export default web3;
