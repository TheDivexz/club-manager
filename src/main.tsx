import React from "react";
import ReactDOM from "react-dom/client";
import SquadView from "./squadview";
import MatchView from "./MatchView";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <SquadView /> */}
    <MatchView />
  </React.StrictMode>,
);
