import { getLaunches, getRockets } from "../../lib/api";
import { LaunchCard } from "../../components/LaunchCard/LaunchCard";
import Link from "next/link";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import "./launches.css";

export const dynamic = "force-static";

const ITEMS_PER_PAGE = 20;

type Props = {
  searchParams?: {
    page?: string;
    status?: string;
    sort?: string;
    from?: string;
    to?: string;
    rocket?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const params = searchParams || {};

  const currentPage = Number(params.page) || 1;

  const [allLaunches, allRockets] = await Promise.all([
    getLaunches(),
    getRockets(),
  ]);

  if (params.sort !== "asc") {
    allLaunches.sort(
      (a, b) =>
        new Date(b.date_utc).getTime() -
        new Date(a.date_utc).getTime()
    );
  }

  let filteredLaunches = allLaunches;

  if (params.status === "success") {
    filteredLaunches = filteredLaunches.filter(
      (launch) => launch.success === true
    );
  } else if (params.status === "failed") {
    filteredLaunches = filteredLaunches.filter(
      (launch) => launch.success === false
    );
  }

  if (params.rocket) {
    filteredLaunches = filteredLaunches.filter((launch) => {
      const rocketId =
        typeof launch.rocket === "string"
          ? launch.rocket
          : launch.rocket.id;

      return rocketId === params.rocket;
    });
  }

  if (params.from) {
    const fromDate = new Date(params.from).getTime();

    filteredLaunches = filteredLaunches.filter((launch) => {
      return new Date(launch.date_utc).getTime() >= fromDate;
    });
  }

  if (params.to) {
    const toDate = new Date(params.to).getTime();

    filteredLaunches = filteredLaunches.filter((launch) => {
      return new Date(launch.date_utc).getTime() <= toDate;
    });
  }

  const totalPages = Math.ceil(
    filteredLaunches.length / ITEMS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentLaunches = filteredLaunches.slice(
    startIndex,
    endIndex
  );

  const getPageUrl = (pageNumber: number) => {
    const query = new URLSearchParams();

    if (params.status) query.set("status", params.status);
    if (params.rocket) query.set("rocket", params.rocket);
    if (params.from) query.set("from", params.from);
    if (params.to) query.set("to", params.to);
    if (params.sort) query.set("sort", params.sort);

    query.set("page", pageNumber.toString());

    return `/launches?${query.toString()}`;
  };

  return (
    <div className="launches-page">
      <div className="launches-page__back">
        <Link href="/" className="back-link">
          ← Back
        </Link>
      </div>

      <h1 className="launches-page__title">
        SpaceX Launches
      </h1>

      <FilterBar
        rockets={allRockets.map((r) => ({
          id: r.id,
          name: r.name,
        }))}
      />

      <div className="launches-list">
        {currentLaunches.length > 0 ? (
          currentLaunches.map((launch) => (
            <LaunchCard
              key={launch.id}
              launch={launch}
            />
          ))
        ) : (
          <div className="launches-empty">
            No launches found matching your filters
          </div>
        )}
      </div>

      <div className="pagination">
        {currentPage > 1 ? (
          <Link
            href={getPageUrl(currentPage - 1)}
            className="pagination__btn"
          >
            ← Prev
          </Link>
        ) : (
          <span className="pagination__btn pagination__btn--disabled">
            ← Prev
          </span>
        )}

        <span className="pagination__info">
          Page {currentPage} of {totalPages}
        </span>

        {currentPage < totalPages ? (
          <Link
            href={getPageUrl(currentPage + 1)}
            className="pagination__btn"
          >
            Next →
          </Link>
        ) : (
          <span className="pagination__btn pagination__btn--disabled">
            Next →
          </span>
        )}
      </div>
    </div>
  );
}
