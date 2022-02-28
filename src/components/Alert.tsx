export function Alert({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      sx={{
        display: "grid",
        gridTemplateAreas: `
          'icon title actions'
          'icon desc  actions'`,
        gridTemplateColumns: "40px 1fr auto",
        alignItems: "center",
        borderRadius: 8,
        background: "#fff",
        color: "#000",
        paddingY: 2,
      }}
    >
      <span sx={{ gridArea: "icon", justifySelf: "center" }}>{icon}</span>
      <span sx={{ gridArea: "title", fontWeight: "bold" }}>{title}</span>
      <span sx={{ gridArea: "desc" }}>{text}</span>
      <span
        sx={{
          gridArea: "actions",
          justifySelf: "center",
          writingMode: "vertical-lr",
        }}
      >
        ...
      </span>
    </div>
  );
}
