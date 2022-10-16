import { hope } from "@hope-ui/solid";

export function Range() {
  return (
    <hope.div style={{ position: "relative" }}>
      <hope.input
        w="160px"
        type="range"
        min={-100}
        max={0}
        value={-20}
        style={{
          direction: "rtl",
          position: "absolute",
          top: 0,
          left: 0,
          border: "none",
          outline: "none",
          height: "2px",
        }}
      />
      <hope.input
        w="160px"
        ml="40px"
        type="range"
        min={0}
        max={100}
        value={80}
        style={{
          direction: "ltr",
          position: "absolute",
          top: 0,
          left: 0,
          border: "none",
          outline: "none",
          height: "2px",
        }}
      />
    </hope.div>
  );
}
