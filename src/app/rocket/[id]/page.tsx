import { getRocket } from "../../../lib/api"; // Перевір шлях
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import "./page.scss";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RocketPage({ params }: Props) {
  const { id } = await params;
  const rocket = await getRocket(id);

  return (
    <div className="rocket-page">
      
      <Link href="/rockets" className="back-link">← Back to Rockets</Link>

      <header className="rocket-header">
        <div>
          <h1>{rocket.name}</h1>
          <span className={rocket.active ? "active" : "inactive"}>
            {rocket.active ? "Active" : "Inactive"}
          </span>
        </div>
        <p>{rocket.description}</p>
        
        <div className="meta">
          <div>
            <span>First Flight</span>
            <strong>{format(new Date(rocket.first_flight), "dd MMMM yyyy")}</strong>
          </div>
          <div>
            <span>Cost per Launch</span>
            <strong>${rocket.cost_per_launch.toLocaleString()}</strong>
          </div>
          <div>
            <span>Success Rate</span>
            <strong>{rocket.success_rate_pct}%</strong>
          </div>
          <div>
            <span>Company</span>
            <strong>{rocket.company}, {rocket.country}</strong>
          </div>
        </div>
      </header>

      {rocket.flickr_images.length > 0 && (
        <div className="gallery">
           {rocket.flickr_images.slice(0, 4).map((img, index) => (
             <div key={index}>
                <Image 
                  src={img} 
                  alt={`${rocket.name} image ${index}`} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
             </div>
           ))}
        </div>
      )}

      <section>
        <h2>Physical Parameters</h2>
        <div className="stats">
          <div>
            <span>Height</span>
            <span>{rocket.height.meters} m</span>
            <span>{rocket.height.feet} ft</span>
          </div>
          <div>
            <span>Diameter</span>
            <span>{rocket.diameter.meters} m</span>
            <span>{rocket.diameter.feet} ft</span>
          </div>
          <div>
            <span>Mass</span>
            <span>{rocket.mass.kg.toLocaleString()} kg</span>
            <span>{rocket.mass.lb.toLocaleString()} lb</span>
          </div>
          <div>
            <span>Stages</span>
            <span>{rocket.stages}</span>
          </div>
        </div>
      </section>

      <section>
        <h2>Stage Details</h2>
        <div className="stages">
          <div>
            <h3>First Stage</h3>
            <div>
              <span>Engines</span>
              <strong>{rocket.first_stage.engines}</strong>
            </div>
            <div>
              <span>Fuel Amount</span>
              <strong>{rocket.first_stage.fuel_amount_tons} tons</strong>
            </div>
            <div>
              <span>Reusable</span>
              <strong className={rocket.first_stage.reusable ? "green" : "red"}>
                {rocket.first_stage.reusable ? "Yes" : "No"}
              </strong>
            </div>
          </div>

          <div>
            <h3>Second Stage</h3>
            <div>
              <span>Engines</span>
              <strong>{rocket.second_stage.engines}</strong>
            </div>
            <div>
              <span>Fuel Amount</span>
              <strong>{rocket.second_stage.fuel_amount_tons} tons</strong>
            </div>
            <div>
              <span>Reusable</span>
              <strong className={rocket.second_stage.reusable ? "green" : "red"}>
                {rocket.second_stage.reusable ? "Yes" : "No"}
              </strong>
            </div>
          </div>
        </div>
      </section>

      {rocket.payload_weights.length > 0 && (
        <section>
          <h2>Payload Capacity</h2>
          <div className="payloads">
            {rocket.payload_weights.map((payload) => (
              <div key={payload.id}>
                <span>{payload.name}</span>
                <span>{payload.kg.toLocaleString()} kg</span>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {rocket.wikipedia && (
        <a href={rocket.wikipedia} target="_blank" rel="noreferrer" className="wiki-link">
          Read on Wikipedia
        </a>
      )}

    </div>
  );
}