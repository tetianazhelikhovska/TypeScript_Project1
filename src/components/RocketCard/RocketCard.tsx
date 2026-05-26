import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns"; 
import { Rocket } from "../../types";
import "./RocketCard.scss";

// Fallback фото для ракет за назвою
const ROCKET_FALLBACK: Record<string, string> = {
  "Falcon 1":    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Falcon1_Flight4_liftoff.jpg/400px-Falcon1_Flight4_liftoff.jpg",
  "Falcon 9":    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Falcon_9_v1.1_on_SLC-40_pad.jpg/400px-Falcon_9_v1.1_on_SLC-40_pad.jpg",
  "Falcon Heavy":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg/400px-Falcon_Heavy_Demo_Mission_%2840126461851%29.jpg",
  "Starship":    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Starship_-_SN8_-_Flight_test_%2850714539632%29.jpg/400px-Starship_-_SN8_-_Flight_test_%2850714539632%29.jpg",
};

interface Props {
  rocket: Rocket;
}

export const RocketCard = ({ rocket }: Props) => {
  const hasFlickr = rocket.flickr_images && rocket.flickr_images.length > 0;
  const imageSrc = hasFlickr
    ? rocket.flickr_images[0]
    : ROCKET_FALLBACK[rocket.name] ?? null;

  return (
    <Link href={`/rocket/${rocket.id}`} className="rocket-card">
      <div className="rocket-card__image">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={rocket.name}
            fill
            sizes="(max-width: 768px) 100vw, 250px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="rocket-card__placeholder">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="rocket-card__icon">
              <path d="M32 4C32 4 20 14 20 32c0 6 2 11 5 15l-6 8h26l-6-8c3-4 5-9 5-15C44 14 32 4 32 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="32" cy="28" r="5" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 47l-6 6M44 47l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        )}
      </div>
      <div className="rocket-card__content">
        <div className="rocket-card__top">
          <h2 className="rocket-card__name">{rocket.name}</h2>
          <span className={`rocket-card__status rocket-card__status--${rocket.active ? "active" : "inactive"}`}>
            {rocket.active ? "Active" : "Inactive"}
          </span>
        </div>
        <p className="rocket-card__date">
          First flight: {format(new Date(rocket.first_flight), "dd.MM.yyyy")}
        </p>
      </div>
    </Link>
  );
};
