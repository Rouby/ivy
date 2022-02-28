import { useInfiniteQuery } from "react-query";
import { BackButton, LogList } from "../components";

export function LogScreen() {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "logs",
    async ({ pageParam = 0 }) => {
      const response = await fetch(
        `${import.meta.env.BASE_URL}api/logs?page=${pageParam}`
      );
      const data: {
        nodes: {
          date: string;
          entries: {
            type: string;
            timestamp: string;
            icon: string;
            device: string;
            description: string;
          }[];
        }[];
        hasNext: boolean;
      } = await response.json();
      return data;
    },
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasNext ? pages.length : undefined,
    }
  );

  const grouped = data?.pages.flatMap((page, idx, pages) => {
    const lastLineThis = page.nodes[page.nodes.length - 1];
    const firstLineNext = pages[idx + 1]?.nodes[0];

    if (!lastLineThis) {
      return [];
    }
    if (lastLineThis.date === firstLineNext?.date) {
      const [firstLineNext] = pages[idx + 1].nodes.splice(0, 1);
      return {
        ...page,
        nodes: [
          ...page.nodes.slice(0, -1),
          {
            ...lastLineThis,
            entries: [...lastLineThis.entries, ...firstLineNext.entries],
          },
        ],
      };
    }
    return page;
  });

  return (
    <>
      <BackButton to="..">Back</BackButton>
      <h1>Log data of unit 1</h1>
      <input
        type="search"
        placeholder="Search..."
        sx={{
          padding: 2,
          borderRadius: 8,
          border: "none",
          background: "#eee",
          width: "100%",
        }}
      />
      <label
        htmlFor="filter"
        sx={{ display: "block", marginTop: 3, marginBottom: 2 }}
      >
        Filter logged events
      </label>
      <select
        id="filter"
        sx={{
          padding: 2,
          borderRadius: 8,
          border: "none",
          background: "#eee",
          width: "100%",
          fontWeight: "bold",
        }}
      >
        <option>Show all</option>
        <option>Show notifications</option>
        <option>Show warnings</option>
        <option>Show alerts</option>
      </select>
      {isLoading && <div>Loading...</div>}
      <div
        sx={{ display: "flex", flexDirection: "column", gap: 2, marginY: 2 }}
      >
        {grouped?.flatMap((page) =>
          page.nodes.map(({ date, entries }) => (
            <LogList key={date} date={date} entries={entries} />
          ))
        )}
      </div>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          paddingX: 4,
          paddingY: 2,
          border: "none",
          width: "100%",
          ":disabled": {
            backgroundColor: "muted",
            color: "#333",
          },
        }}
      >
        Load more data
      </button>
    </>
  );
}
