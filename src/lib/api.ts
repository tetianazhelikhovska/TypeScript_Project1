import { Launch } from "../types"; 
import { Rocket } from "../types"; 
import { Crew } from "../types";

export const getLaunches = async (): Promise<Launch[]> => {
  const res = await fetch('https://api.spacexdata.com/v4/launches/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: {},
      options: {
        populate: [
          {
            path: 'rocket',
            select: {
              name: 1,
              id: 1,
            }
          }
        ],
        pagination: false,
      }
    }),
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
     throw new Error('Failed to fetch launches');
  }
  const data = await res.json();
  return data.docs;
}

export const getLaunch = async (id: string): Promise<Launch> => {
  const res = await fetch('https://api.spacexdata.com/v4/launches/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: {
        _id: id,
      },
      options: {
        populate: [
          {
            path: 'rocket',
            select: {
              name: 1,
              id: 1,
            }
          }
        ],
      }
    }),
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch launch');
  }

  const data = await res.json();
  return data.docs[0];
};

export const getRockets = async (): Promise<Rocket[]> => {
  const res = await fetch('https://api.spacexdata.com/v4/rockets', {
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
     throw new Error('Failed to fetch rockets');
  }
  return res.json();
}

export const getRocket = async (id: string): Promise<Rocket> => {
  const url = `https://api.spacexdata.com/v4/rockets/${id}`;
  const res = await fetch(url, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch rocket');
  }

  return res.json();
};

export const getCrew = async (): Promise<Crew[]> => {
  const res = await fetch('https://api.spacexdata.com/v4/crew', {
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
     throw new Error('Failed to fetch crew');
  }
  return res.json();
}

export const getCrewMember = async (id: string): Promise<Crew> => {
  const url = `https://api.spacexdata.com/v4/crew/${id}`;
  const res = await fetch(url, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch crew');
  }

  return res.json();
};