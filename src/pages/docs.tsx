import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { paths } from "@/paths";
import { Link } from "react-router-dom";

export default function Docs() {
  return (
    <main className="flex flex-col mt-12 md:mt-20 gap-12 md:gap-24">
      <section className="px-8">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-4">
          <h1 className="font-bold text-3xl">A Dive into Our Operational Framework</h1>
          <p className="mb-3">Unveiling the Behind-the-Scenes Mechanics of Secure Transactions, Fair Draws, and User Engagement Strategies</p>
          <div>
            <Button variant="secondary" className="rounded-full" asChild>
              <Link to={paths.raffles()}>Get started now</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="px-8">
        <div className="max-w-6xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is a crypto raffle?</AccordionTrigger>
              <AccordionContent>
                A crypto raffle is a game of chance where participants purchase tickets using cryptocurrency for a chance to win valuable prizes. These prizes can range from cryptocurrencies themselves to digital collectibles and more.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I participate in a raffle on your platform?</AccordionTrigger>
              <AccordionContent>
                Participating in a raffle on our platform is simple. Browse through the available raffles, choose the one you're interested in, purchase tickets using cryptocurrency, and await the draw to see if you're a winner.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it safe to use your platform?</AccordionTrigger>
              <AccordionContent>
                Yes, we prioritize the safety and security of our users. All transactions are conducted securely using blockchain technology, ensuring transparency and integrity. Additionally, our platform implements robust encryption
                protocols to safeguard user data and protect against potential cyber threats.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How are raffle winners determined?</AccordionTrigger>
              <AccordionContent>
                Raffle winners are determined through a provably fair algorithm that ensures the outcome of each draw is completely random and unbiased. Users can verify the fairness of the draw by accessing the publicly available code and
                verifying the results themselves.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}
