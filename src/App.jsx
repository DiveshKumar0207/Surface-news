import "./App.css";
import { Component } from "react";
import { Typography } from "@material-tailwind/react";

import Navbardark from "./components/navbar";
import Pagination from "./components/Pagination";
import News from "./components/News";

export default class App extends Component {
  render() {
    return (
      <>
        <div className="sticky top-0 z-10">
          <Navbardark />
        </div>

        <div className="mx-24 mt-6 flex justify-between">
          <Typography variant="h3" color="blue-gray" className="underline">
            Main Headlines
          </Typography>
          <Pagination />
        </div>

        <div>
          <News />
        </div>
      </>
    );
  }
}
