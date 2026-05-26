import { getCrew } from "../../lib/api";
import { CrewCard } from "../../components/CrewCard/CrewCard";
import Link from "next/link";
import "./page.scss";

export default async function Crew() {
  const crew = await getCrew();

  return (
    <div className="crew-page">
      <Link href="/" className="back-link">
        ← Back to main page
      </Link>
      <header>
        <h1>SpaceX Crew</h1>
      </header>
      <div className="crew-grid">
        {crew.map((member) => (
          <CrewCard key={member.id} crew={member} />
        ))}
      </div>
    </div>
  );
}