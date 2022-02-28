import { Link } from "react-router-dom";
import { BackButton } from "../components";

export function DevicesScreen() {
  return (
    <>
      <BackButton to="..">Back</BackButton>
      <ul>
        <li>
          <Link to="1">Device 1</Link>
        </li>
      </ul>
    </>
  );
}
