import { render } from "solid-js/web";
import { HopeProvider } from "@hope-ui/solid";

import { Playground } from "./Playground";
import { InjectRegistry } from "../stores/Registry";

function App() {
  return (
    <InjectRegistry>
      <HopeProvider>
        <Playground />
      </HopeProvider>
    </InjectRegistry>
  );
}

render(() => <App />, document.getElementById("app"));
