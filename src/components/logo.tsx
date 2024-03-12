import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <img src="/logo2.png" alt="Crypto raffle logo" />
    </Link>
  );
}
