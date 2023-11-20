import "./App.css";
import { Component } from "react";

import Navbar from "./components/Navbar";
import News from "./components/News";

const url = import.meta.env.VITE_NEWS_API_KEY;

export default class App extends Component {
  render() {
    return (
      <>
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>

        <div>
          <News URL={url} />
        </div>
      </>
    );
  }
}
