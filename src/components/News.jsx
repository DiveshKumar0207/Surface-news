import { Component } from "react";
import { Typography } from "@material-tailwind/react";
import Newscard from "./Newscard";
import Pagination from "./Pagination";
import alternativeImg from "../assets/alternative.jpeg";
import PropType from "prop-types";
import LoadingSkeleton from "./Skeleton";

export default class News extends Component {
  static propTypes = {
    URL: PropType.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      totalPagingRequirement: 0,
      currentPageNumber: 1,
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    let URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${this.props.URL}&page=${this.state.currentPageNumber}&pageSize=20`;
    let data = await fetch(URL);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalPagingRequirement: Math.ceil(parsedData.totalResults / 20),
      loading: false,
    });
    console.log(this.state.loading);
  }

  // setPage func ->sent to be prop
  setPage = async (pageno) => {
    this.setState({
      loading: true,
      currentPageNumber: pageno,
    });
    let URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${this.props.URL}&page=${pageno}&pageSize=20`;
    let data = await fetch(URL);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalPagingRequirement: Math.ceil(parsedData.totalResults / 20),
      loading: false,
    });
  };

  getTitle(sentence) {
    const hyphenSeparatedArray = sentence.split("-");

    if (hyphenSeparatedArray.length > 1) {
      return hyphenSeparatedArray.slice(0, -1).join("-");
    } else {
      return "No hyphen found in the sentence.";
    }
  }

  render() {
    let newsImgURl;
    return (
      <>
        <div className="mx-24 mt-6 flex justify-between">
          <Typography variant="h3" color="blue-gray" className="underline">
            Top Headlines
          </Typography>

          <Pagination
            totalPagingRequirement={this.state.totalPagingRequirement}
            setPage={this.setPage}
          />
        </div>

        <div className={` ${this.state.loading ? "block" : "hidden"}`}>
          <div className="flex flex-shrink flex-wrap justify-center gap-4 p-16">
            <LoadingSkeleton loading={this.state.loading} />
            <LoadingSkeleton loading={this.state.loading} />
            <LoadingSkeleton loading={this.state.loading} />
            <LoadingSkeleton loading={this.state.loading} />
          </div>
        </div>

        <div className="flex flex-shrink flex-wrap justify-center gap-4 p-16">
          {this.state.articles.map((article) => {
            article.urlToImage
              ? (newsImgURl = article.urlToImage)
              : (newsImgURl = alternativeImg);

            return (
              <div key={article.url}>
                <Newscard
                  imgUrl={newsImgURl}
                  title={this.getTitle(article.title)}
                  sourceName={article.source.name}
                  content={article.content}
                  readMoreUrl={article.url}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

// News.propTypes = {
//   URL: PropType.string,
// };
