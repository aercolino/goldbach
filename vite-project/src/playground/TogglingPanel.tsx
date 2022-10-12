import { Container, Heading } from "@hope-ui/solid";
import { Component, createSignal, Show } from "solid-js";

export const TogglingPanel: Component = (props) => {
  const [state, setState] = createSignal("open");
  function toggle() {
    return () => setState((s) => (s === "open" ? "close" : "open"));
  }
  return (
    <div>
      <Heading onClick={toggle()}>{props.title}</Heading>
      <Show when={state() === "open"}>
        <Container>{props.children}</Container>
      </Show>
    </div>
  );
};
