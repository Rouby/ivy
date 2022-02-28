import { useState } from "react";
import { useQuery } from "react-query";
import { BackButton } from "../components";

export function LogScreen() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useQuery(
    ["logs", page],
    async () => {
      const response = await fetch(`/api/logs?page=${page}`);
      const data: {
        date: string;
        entries: {
          type: string;
          timestamp: string;
          icon: string;
          device: string;
          description: string;
        }[];
      }[] = await response.json();
      return data;
    },
    {
      keepPreviousData: true,
    }
  );

  return (
    <>
      <BackButton to="..">Back</BackButton>
      <h1>Log data of unit 1</h1>
      <input type="search" placeholder="Search..." />
      <label>Filter logged events</label>
      <select>
        <option>Show all</option>
      </select>
      {isLoading && <div>Loading...</div>}
      {data?.map(({ date, entries }) => (
        <section key={date}>
          <h2>13.12.2021, Mon.:</h2>
          {entries.length === 0 ? (
            <span>No events logged</span>
          ) : (
            <ol>
              {entries.map(({ timestamp, icon, device, description }) => (
                <li>
                  <span>{timestamp}</span>
                  <span>{icon}</span>
                  <span>{device}</span>
                  <span>{description}</span>
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}
    </>
  );
}
