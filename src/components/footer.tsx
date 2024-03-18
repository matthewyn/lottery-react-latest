"use client";

import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import Logo from "./logo";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-10 pl-4 pr-8 mt-8">
      <div className="max-w-6xl mx-auto grid gap-y-6 md:grid-cols-[auto_1fr_auto] items-center justify-items-center">
        <div>
          <Logo />
        </div>
        <div className="flex gap-3">
          <Link to="#">
            <BsInstagram size={20} />
          </Link>
          <Link to="#">
            <BsFacebook size={20} />
          </Link>
          <Link to="#">
            <BsTwitter size={20} />
          </Link>
        </div>
        <p className="text-center">&copy; Crypto Raffle Inc. {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
