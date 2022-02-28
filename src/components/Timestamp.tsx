export function Timestamp({ value }: { value: string }) {
  const formatter = new Intl.DateTimeFormat([], {
    dateStyle: "short",
    timeStyle: "short",
  });

  return <>{formatter.format(new Date(value))}</>;
}
