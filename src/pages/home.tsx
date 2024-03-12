import CustomProgress from "@/components/custom-progress";
import { Button } from "@/components/ui/button";
import lottery from "@/lottery";
import web3 from "@/web3";
import { useEffect, useState } from "react";

export default function Home() {
  const [balance, setBalance] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const address = lottery.options.address as string;
  const numPlayers = players.length;

  useEffect(function () {
    async function fetchData() {
      const balance = await web3.eth.getBalance(address);
      const players = (await lottery.methods.getPlayers().call()) as string[];
      setBalance(web3.utils.fromWei(balance, "wei"));
      setPlayers(players);
    }
    fetchData();
  }, []);

  return (
    <section className="px-8 ">
      <div className="max-w-xl lg:max-w-6xl mx-auto flex flex-col gap-20 lg:gap-12">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-3xl">
              Win Big, Securely: Join the Future of Lotteries with <span className="text-emerald-300">CryptoRaffle!</span>
            </h1>
            <p className="max-w-lg mb-8">
              CryptoRaffle is your gateway to an innovative world of digital raffles, powered by the revolutionary technology of blockchain and cryptocurrency. Say goodbye to traditional ticketing systems and embrace the future of
              entertainment with us.
            </p>
            <div className="grid xs:grid-cols-[auto_1fr] items-center gap-4">
              <span className="font-bold uppercase">Ether in pools:</span>
              <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                <CustomProgress value={Number(balance)} total={1000} />
                <span>{balance} ether</span>
              </div>
            </div>
            <div className="grid xs:grid-cols-[auto_1fr] items-center gap-4">
              <span className="font-bold uppercase">Total players:</span>
              <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                <CustomProgress value={numPlayers} total={1000} />
                <span>{numPlayers} players</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <img src="/cube.png" alt="Cube technology" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-20">
          <div className="flex flex-col xs:items-center gap-3">
            <span>Join the Crypto Raffle Now!</span>
            <Button variant="secondary" className="rounded-full inline" size="lg">
              Enter me
            </Button>
          </div>
          <div className="flex flex-col xs:items-center gap-3">
            <span>Learn more about Us!</span>
            <Button variant="secondary" className="rounded-full inline" size="lg">
              View docs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
