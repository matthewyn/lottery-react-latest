import { Web3 } from "web3";
import { createRequire } from "module";
import HDWalletProvider from "@truffle/hdwallet-provider";

const require = createRequire(import.meta.url);
const LotteryFactory = require("./build/LotteryFactory.json");

const provider = new HDWalletProvider("fame subject siren know menu despair display host live jealous forward grunt", "https://sepolia.infura.io/v3/62f930c7d4a24b119e87ed21747e679d");

const web3 = new Web3(provider);

async function deploy() {
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(LotteryFactory.abi).deploy({ data: LotteryFactory.evm.bytecode.object }).send({ from: accounts[0], gas: "5000000" });
  console.log(result.options.address);
  provider.engine.stop();
}
deploy();
