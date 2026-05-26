import Image from "next/image";
import { Crew } from "../../types";
import "./CrewCard.scss";

interface Props {
  crew: Crew;
}

export const CrewCard = ({ crew }: Props) => {
  return (
    <a href={crew.wikipedia} target="_blank" rel="noreferrer" className="crew-card">
      <div className="crew-card__image">
        {crew.image ? (
          <Image 
            src={crew.image} 
            alt={crew.name} 
            width={300}
            height={400}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="crew-card__placeholder">No IMG</div>
        )}
      </div>

      <div className="crew-card__content">
        <h3>{crew.name}</h3>
        
        <div className="crew-card__meta">
          <span>{crew.agency}</span>
          <span>{crew.status}</span>
        </div>
      </div>
    </a>
  );
};