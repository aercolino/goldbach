import { Box } from "@hope-ui/solid";
import { splitProps, createResource, createSignal } from "solid-js";

function fragment(html: string) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html;
  return tpl.content;
}

async function importIcon(filename) {
  const module = (await import(`../icons/${filename as string}.svg`)) as {
    default: string;
  };
  return module.default;
}

export function BareIcon(props) {
  const [local, rest] = splitProps(props, ["filename"]);
  const [filename, setFilename] = createSignal("");
  const [svg] = createResource(filename, importIcon);
  // eslint-disable-next-line solid/reactivity
  setFilename(local.filename);
  return (
    <Box style={{ display: "inline-block" }} {...rest}>
      {svg.loading ? "" : fragment(svg())}
    </Box>
  );
}
