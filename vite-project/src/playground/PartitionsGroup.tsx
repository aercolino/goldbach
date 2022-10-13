import { SimpleGrid } from "@hope-ui/solid";
import { For } from "solid-js";
import { Partition } from "./Partition";

export function PartitionsGroup(props = {}) {
  return (
    <SimpleGrid columns={8} gap="$4" my="$6">
      <For each={props.partitions as Array<{ sum: number; addenda: number[] }>}>
        {(partition) => (
          <Partition sum={partition.sum} addenda={partition.addenda} />
        )}
      </For>
    </SimpleGrid>
  );
}
