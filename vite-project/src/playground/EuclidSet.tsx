import { Textarea } from "@hope-ui/solid";
import { Component } from "solid-js";

type PropsType = {
  registry: Record<string, number[]>;
  instance: string;
};

export const EuclidSet: Component = (props: PropsType) => {
  return (
    <Textarea readonly variant="filled" style={{ resize: "vertical" }}>
      {props.registry[props.instance].join(", ")}
    </Textarea>
  );
};
