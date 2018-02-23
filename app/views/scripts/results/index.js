import ReactDOM from "react-dom";
import React from "react";
import ReactApp from "../../../react/index";
import fetch from "isomorphic-fetch";
require('es6-promise').polyfill();

fetch("react")
  .then(serverData => serverData.json())
  .then(serverData => {
    console.log(serverData);
    ReactDOM.hydrate(
      <ReactApp data={serverData.Spotify.topTracks} id="topTracks" />,
      document.getElementById("react-main")
    );
  });
