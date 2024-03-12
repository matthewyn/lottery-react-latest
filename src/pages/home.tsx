import CustomDialog from "@/components/custom-dialog";
import CustomProgress from "@/components/custom-progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import lottery from "@/lottery";
import web3 from "@/web3";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type HomeLoading = { pickWinner: boolean; enter: boolean };

export default function Home() {
  const [balance, setBalance] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState<HomeLoading>({ pickWinner: false, enter: false });
  const [isManager, setIsManager] = useState(false);
  const address = lottery.options.address as string;
  const numPlayers = players.length;

  useEffect(
    function () {
      async function fetchData() {
        const balance = await web3.eth.getBalance(address);
        const players = (await lottery.methods.getPlayers().call()) as string[];
        const manager = (await lottery.methods.manager().call()) as string;
        const accounts = await web3.eth.getAccounts();
        setIsManager(accounts[0] === manager);
        setBalance(web3.utils.fromWei(balance, "ether"));
        setPlayers(players);
      }
      fetchData();
    },
    [address]
  );

  const handleEnter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount) return toast.error("Amount is required");
    try {
      setIsLoading((loading) => {
        const newLoading = Object.assign({}, loading);
        newLoading.enter = true;
        return newLoading;
      });
      const accounts = await web3.eth.getAccounts();
      await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei(amount, "ether") });
      toast.success("You get into the queue!");
      setAmount("");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message.split(": ")[2]);
      } else {
        toast.error("Something bad happen");
      }
    } finally {
      setIsLoading((loading) => {
        const newLoading = Object.assign({}, loading);
        newLoading.enter = false;
        return newLoading;
      });
    }
  };

  const handlePickWinner = async () => {
    try {
      setIsLoading((loading) => {
        const newLoading = Object.assign({}, loading);
        newLoading.pickWinner = true;
        return newLoading;
      });
      const accounts = await web3.eth.getAccounts();
      await lottery.methods.pickWinner().send({ from: accounts[0] });
      toast.success("Winner has been selected");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message.split(": ")[2]);
      } else {
        toast.error("Something bad happen");
      }
    } finally {
      setIsLoading((loading) => {
        const newLoading = Object.assign({}, loading);
        newLoading.pickWinner = false;
        return newLoading;
      });
    }
  };

  let content;
  if (isManager) {
    content = (
      <div className="flex flex-col xs:items-center items-start gap-3">
        <span>Pick a winner!</span>
        <Button onClick={handlePickWinner} variant="outline" className="rounded-full" size="lg">
          {isLoading.pickWinner ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Pick now
        </Button>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col xs:items-center items-start gap-3">
        <span>Learn more about Us!</span>
        <Button variant="secondary" className="rounded-full" size="lg">
          View docs
        </Button>
      </div>
    );
  }

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
            <CustomDialog handler={handleEnter} formId="enter-form" buttonLabel="Enter me" title="Secure Your Chance: Enter the Raffle Queue Now!" isLoading={isLoading}>
              <div className="grid sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="sm:text-right">
                  Amount
                </Label>
                <Input id="amount" placeholder=".01" className="col-span-3" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
            </CustomDialog>
          </div>
          {content}
        </div>
      </div>
    </section>
  );
}
