import { Container, Heading } from "@hope-ui/solid";
import { Component } from "solid-js";

export const TogglingPanel: Component = (props) => {
  return (
    <div>
      <Heading>{props.title}</Heading>
      <Container>{props.children}</Container>
    </div>
  );
};
