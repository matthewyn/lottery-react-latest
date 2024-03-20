import CustomDialog from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { lottery, lotteryFactory } from "@/lottery";
import web3 from "@/web3";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiMiniPlus } from "react-icons/hi2";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { HiCircleStack } from "react-icons/hi2";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils";
import { paths } from "@/paths";

export interface LotteryDetails {
  title: string;
  deadline: number;
  address?: string;
}

export default function Raffles() {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [minimum, setMinimum] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lotteries, setLotteries] = useState<LotteryDetails[]>([]);

  useEffect(function () {
    async function fetchData() {
      const deployedLottery = (await lotteryFactory.methods.getDeployedLottery().call()) as string[];
      const el = deployedLottery.map(async (address) => {
        const el = await lottery(address);
        const detail = (await el.methods.details().call()) as LotteryDetails;
        const newDetail = Object.assign(detail, { address });
        return newDetail;
      });
      const lotteries = await Promise.all(el);
      setLotteries(lotteries);
    }
    fetchData();
  }, []);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !deadline || !minimum) return toast.error("Please complete the form");
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      const [day, month, year] = deadline.split("/");
      const timestampInSecs = Math.floor(new Date(Number(year), Number(month) - 1, Number(day)).getTime() / 1000);
      await lotteryFactory.methods.createLottery(title, timestampInSecs, Number(minimum)).send({ from: accounts[0] });
      toast.success("Raffle has been added");
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

  const items =
    lotteries.length > 0 ? (
      lotteries.map((lottery) => (
        <Link to={`${paths.raffleDetails(lottery.address as string)}`} key={lottery.address}>
          <Card>
            <CardHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center mb-6 sm:mb-4 gap-2">
                <HiCircleStack className="bg-white/50 p-1 rounded-md" size={28} />
                <span className="text-sm text-white/70">{formatDate(lottery.deadline)}</span>
              </div>
              <p className="text-white/70">Crypto Raffle</p>
              <CardTitle>{lottery.title}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))
    ) : (
      <Card>
        <CardHeader className="flex flex-col gap-1">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="w-7 h-7 rounded-md" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
      </Card>
    );

  return (
    <main className="flex mt-12 md:mt-20 flex-col gap-12 md:gap-24">
      <section className="px-8">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-4">
          <h1 className="font-bold text-3xl">Explore and Enter Our Latest Raffles</h1>
          <p className="mb-3">Don&apos;t miss out &mdash; explore our lineup now and secure your chance to claim fantastic prizes</p>
          <div>
            <Button variant="secondary" className="rounded-full">
              Explore now
            </Button>
          </div>
        </div>
      </section>
      <section className="px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_1fr] items-start gap-8">
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold mt-8 md:mt-0">Recent raffles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{items}</div>
          </div>
          <div className="border rounded-md p-8 row-start-1 md:col-start-2">
            <CustomDialog handler={handleAdd} formId="create-lottery-form" buttonLabel="Add raffle" title="Add raffle to list" fullWidthButton={true} iconButton={<HiMiniPlus className="mr-2 h-4 w-4" />} isLoading={isLoading}>
              <div className="flex flex-col gap-4">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" placeholder="dd/mm/yyyy" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                <Label htmlFor="minimum">Minimum wei</Label>
                <Input id="minimum" placeholder="100" value={minimum} onChange={(e) => setMinimum(e.target.value)} />
              </div>
            </CustomDialog>
          </div>
        </div>
      </section>
    </main>
  );
}
