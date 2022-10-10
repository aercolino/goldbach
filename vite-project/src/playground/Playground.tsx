import { hope, Heading } from "@hope-ui/solid";
import { EuclidSet } from './EuclidSet';
import { Partition } from './Partition';
import { Dashboard } from './Dashboard';


export function Playground() {
  return (
    <>
      <hope.div bgColor="$primary9" p="$2">
        <Heading level="2" size="2xl" color="$primary1">Playground</Heading>
      </hope.div>
      <EuclidSet />
      <Partition />
      <Dashboard />
    </>
  );
}
