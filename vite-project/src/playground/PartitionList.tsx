import { SimpleGrid } from "@hope-ui/solid";
import { Component } from "solid-js";

export const PartitionList: Component = (props) => {
  return (
    <SimpleGrid columns={8} gap="$4" my="$6">
      {props.children}
    </SimpleGrid>
  );
};
