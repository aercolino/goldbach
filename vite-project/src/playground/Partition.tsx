import { Box } from "@hope-ui/solid";
import { Component } from "solid-js";

type PropsType = {
  sum: number;
  addenda: number[] | string;
};

export const Partition: Component = (props: PropsType) => {
  return (
    <Box color="$neutral11" bg="$neutral2">
      {props.sum} ={" "}
      {typeof props.addenda === "string"
        ? props.addenda
        : props.addenda.join(" + ")}
    </Box>
  );
};
