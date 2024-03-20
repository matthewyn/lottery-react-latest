import { paths } from "@/paths";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={paths.home()}>
      <img src="/logo.png" alt="Crypto raffle logo" />
    </Link>
  );
}
