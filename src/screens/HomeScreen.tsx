import { Link } from "react-router-dom";

export function HomeScreen() {
  return (
    <>
      <nav>
        <Link to="logs">Logs</Link> | <Link to="devices">Devices</Link>
      </nav>
    </>
  );
}
