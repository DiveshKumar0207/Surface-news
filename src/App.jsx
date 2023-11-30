import "./App.css";
import { Component } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import News from "./components/News";
// import { useNavigation } from "./utils/NavigationUtils";
import { withRouter } from "./utils/withRouter";

import PropType from "prop-types";

const key = import.meta.env.VITE_NEWS_API_KEY;

class App extends Component {
  static propTypes = {
    navigate: PropType.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchChange(event) {
    this.setState({
      searchValue: event.target.value,
    });
  }
  handleSearchSubmit(event) {
    event.preventDefault();

    this.props.navigate(`/search/${this.state.searchValue}`);
  }

  handleKeyUp = (event) => {
    console.llog(event.key);
    if (event.key === "Enter") {
      console.log("Enter key pressed");
      this.handleSearchSubmit(event);
    }
  };

  render() {
    return (
      <>
        <div className="sticky top-0 z-10">
          <Navbar
            searchValue={this.state.searchValue}
            onSearchChange={this.handleSearchChange}
            onSearchSubmit={this.handleSearchSubmit}
            handleKeyUp={this.handleKeyUp}
          />
        </div>

        {/* prettier-ignore */}
        <Routes>
            <Route path="/" element={<News key={"general"} APIKEY={key} endpoints={"top-headlines"} country={"in"} category={"general"} pageSize={8}  />} />
            <Route path="/science" element={<News key={"science"} APIKEY={key}  category={"science"} pageSize={8}  />} />
            <Route path="/business" element={<News key={"business"} APIKEY={key}  category={"business"} pageSize={8}  />} />
            <Route path="/health" element={<News key={"health"} APIKEY={key}  category={"health"} pageSize={8}  />} />
            <Route path="/sports" element={<News key={"sports"} APIKEY={key}  category={"sports"} pageSize={8}  />} />
            <Route path="/technology" element={<News key={"technology"} APIKEY={key}  category={"technology"} pageSize={8}  />} />
            <Route path="/entertainment" element={<News key={"entertainment"} APIKEY={key}  category={"entertainment"} pageSize={8}  />} />
            <Route path="/search/:query" element={<News endpoints="everything" query={this.state.searchValue} key={this.state.searchValue} APIKEY={key} pageSize={8} />}/>

           
          </Routes>
      </>
    );
  }
}

export default withRouter(App);
