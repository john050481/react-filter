import React from "react";
import ReactDOM from "react-dom";
import { Example } from "./Example";

import "./styles.css";

const App = () => (
  <div>
    <Example /* list_data = anyAraayOfObject filter_options = anyOptionsFromList_Data_SeeFile_filterOptions.js */
    />
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
