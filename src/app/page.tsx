import Link from "next/link";
import "./home.css";

export default async function Home() {
  return (
    <main className="home-page">
      <div className="home-hero">
        <h1 className="home-title">SpaceX Explorer</h1>
        <p className="home-subtitle">Browse launches, rockets and crew</p>
        <nav className="home-nav">
          <Link href="/launches" className="home-nav__link">Launches</Link>
          <Link href="/rockets" className="home-nav__link">Rockets</Link>
          <Link href="/crew" className="home-nav__link">Crew</Link>
        </nav>
      </div>
    </main>
  );
}
