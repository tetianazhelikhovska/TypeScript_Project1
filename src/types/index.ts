// {
//   "id": "5eb87cd9ffd86e000604b32a",
//   "name": "FalconSat",
//   "details": "Engine failure at 33 seconds...",  // Увага: може бути null!
//   "date_utc": "2006-03-24T22:30:00.000Z",
//   "success": false,                           // Увага: може бути null (якщо майбутній)!
//   "links": {
//     "patch": {
//       "small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png" // Може бути null
//     },
//     "webcast": "https://www.youtube.com/watch?v=0a_00nJ_Y88"     // Може бути null
//   }
// }


export interface Core {
  core: string | null;
  flight: number;
  gridfins: boolean | null;
  legs: boolean | null;
  reused: boolean | null;
  landing_attempt: boolean | null;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
}

export interface Launch {
  id: string;
  name: string;
  flight_number: number;
  failures: Array<{
    reason: string;
  }>;
  details: string | null;
  date_utc: string;
  success: boolean | null;
  rocket: string | { id: string; name: string };
  cores: Core[];
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    reddit: { 
      campaign: string | null;
      launch: string | null;
      recovery: string | null;
    };
    flickr: {
      original: string[];
    };
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
  };
}export interface Rocket {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  
  height: { meters: number | null; feet: number | null };
  diameter: { meters: number | null; feet: number | null };
  mass: { kg: number; lb: number };
  
  first_stage: {
    reusable: boolean;
    engines: number;
    fuel_amount_tons: number;
    burn_time_sec: number | null;
  };
  
  second_stage: {
    reusable: boolean;
    engines: number;
    fuel_amount_tons: number;
    burn_time_sec: number | null;
  };
  
  payload_weights: Array<{
    id: string;
    name: string;
    kg: number;
    lb: number;
  }>;
  
  flickr_images: string[];
}

export interface Crew {
  id: string;
  name: string;
  status: string;
  agency: string;
  image: string;
  wikipedia: string;
  launches: string[];
}