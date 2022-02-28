import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { BackButton } from "../components";

export function DeviceScreen() {
  const { deviceId } = useParams();
  const { data } = useQuery(["device", deviceId], async ({ queryKey }) => {
    const response = await fetch(`/api/devices/${queryKey[1]}`);
    const data: {
      id: string;
      name: string;
      status: string;
      value: number;
      unit: string;
      valueDesc: string;
      alerts: {
        title: string;
        text: string;
        threshold: {
          min: number;
          max: number;
        };
      }[];
      history: {}[];
    } = await response.json();
    return data;
  });

  return (
    <>
      <BackButton to="/devices">Back</BackButton>
      <h1>{data?.name}</h1>
      <div
        sx={{
          display: "grid",
          gridTemplateAreas: `
            'temp status'
            'temp unit'
            'desc desc'`,
        }}
      >
        <span sx={{ gridArea: "temp" }}>{data?.value}</span>
        <span sx={{ gridArea: "unit" }}>{data?.unit}</span>
        <span sx={{ gridArea: "desc" }}>
          Actual {data?.valueDesc} in your unit
        </span>
        <span sx={{ gridArea: "status" }}>
          <StatusIndicator value={data?.status} />
        </span>
      </div>
      <div>
        <div
          sx={{
            display: "grid",
            gridTemplateAreas: `
              'icon title actions'
              'icon desc  actions'`,
          }}
        >
          <span sx={{ gridArea: "icon" }}>Icon</span>
          <span sx={{ gridArea: "title" }}>Alert 1</span>
          <span sx={{ gridArea: "desc" }}>
            Lower than 5°C or higher than 28°C
          </span>
          <span sx={{ gridArea: "actions" }}>...</span>
        </div>
        <div>+ Add alert</div>
      </div>
      <div>
        <h2>Temperature</h2>
        <select>
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
        <svg></svg>
      </div>
    </>
  );
}

function StatusIndicator({ value }: { value?: string }) {
  return (
    <span
      sx={{
        display: "block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor:
          value === "ok" ? "greenyellow" : value === undefined ? "gray" : "red",
      }}
    />
  );
}
