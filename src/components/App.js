import React from "react";
import "./App.scss";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/";
import SidePanel from "./SidePanel/";
import Messages from "./Messages";
import MetaPanel from "./MetaPanel";

function App() {
  return (
    <Grid>
      <ColorPanel />
      <SidePanel />
      <Messages />
      <MetaPanel />
    </Grid>
  );
}

export default App;
