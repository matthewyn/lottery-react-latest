import { Badge } from "@/components/ui/badge";
import { lotteryFactory } from "@/lottery";
import { useEffect, useState } from "react";

export default function About() {
  const [deployedLottery, setDeployedLottery] = useState<string[]>([]);

  useEffect(function () {
    async function fetchData() {
      const deployedLottery = (await lotteryFactory.methods.getDeployedLottery().call()) as string[];
      setDeployedLottery(deployedLottery);
    }
    fetchData();
  }, []);

  return (
    <main className="flex mt-12 md:mt-20 flex-col gap-12 md:gap-24">
      <section className="px-8">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-4">
          <div>
            <Badge>About Us</Badge>
          </div>
          <h1 className="font-bold text-3xl">About Our Crypto Raffle</h1>
          <p className="mb-3 max-w-3xl mx-auto">We&apos;re a team of passionate developers and blockchain enthusiasts dedicated to revolutionizing the world of lotteries through the power of Ethereum smart contracts.</p>
        </div>
      </section>
      <section className="px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[4fr_1fr] gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Our mission</h2>
            <p>
              At Our Crypto Raffle, our mission is simple: to create a raffle platform that is trustworthy, transparent, and accessible to everyone. We believe in leveraging blockchain technology to eliminate the need for intermediaries,
              ensuring that every participant can trust the integrity of our raffle draws.
            </p>
          </div>
          <div className="flex md:flex-col flex-row gap-8 md:gap-4 md:border-l md:pl-8">
            <div className="flex flex-col items-start gap-1">
              <span className="text-2xl font-semibold bg-emerald-300 inline-block px-1 text-black">2023</span>
              <span>founded</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-2xl font-semibold bg-emerald-300 inline-block px-1 text-black">{deployedLottery.length}</span>
              <span>raffles</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="text-2xl font-semibold bg-emerald-300 inline-block px-1 text-black">16</span>
              <span>humans</span>
            </div>
          </div>
        </div>
      </section>
      <section className="px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:text-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Transparency</h2>
            <p>We believe in full transparency throughout every aspect of our operations. From the smart contract code to the raffle results, we strive to provide complete visibility into our processes.</p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Fairness</h2>
            <p>Fairness is non-negotiable for us. Our smart contract ensures that every participant has an equal chance of winning, with no possibility of manipulation or bias.</p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Community</h2>
            <p>We value our community above all else. We're committed to building a supportive and engaged community of lottery enthusiasts who share our vision for a fairer and more transparent future.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
