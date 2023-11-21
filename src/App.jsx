import "./App.css";
import { Component } from "react";
import { Route, Routes } from "react-router-dom";

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

        {/* prettier-ignore */}
        <Routes>
            <Route path="/" element={<News key={"general"} URL={url} endpoints={"top-headlines"} country={"in"} category={"general"} pageSize={8}  />} />
            <Route path="/science" element={<News key={"science"} URL={url}  category={"science"} pageSize={8}  />} />
            <Route path="/business" element={<News key={"business"} URL={url}  category={"business"} pageSize={8}  />} />
            <Route path="/health" element={<News key={"health"} URL={url}  category={"health"} pageSize={8}  />} />
            <Route path="/sports" element={<News key={"sports"} URL={url}  category={"sports"} pageSize={8}  />} />
            <Route path="/technology" element={<News key={"technology"} URL={url}  category={"technology"} pageSize={8}  />} />
            <Route path="/entertainment" element={<News key={"entertainment"} URL={url}  category={"entertainment"} pageSize={8}  />} />
           
          </Routes>
      </>
    );
  }
}
