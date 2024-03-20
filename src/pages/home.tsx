import CustomProgress from "@/components/custom-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { lotteryFactory } from "@/lottery";
import { HiCubeTransparent } from "react-icons/hi2";
import { HiMiniGlobeAsiaAustralia } from "react-icons/hi2";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HiArrowSmallRight } from "react-icons/hi2";
import web3 from "@/web3";
import { Link } from "react-router-dom";
import { paths } from "@/paths";

export type HomeLoading = { pickWinner: boolean; enter: boolean };

export default function Home() {
  const [deployedLottery, setDeployedLottery] = useState<string[]>([]);
  const [totalBalance, setTotalBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);
      const deployedLottery = (await lotteryFactory.methods.getDeployedLottery().call()) as string[];
      let totalBalance = 0;
      const el = deployedLottery.map(async (address) => {
        const balance = await web3.eth.getBalance(address);
        return Number(web3.utils.fromWei(balance, "ether"));
      });
      const balances = await Promise.all(el);
      balances.forEach((balance) => {
        totalBalance += balance;
      });
      setDeployedLottery(deployedLottery);
      setTotalBalance(String(totalBalance));
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <main className="flex mt-12 md:mt-20 flex-col gap-12 md:gap-24">
        <section className="px-8">
          <div className="max-w-xl lg:max-w-6xl mx-auto flex flex-col gap-16 lg:gap-12">
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
                  <span className="font-bold uppercase">Active raffle:</span>
                  <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                    <CustomProgress value={Number(deployedLottery.length)} total={100} />
                    <span>{!isLoading ? `${deployedLottery.length} raffle` : "Loading..."}</span>
                  </div>
                </div>
                <div className="grid xs:grid-cols-[auto_1fr] items-center gap-4">
                  <span className="font-bold uppercase">Total ethers:</span>
                  <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                    <CustomProgress value={Number(totalBalance)} total={10} />
                    <span>{!isLoading ? `${totalBalance} ethers` : "Loading..."}</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <img src="/cube.png" alt="Cube technology" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-20">
              <div>
                <Button variant="secondary" className="rounded-full" size="lg" asChild>
                  <Link to={paths.raffles()}>
                    Get started <HiArrowSmallRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div>
                <Button variant="outline" className="rounded-full" size="lg">
                  View docs
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div className="h-52 xs:h-64 md:h-72 lg:h-80">
          <svg width="100%" height="50%" id="svg1" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="5%" stopColor="#6ee7b7"></stop>
                <stop offset="95%" stopColor="#8ed1fc"></stop>
              </linearGradient>
            </defs>
            <path
              d="M 0,400 L 0,100 C 94.22009569377991,86.72727272727273 188.44019138755982,73.45454545454547 293,79 C 397.5598086124402,84.54545454545453 512.4593301435406,108.90909090909089 598,117 C 683.5406698564594,125.09090909090911 739.7224880382776,116.90909090909092 843,105 C 946.2775119617224,93.09090909090908 1096.6507177033493,77.45454545454544 1204,76 C 1311.3492822966507,74.54545454545456 1375.6746411483255,87.27272727272728 1440,100 L 1440,400 L 0,400 Z"
              stroke="none"
              strokeWidth="0"
              fill="url(#gradient1)"
              fillOpacity="0.53"
              className="transition-all duration-300 ease-in-out delay-150 path-0"
            ></path>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="5%" stopColor="#6ee7b7"></stop>
                <stop offset="95%" stopColor="#8ed1fc"></stop>
              </linearGradient>
            </defs>
            <path
              d="M 0,400 L 0,233 C 86.82296650717703,232.10047846889952 173.64593301435406,231.20095693779905 262,239 C 350.35406698564594,246.79904306220095 440.2392344497606,263.2966507177033 536,271 C 631.7607655502394,278.7033492822967 733.397129186603,277.6124401913876 843,262 C 952.602870813397,246.38755980861245 1070.1722488038276,216.25358851674642 1171,209 C 1271.8277511961724,201.74641148325358 1355.9138755980862,217.3732057416268 1440,233 L 1440,400 L 0,400 Z"
              stroke="none"
              strokeWidth="0"
              fill="url(#gradient1)"
              fillOpacity="1"
              className="transition-all duration-300 ease-in-out delay-150 path-1"
            ></path>
          </svg>
          <svg width="100%" height="50%" id="svg2" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="5%" stopColor="#8ed1fc"></stop>
                <stop offset="95%" stopColor="#6ee7b7"></stop>
              </linearGradient>
            </defs>
            <path
              d="M 0,400 L 0,100 C 93.58851674641147,78.75598086124401 187.17703349282294,57.51196172248804 291,64 C 394.82296650717706,70.48803827751196 508.88038277511964,104.70813397129187 600,108 C 691.1196172248804,111.29186602870813 759.3014354066985,83.6555023923445 842,87 C 924.6985645933015,90.3444976076555 1021.9138755980862,124.66985645933016 1124,132 C 1226.0861244019138,139.33014354066984 1333.043062200957,119.66507177033492 1440,100 L 1440,400 L 0,400 Z"
              stroke="none"
              strokeWidth="0"
              fill="url(#gradient2)"
              fillOpacity="0.53"
              className="transition-all duration-300 ease-in-out delay-150 path-2"
              transform="rotate(-180 720 200)"
            ></path>
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="5%" stopColor="#8ed1fc"></stop>
                <stop offset="95%" stopColor="#6ee7b7"></stop>
              </linearGradient>
            </defs>
            <path
              d="M 0,400 L 0,233 C 105.58851674641147,206.26315789473685 211.17703349282294,179.5263157894737 302,184 C 392.82296650717706,188.4736842105263 468.88038277511964,224.15789473684208 565,250 C 661.1196172248804,275.8421052631579 777.3014354066986,291.84210526315786 875,275 C 972.6985645933014,258.15789473684214 1051.9138755980862,208.47368421052633 1143,196 C 1234.0861244019138,183.52631578947367 1337.043062200957,208.26315789473682 1440,233 L 1440,400 L 0,400 Z"
              stroke="none"
              strokeWidth="0"
              fill="url(#gradient2)"
              fillOpacity="1"
              className="transition-all duration-300 ease-in-out delay-150 path-3"
              transform="rotate(-180 720 200)"
            ></path>
          </svg>
        </div>
        <section className="px-8">
          <div className="max-w-6xl mx-auto flex flex-col gap-12">
            <h2 className="font-bold text-2xl text-center">Embracing the power of cryptocurrency</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="flex flex-col gap-4">
                  <HiCubeTransparent size={36} />
                  <CardTitle>Blockchain security</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <p>
                    Leverages blockchain technology to ensure <span className="text-emerald-300">transparency</span> and <span className="text-emerald-300">security</span> throughout the entire raffle process.
                  </p>
                  <p>Every transaction is recorded on the blockchain.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col gap-4">
                  <HiMiniGlobeAsiaAustralia size={36} />
                  <CardTitle>Decentralized platform</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <p>
                    Operates on a <span className="text-emerald-300">decentralized</span> network, giving users greater autonomy and eliminating the risk of manipulation or fraud.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col gap-4">
                  <HiOutlineDocumentDuplicate size={36} />
                  <CardTitle>Smart contracts</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <p>
                    Utilizes smart contracts to automate the entire raffle process, from <span className="text-emerald-300">ticket purchases</span> to <span className="text-emerald-300">prize distributions</span>.
                  </p>
                  <p>These self-executing contracts ensure that all transactions are executed exactly as programmed.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
