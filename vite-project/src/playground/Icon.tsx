import { splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { JSX } from "solid-js/jsx-runtime";
import { Box } from "@hope-ui/solid";
import * as hi from "solid-icons/hi";

export function Icon(props) {
  const [local, rest] = splitProps(props, ["name"]);
  return (
    <Box style={{ display: "inline-block" }} {...rest}>
      <Dynamic component={hi[local.name as string] as JSX.Element} />
    </Box>
  );
}
