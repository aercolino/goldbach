import { Box } from "@hope-ui/solid";

type PropsType = {
  sum: number;
  addenda: number[] | string;
};

export function Partition(props: PropsType) {
  return (
    <Box color="$neutral11" bg="$neutral2">
      {props.sum} ={" "}
      {typeof props.addenda === "string"
        ? props.addenda
        : props.addenda.join(" + ")}
    </Box>
  );
}
