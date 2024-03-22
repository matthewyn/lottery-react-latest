import { useState } from "react";
import Logo from "./logo";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { paths } from "@/paths";

export default function Navbar() {
  const [state, setState] = useState(false);

  const menus = [
    { title: "Raffles", path: paths.raffles() },
    { title: "Docs", path: paths.docs() },
    { title: "About", path: paths.about() },
  ];

  return (
    <nav className="px-8 border-b border-gray-700 sticky bg-[#121011] z-50 top-0 inset-x-0">
      <div className="max-w-7xl mx-auto py-3 md:pb-3 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="md:hidden">
            <button onClick={() => setState(!state)}>
              <Menu />
            </button>
          </div>
          <div className="hidden sm:block">
            <Logo />
          </div>
          <Button variant="secondary" className="md:hidden rounded-full ml-auto" asChild>
            <Link to="https://github.com/matthewyn/lottery-react-latest" target="_blank">
              See the code
            </Link>
          </Button>
        </div>
        <div className={`md:block mb-3 md:mb-0 ${state ? "block" : "hidden"}`}>
          <ul className="flex flex-col md:flex-row gap-4">
            <div className="sm:hidden">
              <Logo />
            </div>
            {menus.map((item, idx) => (
              <li key={idx}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex flex-1 justify-end">
          <Button variant="secondary" className="rounded-full" asChild>
            <Link to="https://github.com/matthewyn/lottery-react-latest" target="_blank">
              See the code
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
