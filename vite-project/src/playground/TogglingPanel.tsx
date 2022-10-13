import { Container, Heading } from "@hope-ui/solid";
import { Component, createSignal, Show } from "solid-js";
import { Icon } from "./Icon";

export const TogglingPanel: Component = (props) => {
  const [state, setState] = createSignal("open");
  function toggle() {
    return () => setState((s) => (s === "open" ? "close" : "open"));
  }
  return (
    <div>
      <Heading onClick={toggle()} style={{ cursor: "pointer" }}>
        <Show
          when={state() === "open"}
          fallback={<Icon name="HiSolidChevronRight" />}
        >
          <Icon name="HiSolidChevronDown" color="red" />
        </Show>
        {props.title}
      </Heading>
      <Show when={state() === "open"}>
        <Container>{props.children}</Container>
      </Show>
    </div>
  );
};
