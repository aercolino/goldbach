import { render } from 'solid-js/web';
import { HopeProvider } from '@hope-ui/solid'

import { Playground } from './Playground';


function App() {
  return (
    <HopeProvider>
      <Playground />
    </HopeProvider>
  );
}

render(() => <App />, document.getElementById('app'));
