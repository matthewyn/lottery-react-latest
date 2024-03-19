import web3 from "./web3";
import LotteryFactory from "../ethereum/build/LotteryFactory.json";
import Lottery from "../ethereum/build/Lottery.json";

const address = "0x5c76B14EF50A17FbB6BD99C5493C65c55eb4ba46";

const lotteryFactory = new web3.eth.Contract(LotteryFactory.abi, address);

async function lottery(address: string) {
  return await new web3.eth.Contract(Lottery.abi, address);
}

export { lotteryFactory, lottery };
