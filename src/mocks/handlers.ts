import { rest } from "msw";

export const handlers = [
  rest.get("/api/logs", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          date: "2021-12-13",
          entries: [
            {
              type: "notification",
              timestamp: "2020-01-01T00:00:00.000Z",
              icon: "PadLock",
              device: "Door - Front",
              description: "Closed by you",
            },
            {
              type: "notification",
              timestamp: "2020-01-01T00:00:00.000Z",
              icon: "LightbulbOff",
              device: "Main lighting",
              description: "Off",
            },
            {
              type: "notification",
              timestamp: "2020-01-01T00:00:00.000Z",
              icon: "LightbulbOn",
              device: "Main lighting",
              description: "On",
            },
            {
              type: "warning",
              timestamp: "2020-01-01T00:00:00.000Z",
              device: "Humidity",
              description: "Higher than 90%",
            },
            {
              type: "alert",
              timestamp: "2020-01-01T00:00:00.000Z",
              device: "Temperature",
              description: "Lower than 5°C",
            },
          ],
        },
        {
          date: "2021-12-12",
          entries: [],
        },
      ])
    );
  }),
];
