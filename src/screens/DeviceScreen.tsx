import { useState } from "react";
import { BsAlarm } from "react-icons/bs";
import { usePopper } from "react-popper";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "theme-ui";
import { Alert, BackButton } from "../components";

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
      history: {
        timestamp: string;
        value: number;
      }[];
    } = await response.json();
    return data;
  });

  return (
    <ThemeProvider
      theme={{
        // theme-ui seems to have a bug with nested css variables applied to root HTML element
        colors: {
          text: "#fff",
          background: "#000",
          primary: "#0cf",
        },
      }}
    >
      <div sx={{ background: "#000", color: "#fff" }}>
        <BackButton to="/devices">Back</BackButton>
        <h1>{data?.name}</h1>
        <div
          sx={{
            display: "grid",
            gridTemplateAreas: `
            'temp status'
            'temp unit'
            'desc desc'`,
            gridTemplateColumns: "min-content min-content",
            gridTemplateRows: "auto auto",
            marginX: "auto",
          }}
        >
          <span
            sx={{
              gridArea: "temp",
              justifySelf: "end",
              fontSize: 7,
              fontWeight: "bold",
              lineHeight: "100%",
            }}
          >
            {data?.value}
          </span>
          <span sx={{ gridArea: "unit", alignSelf: "end" }}>{data?.unit}</span>
          <span sx={{ gridArea: "desc", fontSize: 0, textAlign: "center" }}>
            Actual {data?.valueDesc} in your unit
          </span>
          <span sx={{ gridArea: "status", justifySelf: "end" }}>
            <StatusIndicator value={data?.status} />
          </span>
        </div>
        <div sx={{ display: "flex", flexDirection: "column" }}>
          {data?.alerts.map((alert) => (
            <Alert
              key={alert.title}
              icon={<BsAlarm />}
              title={alert.title}
              text={alert.text}
            />
          ))}
          <div>+ Add alert</div>
        </div>
        <div
          sx={{
            display: "grid",
            gridTemplateAreas: `
            'title select'
            'graph graph'`,
            alignItems: "center",
            gridTemplateRows: "auto 1fr",
          }}
        >
          <h2 sx={{ gridArea: "title" }}>Temperature</h2>
          <select
            sx={{
              gridArea: "select",
              borderColor: "#fff",
              padding: 1,
              borderRadius: 16,
              backgroundColor: "#000",
              color: "#fff",
            }}
          >
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
          {data && <Chart alerts={data.alerts} points={data.history} />}
        </div>
      </div>
    </ThemeProvider>
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

function Chart({
  alerts,
  points,
}: {
  alerts: { title: string; threshold: { min: number; max: number } }[];
  points: { value: number; timestamp: string }[];
}) {
  const [hoverPoint, setHoverPoint] = useState<{
    value: number;
    timestamp: string;
  } | null>(null);

  const [hoverElement, setHoverElement] = useState<SVGCircleElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(hoverElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
    placement: "auto-start",
  });

  const minTime = Math.min(...points.map((e) => Date.parse(e.timestamp)));
  const maxTime = Math.max(...points.map((e) => Date.parse(e.timestamp)));

  const minValue =
    Math.min(
      ...points.map((e) => e.value),
      ...alerts.flatMap(({ threshold }) => [threshold.min, threshold.max])
    ) - 5;
  const maxValue =
    Math.max(
      ...points.map((e) => e.value),
      ...alerts.flatMap(({ threshold }) => [threshold.min, threshold.max])
    ) + 5;

  const chartWidth = 300;
  const chartHeight = 100;

  function interpolateX(x: string) {
    const time = Date.parse(x);
    return ((time - minTime) / (maxTime - minTime)) * chartWidth;
  }

  function interpolateY(y: number) {
    return 100 - ((y - minValue) / (maxValue - minValue)) * chartHeight;
  }

  return (
    <>
      <svg
        sx={{
          gridArea: "graph",
          justifySelf: "stretch",
          alignSelf: "stretch",
        }}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={(evt) => {
          const { left, width, top, height } = (
            evt.target as SVGElement
          ).getBoundingClientRect();
          const x = ((evt.clientX - left) / width) * chartWidth;
          const y = ((evt.clientY - top) / height) * chartHeight;
          const hoveredPoint = points
            .map((point) => ({
              ...point,
              dX: Math.abs(interpolateX(point.timestamp) - x),
            }))
            .sort((a, b) => a.dX - b.dX)[0];

          setHoverPoint(hoveredPoint);
        }}
        onMouseOut={() => setHoverPoint(null)}
      >
        <>
          {alerts.map((alert) => (
            <>
              <line
                x1="0"
                x2={chartWidth}
                y1={interpolateY(alert.threshold.min)}
                y2={interpolateY(alert.threshold.min)}
                sx={{
                  stroke: "red",
                  strokeDasharray: "1,1",
                  strokeWidth: 0.4,
                }}
              />
              <line
                x1="0"
                x2={chartWidth}
                y1={interpolateY(alert.threshold.max)}
                y2={interpolateY(alert.threshold.max)}
                sx={{
                  stroke: "red",
                  strokeDasharray: "1,1",
                  strokeWidth: 0.4,
                }}
              />
            </>
          ))}
          <path
            d={points.reduce(
              (acc, point) =>
                `${acc ? `${acc} L` : "M"}${interpolateX(
                  point.timestamp
                )},${interpolateY(point.value)}`,
              ""
            )}
            sx={{
              stroke: "primary",
              fill: "none",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
          />
          {hoverPoint && (
            <g
              key={hoverPoint.timestamp}
              transform={`translate(${interpolateX(
                hoverPoint.timestamp
              )}, ${interpolateY(hoverPoint.value)})`}
            >
              <circle
                ref={setHoverElement}
                r="2"
                sx={{ pointerEvents: "none", fill: "#fff" }}
              />
            </g>
          )}
        </>
      </svg>
      {hoverPoint && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          sx={{
            pointerEvents: "none",
            padding: 2,
            borderRadius: 8,
            background: "#fff",
            color: "#000",
          }}
        >
          {hoverPoint.value}°C
          <div ref={setArrowElement} style={styles.arrow} />
        </div>
      )}
    </>
  );
}
