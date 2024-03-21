import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { paths } from "@/paths";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { HiMiniCheck } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function Docs() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !country) return toast.error("Please fill required field");
    toast.success("Form has been submitted");
    setFirstName("");
    setLastName("");
    setEmail("");
    setCountry("");
  };

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
      <section className="px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold mt-6 md:mt-0">Need more info?</h2>
            <p>Get in touch and we'll send you over all the information you need, no obligations whatsoever. </p>
            <p className="flex items-center gap-2">
              <HiMiniCheck color="#6ee7b7" />
              Quick response with great feedback
            </p>
            <p className="flex items-center gap-2">
              <HiMiniCheck color="#6ee7b7" />
              Your questions answered, by phone or email
            </p>
            <p className="flex items-center gap-2">
              <HiMiniCheck color="#6ee7b7" />
              Helpful advice with no obligations
            </p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Label htmlFor="country">Country</Label>
            <Input id="country" className="mb-4" value={country} onChange={(e) => setCountry(e.target.value)} />
            <div>
              <Button variant="secondary">Request more details</Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
