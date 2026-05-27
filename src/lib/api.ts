import { Launch } from "../types";
import { Rocket } from "../types";
import { Crew } from "../types";

const safeFetch = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
};

export const getLaunches = async (): Promise<Launch[]> => {
  const data = await safeFetch(
    "https://api.spacexdata.com/v4/launches/query",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {},
        options: {
          populate: [
            {
              path: "rocket",
              select: {
                name: 1,
                id: 1,
              },
            },
          ],
          pagination: false,
        },
      }),
    }
  );

  return data?.docs || [];
};

export const getLaunch = async (id: string): Promise<Launch | null> => {
  const data = await safeFetch(
    "https://api.spacexdata.com/v4/launches/query",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          _id: id,
        },
        options: {
          populate: [
            {
              path: "rocket",
              select: {
                name: 1,
                id: 1,
              },
            },
          ],
        },
      }),
    }
  );

  return data?.docs?.[0] || null;
};

export const getRockets = async (): Promise<Rocket[]> => {
  const data = await safeFetch(
    "https://api.spacexdata.com/v4/rockets"
  );

  return data || [];
};

export const getRocket = async (
  id: string
): Promise<Rocket | null> => {
  const data = await safeFetch(
    `https://api.spacexdata.com/v4/rockets/${id}`
  );

  return data || null;
};

export const getCrew = async (): Promise<Crew[]> => {
  const data = await safeFetch(
    "https://api.spacexdata.com/v4/crew"
  );

  return data || [];
};

export const getCrewMember = async (
  id: string
): Promise<Crew | null> => {
  const data = await safeFetch(
    `https://api.spacexdata.com/v4/crew/${id}`
  );

  return data || null;
};
