import { getLaunch, getRockets } from "../../../lib/api";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { Core } from "../../../types";
import "./page.scss";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LaunchPage({ params }: Props) {
  const { id } = await params;

  const launch = await getLaunch(id);

  const rocketName = typeof launch.rocket === 'string' 
  ? launch.rocket 
  : launch.rocket.name;

  return (
    <div className="launch-page">
      
      <div className="launch-header">
        <div className="launch-header__info">
          <h1 className="launch-header__title">{launch.name}</h1>
          <p className="launch-header__date">
            {format(new Date(launch.date_utc), "dd MMMM yyyy, HH:mm")}
          </p>
          <p className="launch-header__rocket">
            Rocket: {rocketName}
          </p>
        </div>

        <div className={`launch-header__status launch-header__status--${launch.success ? "success" : "failure"}`}>
          {launch.success ? "Success" : "Failure"}
        </div>
      </div>

      <div className="launch-content">
        
        <div className="launch-sidebar">
          <div className="launch-patch">
            {launch.links.patch.large ? (
              <Image
                src={launch.links.patch.large}
                alt={launch.name}
                width={400}
                height={400}
                priority
              />
            ) : (
              <div className="launch-patch__placeholder">No Patch Image</div>
            )}
          </div>

          <div className="flight-info">
            <span className="flight-info__label">Flight Number</span>
            <span className="flight-info__number">#{launch.flight_number}</span>
          </div>
        </div>

        <div className="launch-main">
          
          <section className="launch-section">
            <h2 className="launch-section__title">Mission Details</h2>
            <p className="launch-section__text">
              {launch.details || "No description available for this mission."}
            </p>
          </section>

          {launch.links.youtube_id && (
            <section className="launch-section">
               <h2 className="launch-section__title">Webcast</h2>
               <div className="video-container">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
                  title="SpaceX Launch Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}

          {launch.cores.length > 0 && (
            <section className="launch-section">
              <h2 className="launch-section__title">Core Stats</h2>
              <div className="cores-list">
                {launch.cores.map((core: Core, index: number) => (
                  <div key={index} className="core-item">
                    <div className="core-stat">
                      <span className="core-stat__label">Serial</span>
                      <span className="core-stat__value">{core.core || "N/A"}</span>
                    </div>
                    <div className="core-stat">
                      <span className="core-stat__label">Flight #</span>
                      <span className="core-stat__value">{core.flight}</span>
                      {core.reused && <span className="core-stat__badge">Reused</span>}
                    </div>
                    <div className="core-stat">
                      <span className="core-stat__label">Landing</span>
                      {core.landing_attempt ? (
                        core.landing_success ? (
                          <span className="core-stat__value core-stat__value--success">
                             Success ({core.landing_type})
                          </span>
                        ) : (
                          <span className="core-stat__value core-stat__value--failure">Failed</span>
                        )
                      ) : (
                        <span className="core-stat__value">No Attempt</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {launch.failures.length > 0 && (
            <section className="launch-section failure-section">
              <h3 className="failure-section__title">Failure Report</h3>
              <p className="failure-section__text">{launch.failures[0].reason}</p>
            </section>
          )}

          <section className="launch-links">
            {launch.links.wikipedia && (
              <a href={launch.links.wikipedia} target="_blank" rel="noreferrer" className="launch-link">
                Wikipedia
              </a>
            )}
            {launch.links.reddit.campaign && (
              <a href={launch.links.reddit.campaign} target="_blank" rel="noreferrer" className="launch-link">
                Reddit Thread
              </a>
            )}
            {launch.links.article && (
              <a href={launch.links.article} target="_blank" rel="noreferrer" className="launch-link">
                Read Article
              </a>
            )}
          </section>

        </div>
      </div>

      {launch.links.flickr.original && launch.links.flickr.original.length > 0 && (
        <section className="gallery-section">
          <h2 className="gallery-section__title">Mission Gallery</h2>
          <div className="gallery-grid">
            {launch.links.flickr.original
              .filter((url) => url)
              .map((imageUrl, index) => (
                <div key={index} className="gallery-item">
                  <Image
                    src={imageUrl}
                    alt={`${launch.name} photo ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
          </div>
        </section>
      )}

      <div className="back-link">
        <Link href="/launches">
          ← Back to All Launches
        </Link>
      </div>

    </div>
  );
}