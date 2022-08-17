import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ContextApi from "./ContextApi";
import 'react-alice-carousel/lib/alice-carousel.css';
import CoinPage from "./WebPages/CoinPage"

ReactDOM.render(
    <>
    <React.StrictMode> 
    <ContextApi>
        <App />
    </ContextApi>
    </React.StrictMode>
    </>
     ,
    document.getElementById("root"));