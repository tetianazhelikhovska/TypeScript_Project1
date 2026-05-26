"use client";
import { useRouter, useSearchParams } from "next/navigation";
import "./FilterBar.scss";

interface Rocket {
  id: string;
  name: string;
}

interface Props {
  rockets: Rocket[];
}

export const FilterBar = ({ rockets }: Props) => {
 const router = useRouter();
const searchParams = useSearchParams();
const isOldestFirst = searchParams.get("sort") === "asc";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== "page") {
      params.set("page", "1");
    }
    router.push(`/launches?${params.toString()}`);
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="status-filter">Status</label>
        <select 
          id="status-filter"
          className="filter-select"
          onChange={(e) => updateFilter("status", e.target.value)}
          defaultValue={searchParams.get("status") || ""}
        >
          <option value="">All Flights</option>
          <option value="success">✓ Success Only</option>
          <option value="failed">✗ Failed Only</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="rocket-filter">Rocket</label>
        <select 
          id="rocket-filter"
          className="filter-select"
          onChange={(e) => updateFilter("rocket", e.target.value)}
          defaultValue={searchParams.get("rocket") || ""}
        >
          <option value="">All Rockets</option>
          {rockets.map((rocket) => (
            <option key={rocket.id} value={rocket.id}>
              {rocket.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="from-date">From</label>
        <input 
          id="from-date"
          className="filter-input"
          type="date" 
          onChange={(e) => updateFilter("from", e.target.value)}
          defaultValue={searchParams.get("from") || ""}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="to-date">To</label>
        <input 
          id="to-date"
          className="filter-input"
          type="date" 
          onChange={(e) => updateFilter("to", e.target.value)}
          defaultValue={searchParams.get("to") || ""}
        />
      </div>

      <div className="filter-group">
        <label>&nbsp;</label>
        <button 
          className="filter-button"
          onClick={() => {updateFilter("sort", isOldestFirst ? "" : "asc");}}
        >
          {isOldestFirst ? "⬇️ Newest First" : "⬆️ Oldest First"}
        </button>
      </div>
    </div>
  );
};