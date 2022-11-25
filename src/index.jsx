import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./Sass/helper.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router} from 'react-router-dom'
import './Sass/soft-ui-dashboard.css'
import { UserRoleContextProvider } from "./Utils/UserAuthorization";
window.Buffer = require('buffer/').Buffer;


ReactDOM.createRoot(document.getElementById("root")).render(
    <UserRoleContextProvider>
    <Router>
      <App />
    </Router>
    </UserRoleContextProvider>
);
