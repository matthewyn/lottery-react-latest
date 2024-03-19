import ganache from "ganache";
import { Web3 } from "web3";
import assert from "assert";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const LotteryFactory = require("../ethereum/build/LotteryFactory.json");
const Lottery = require("../ethereum/build/Lottery.json");
const web3 = new Web3(ganache.provider());

let factory;
let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(LotteryFactory.abi).deploy({ data: LotteryFactory.evm.bytecode.object }).send({ from: accounts[0], gas: "1000000" });
  await factory.methods.createLottery().send({ from: accounts[0], gas: "1000000" });
  const lotteryAddress = await factory.methods.deployedLottery(0).call();
  lottery = await new web3.eth.Contract(Lottery.abi, lotteryAddress);
});

describe("Lottery test", () => {
  it("Can deploy factory and lottery instances", () => {
    assert.ok(factory.options.address);
    assert.ok(lottery.options.address);
  });
});
