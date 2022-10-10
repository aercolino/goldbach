import { render } from 'solid-js/web';
import { HopeProvider } from '@hope-ui/solid'

import { EuclidSet } from './EuclidSet';
import { Partition } from './Partition';
import { Dashboard } from './Dashboard';


function Playground() {
  return (
    <HopeProvider>
      <h2>Playground</h2>
      <EuclidSet />
      <Partition />
      <Dashboard />
    </HopeProvider>
  );
}

render(() => <Playground />, document.getElementById('app'));
