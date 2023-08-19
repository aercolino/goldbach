import { Textarea } from "@hope-ui/solid";

type PropsType = {
  list: number[];
};

export function EuclidSet(props: PropsType) {
  return (
    <Textarea readonly variant="filled" style={{ resize: "vertical" }}>
      {props.list.join(", ")}
    </Textarea>
  );
}
