import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { PlayerProvider } from "./components/PlayerContext.jsx";
ReactDOM.render(
    <PlayerProvider>
      <App />
    </PlayerProvider>,
  document.getElementById("root")
);