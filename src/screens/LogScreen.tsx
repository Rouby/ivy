import {
  BsLightbulb,
  BsLightbulbOff,
  BsLock,
  BsThermometerHalf,
} from "react-icons/bs";
import { useInfiniteQuery } from "react-query";
import { BackButton } from "../components";

const Icons = {
  PadLock: BsLock,
  LightbulbOn: BsLightbulb,
  LightbulbOff: BsLightbulbOff,
  Thermometer: BsThermometerHalf,
};

export function LogScreen() {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "logs",
    async ({ pageParam = 0 }) => {
      const response = await fetch(`/api/logs?page=${pageParam}`);
      const data: {
        nodes: {
          date: string;
          entries: {
            type: string;
            timestamp: string;
            icon: keyof typeof Icons;
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
      <input type="search" placeholder="Search..." />
      <label htmlFor="filter">Filter logged events</label>
      <select id="filter">
        <option>Show all</option>
        <option>Show notifications</option>
        <option>Show warnings</option>
        <option>Show alerts</option>
      </select>
      {isLoading && <div>Loading...</div>}
      {grouped?.flatMap((page) =>
        page.nodes.map(({ date, entries }) => (
          <section key={date}>
            <h2>{date}:</h2>
            {entries.length === 0 ? (
              <span>No events logged</span>
            ) : (
              <ol
                sx={{
                  display: "grid",
                  gridTemplateColumns: "auto auto auto 1fr",
                  rowGap: 1,
                  columnGap: 2,
                }}
              >
                {entries.map(
                  ({ timestamp, icon, device, description }, idx) => {
                    const Icon = icon in Icons ? Icons[icon] : "i";
                    return (
                      <li key={idx} sx={{ display: "contents" }}>
                        <span>
                          <Timestamp value={timestamp} />
                        </span>
                        <span>
                          <Icon />
                        </span>
                        <span>{device}</span>
                        <span>{description}</span>
                      </li>
                    );
                  }
                )}
              </ol>
            )}
          </section>
        ))
      )}
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        Load more data
      </button>
    </>
  );
}

export function Timestamp({ value }: { value: string }) {
  const formatter = new Intl.DateTimeFormat([], {
    dateStyle: "long",
    timeStyle: "short",
  });

  return <>{formatter.format(new Date(value))}</>;
}
