import {
  BsLightbulb,
  BsLightbulbOff,
  BsLock,
  BsThermometerHalf,
} from "react-icons/bs";
import { Timestamp } from ".";

const Icons = {
  PadLock: BsLock,
  LightbulbOn: BsLightbulb,
  LightbulbOff: BsLightbulbOff,
  Thermometer: BsThermometerHalf,
};

export function LogList({
  date,
  entries,
}: {
  date: string;
  entries: {
    timestamp: string;
    icon: string;
    device: string;
    description: string;
  }[];
}) {
  return (
    <section key={date}>
      <h2>{date}:</h2>
      {entries.length === 0 ? (
        <span>No events logged</span>
      ) : (
        <div
          sx={{
            display: "grid",
            gridTemplateColumns: "auto auto auto 1fr",
            rowGap: 1,
            columnGap: 2,
          }}
        >
          {entries.map(({ timestamp, icon, device, description }, idx) => {
            const Icon =
              icon in Icons ? Icons[icon as keyof typeof Icons] : "i";
            return (
              <div key={idx} sx={{ display: "contents" }}>
                <span>
                  <Timestamp value={timestamp} />
                </span>
                <span>
                  <Icon />
                </span>
                <span>{device}</span>
                <span>{description}</span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
