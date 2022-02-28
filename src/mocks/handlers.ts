import { rest } from "msw";

export const handlers = [
  rest.get("/api/logs", (req, res, ctx) => {
    const page = +(req.url.searchParams.get("page") ?? 0);

    const pages = [
      [
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
              icon: "Thermometer",
              device: "Humidity",
              description: "Higher than 90%",
            },
            {
              type: "alert",
              timestamp: "2020-01-01T00:00:00.000Z",
              icon: "Thermometer",
              device: "Temperature",
              description: "Lower than 5°C",
            },
          ],
        },
        {
          date: "2021-12-12",
          entries: [],
        },
      ],
      [
        {
          date: "2021-12-11",
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
          ],
        },
      ],
      [
        {
          date: "2021-12-11",
          entries: [
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
              icon: "Thermometer",
              device: "Humidity",
              description: "Higher than 90%",
            },
            {
              type: "alert",
              timestamp: "2020-01-01T00:00:00.000Z",
              icon: "Thermometer",
              device: "Temperature",
              description: "Lower than 5°C",
            },
          ],
        },
      ],
    ];

    return res(
      ctx.status(200),
      ctx.json({
        nodes: pages[page],
        hasNext: page < pages.length - 1,
      })
    );
  }),

  rest.get("/api/devices/:id", (req, res, ctx) => {
    const id = req.params.id;

    return res(
      ctx.status(200),
      ctx.json({
        id,
        name: "Temperature",
        status: "ok",
        value: 20,
        unit: "°C",
        valueDesc: "temperature",
        alerts: [
          {
            title: "Alert 1",
            text: "Lower than 5°C or higher than 28°C",
            threshold: {
              min: 5,
              max: 28,
            },
          },
        ],
        history: [],
      })
    );
  }),
];
