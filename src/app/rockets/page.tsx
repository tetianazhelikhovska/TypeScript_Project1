import { getRockets } from "../../lib/api";
import { RocketCard } from "../../components/RocketCard/RocketCard";
import Link from "next/link";
import "./page.scss";

export default async function Rockets() {
  const rocketes = await getRockets();

  return (
    <div className="rockets-page">
      <Link href="/" className="back-link">
        ← Back to main page
      </Link>
      <header>
        <h1>SpaceX rocketes</h1>
      </header>
      <div className="rockets-grid">
        {rocketes.map((rocket) => (
          <RocketCard key={rocket.id} rocket={rocket} />
        ))}
      </div>
    </div>
  );
}