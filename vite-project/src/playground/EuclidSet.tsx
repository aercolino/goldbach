import { Textarea } from "@hope-ui/solid";

type PropsType = {
  registry: Record<string, unknown>;
  instance: string;
};

export function EuclidSet(props: PropsType) {
  return (
    <Textarea readonly variant="filled" style={{ resize: "vertical" }}>
      {(
        (props.registry[props.instance] as Record<string, unknown>)
          .list as number[]
      ).join(", ")}
    </Textarea>
  );
}
