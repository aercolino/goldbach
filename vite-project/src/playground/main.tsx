import { render } from 'solid-js/web';

import { EuclidSet } from './EuclidSet';
import { Partition } from './Partition';
import { Dashboard } from './Dashboard';


function Playground() {
  return (
    <>
      <h2>Playground</h2>
      <EuclidSet />
      <Partition />
      <Dashboard />
    </>
  );
}

render(() => <Playground />, document.getElementById('app'));
