import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns"; 
import { Launch } from "../../types";
import "./LaunchCard.scss";

interface Props {
  launch: Launch;
}

export const LaunchCard = ({ launch }: Props) => {
  const patchImage = launch.links.patch.small || null;
  const rocketName = typeof launch.rocket === 'string' ? launch.rocket : launch.rocket.name;

  return (
    <Link href={`/launch/${launch.id}`} className="launch-card-link">
      <div className={`launch-card${launch.success ? "" : " launch-card--failure"}`}>
        <div className="launch-card__image">
          {patchImage ? (
            <Image src={patchImage} alt={launch.name} width={48} height={48} />
          ) : (
            <div className="launch-card__image-placeholder">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                <path d="M16 2C16 2 10 8 10 17c0 3 1 5.5 2.5 7.5L10 28h12l-2.5-3.5C21 22.5 22 20 22 17 22 8 16 2 16 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="16" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
          )}
        </div>
        <div className="launch-card__header">
          <span className="launch-card__status">
            {launch.success ? "Success" : "Failure"}
          </span>
          <p className="launch-card__rocket">{rocketName}</p>
        </div>
        <div className="launch-card__body">
          <p className="launch-card__date">
            {format(new Date(launch.date_utc), "dd.MM.yyyy")}
          </p>
          <h2 className="launch-card__title">{launch.name}</h2>
        </div>
      </div>
    </Link>
  );
};
