import { useState } from "react";
import Logo from "./logo";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Navbar() {
  const [state, setState] = useState(false);

  const menus = [
    { title: "Raffles", path: "/raffles" },
    { title: "Docs", path: "/your-path" },
    { title: "Grants", path: "/your-path" },
  ];

  return (
    <nav className="px-8 border-b border-gray-700">
      <div className="max-w-7xl mx-auto py-3 md:pb-3 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button onClick={() => setState(!state)}>
              <Menu />
            </button>
          </div>
          <div className="hidden sm:block">
            <Logo />
          </div>
          <Button variant="secondary" className="md:hidden rounded-full ml-auto">
            Join the network
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
        <div className="hidden md:block">
          <Button variant="secondary" className="rounded-full">
            Join the network
          </Button>
        </div>
      </div>
    </nav>
  );
}
