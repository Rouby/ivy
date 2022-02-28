import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import "./reset.css";
import { DeviceScreen, DevicesScreen, HomeScreen, LogScreen } from "./screens";

if (import.meta.env.DEV || true) {
  import("./mocks/browser").then(({ worker }) => {
    worker.start();
    renderApp();
  });
} else {
  renderApp();
}

function renderApp() {
  render(
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomeScreen />} />
          <Route path="logs" element={<LogScreen />} />
          <Route path="devices" element={<DevicesScreen />}></Route>
          <Route path="devices/:deviceId" element={<DeviceScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>,
    document.getElementById("root")
  );
}
