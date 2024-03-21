"use client";

import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import Logo from "./logo";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-10 pl-4 pr-8 mt-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-6 sm:gap-0 justify-items-center">
        <div className="flex-1">
          <Logo />
        </div>
        <div className="flex gap-4">
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
        <p className="text-end flex-1">&copy; Crypto Raffle Inc. {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
