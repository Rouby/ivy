import { Link } from "react-router-dom";

export function BackButton({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return <Link to={to}>{children}</Link>;
}
