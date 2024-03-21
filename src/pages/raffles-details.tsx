import { useEffect, useState } from "react";
import { LotteryDetails } from "./raffles";
import { lottery } from "@/lottery";
import { useParams } from "react-router-dom";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import web3 from "@/web3";
import { formatDate } from "@/utils";
import CustomDialog from "@/components/custom-dialog";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { HiMiniCheck } from "react-icons/hi2";
import { Label } from "@/components/ui/label";

export default function RafflesDetails() {
  const [details, setDetails] = useState<LotteryDetails>({ title: "", deadline: 0 });
  const [balance, setBalance] = useState("");
  const [minimumContribution, setMinimumContribution] = useState(0);
  const [players, setPlayers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [isIn, setIsIn] = useState(false);
  const { address } = useParams();

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);
      const el = await lottery(address as string);
      const details = (await el.methods.details().call()) as LotteryDetails;
      const balance = await web3.eth.getBalance(address as string);
      const minimumContribution = (await el.methods.minimumContribution().call()) as number;
      const players = (await el.methods.getPlayers().call()) as string[];
      const accounts = await web3.eth.getAccounts();
      setIsIn(players.includes(accounts[0]));
      setDetails(details);
      setBalance(web3.utils.fromWei(balance, "ether"));
      setMinimumContribution(Number(minimumContribution));
      setPlayers(players);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleEnter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount) return toast.error("Amount is required");
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const el = await lottery(address as string);
      await el.methods.enter().send({ from: accounts[0], value: web3.utils.toWei(amount, "ether") });
      toast.success("You get into the queue");
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
      setIsLoading(false);
    }
  };

  const content = !isIn ? (
    <CustomDialog handler={handleEnter} formId="enter-form" buttonLabel="Enter raffle" title="Secure Your Chance: Enter the Raffle Queue Now!" fullWidthButton={true} isLoading={isLoading}>
      <div className="flex flex-col gap-4">
        <Label htmlFor="amount">Amount in ethers</Label>
        <Input id="amount" placeholder=".01" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
    </CustomDialog>
  ) : (
    <div className="text-center flex flex-col gap-4">
      <Button variant="secondary" className="rounded-full w-full" disabled>
        <HiMiniCheck className="mr-2 h-4 w-4" /> Already entered
      </Button>
    </div>
  );

  return (
    <main className="flex flex-col mt-12 md:mt-20 gap-12 md:gap-24">
      <section className="px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_1fr] items-start gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-white/70">Raffles Details</h2>
            <h1 className="font-bold text-3xl mb-2">{!isLoading ? details.title : "Loading..."}</h1>
            <div className="flex gap-4 mb-4">
              <FacebookShareButton url={`${window.location.href}`}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={`${window.location.href}`}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton url={`${window.location.href}`}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total ether</CardTitle>
                  <p className="text-white/70">{!isLoading ? `${balance} ether` : "Loading..."}</p>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Minimum wei to enter</CardTitle>
                  <p className="text-white/70">{!isLoading ? `${minimumContribution} wei` : "Loading..."}</p>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Open until</CardTitle>
                  <p className="text-white/70">{!isLoading ? formatDate(details.deadline) : "Loading..."}</p>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Number of players</CardTitle>
                  <p className="text-white/70">{!isLoading ? `${players.length} players` : "Loading..."}</p>
                </CardHeader>
              </Card>
            </div>
          </div>
          <div className="border rounded-md p-8">{content}</div>
        </div>
      </section>
    </main>
  );
}
